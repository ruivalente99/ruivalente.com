"use client";

import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

// Request deduplication with proper cleanup
const requestCache = new Map<string, Promise<any>>();
const abortControllers = new Map<string, AbortController>();

const fetchData = async (url: string) => {
  // Cleanup any existing request for this URL
  if (abortControllers.has(url)) {
    abortControllers.get(url)?.abort();
    abortControllers.delete(url);
    requestCache.delete(url);
  }

  const controller = new AbortController();
  abortControllers.set(url, controller);

  const request = new Promise(async (resolve, reject) => {
    try {
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, 10000); // 10 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache', // Prevent browser caching
          'Pragma': 'no-cache'
        },
        next: { revalidate: 300 } // 5 minutes revalidation
      }).finally(() => {
        clearTimeout(timeoutId);
        abortControllers.delete(url);
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      resolve(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        reject(new Error('Request aborted'));
      } else {
        reject(error);
      }
    } finally {
      requestCache.delete(url);
    }
  });

  requestCache.set(url, request);
  return request;
};

export function useData<T>(url: string): FetchState<T> {
  const { theme } = useTheme();
  
  // Handle theme-specific API URLs
  const isDarkSide = theme === 'dark-side';
  const apiUrl = isDarkSide && !url.includes('/dark-side/') 
    ? url.replace('/api/', '/api/dark-side/') 
    : url;

  const { data, isLoading, error } = useQuery({
    queryKey: [apiUrl, theme],
    queryFn: () => fetchData(apiUrl),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry aborted or timeout requests
      if (
        error instanceof Error && 
        (error.message === 'Request aborted' || error.message === 'Request timeout')
      ) {
        return false;
      }
      // Only retry network errors twice
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return {
    data: (data as T) || null,
    isLoading,
    error: error as Error | null,
  };
}