"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/lib/animation/context";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const blockAssemblyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
    rotateX: 3,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.75,
    },
  },
};

export function BentoGrid({ children, className }: BentoGridProps) {
  const { animationsEnabled } = useAnimation();

  if (!animationsEnabled) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto w-full [perspective:1200px]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoItemProps) {
  const { animationsEnabled } = useAnimation();

  const layoutClasses = cn(
    "rounded-xl w-full h-full flex flex-col",
    colSpan === 2 && "md:col-span-2",
    colSpan === 3 && "md:col-span-3",
    colSpan === 4 && "md:col-span-4",
    rowSpan === 2 && "md:row-span-2",
    rowSpan === 3 && "md:row-span-3",
    className
  );

  if (!animationsEnabled) {
    return <div className={layoutClasses}>{children}</div>;
  }

  return (
    <motion.div
      variants={blockAssemblyVariants}
      className={layoutClasses}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}