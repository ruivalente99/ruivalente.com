"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Stack", path: "/stack" },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </div>
          
          <nav className="flex items-center gap-2">
            {navigation.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.path)}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </motion.footer>
  );
}