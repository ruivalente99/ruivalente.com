import Link from "next/link";
import { Button } from "@/components/ui/button";

// Next.js serves this page with a real 404 status code, so it is never treated as a soft 404.
export default function NotFound() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 text-center space-y-6 lowercase">
      <p className="text-sm font-mono text-muted-foreground">404</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">page not found</h1>
      <p className="text-muted-foreground">
        this page does not exist or has moved. try one of these instead:
      </p>
      <nav aria-label="helpful links" className="flex flex-wrap justify-center gap-2">
        {[
          { href: "/", label: "home" },
          { href: "/about", label: "about" },
          { href: "/projects", label: "projects" },
          { href: "/experience", label: "experience" },
          { href: "/stack", label: "tech stack" },
        ].map((link) => (
          <Button key={link.href} asChild variant="outline" size="sm" className="lowercase">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
