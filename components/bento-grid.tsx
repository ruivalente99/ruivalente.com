"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full",
      className
    )}>
      {children}
    </div>
  );
}

export function BentoItem({ 
  children, 
  className,
  colSpan = 1,
  rowSpan = 1 
}: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-xl transition-shadow duration-300 hover:shadow-lg",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        colSpan === 4 && "md:col-span-4",
        rowSpan === 2 && "md:row-span-2",
        rowSpan === 3 && "md:row-span-3",
        className
      )}
    >
      {children}
    </motion.div>
  );
}