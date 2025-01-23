"use client";

import { useState } from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure hydration
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}