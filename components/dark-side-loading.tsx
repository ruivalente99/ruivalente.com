"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkSideLoading() {
  const { theme } = useTheme();
  const [showLoading, setShowLoading] = useState(false);
  const [previousTheme, setPreviousTheme] = useState(theme);

  useEffect(() => {
    // Only show loading when switching TO dark-side theme
    if (theme === 'dark-side' && previousTheme !== 'dark-side') {
      setShowLoading(true);
      
      // Hide loading screen after animation
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Update previous theme
    setPreviousTheme(theme);
  }, [theme, previousTheme]);

  return (
    <AnimatePresence mode="wait">
      {showLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="relative">
            {/* Lightsaber loading bar */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-64 h-2 bg-red-600 rounded-full relative overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, ease: "linear", repeat: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-red-600 text-center mt-4 font-bold text-lg"
            >
              Embracing the Dark Side...
            </motion.p>

            {/* Radial glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-radial from-red-600/20 to-transparent animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}