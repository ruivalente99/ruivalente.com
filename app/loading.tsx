"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-64"
      >
        <Progress value={33} className="mb-4" />
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      </motion.div>
    </div>
  );
}