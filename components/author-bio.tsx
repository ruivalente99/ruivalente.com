import Image from "next/image";
import Link from "next/link";
import { author } from "@/lib/about";

/** Short author box shown under case studies. Links to the full bio on /about. */
export function AuthorBio() {
  return (
    <aside
      aria-label="about the author"
      className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/60 p-5 lowercase"
    >
      <Image
        src="/avatar-256.webp"
        alt={`portrait of ${author.name}`}
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-border/80"
      />
      <div className="space-y-1">
        <p className="text-xs font-mono text-muted-foreground">written by</p>
        <p className="text-sm font-semibold">
          <Link href="/about" rel="author" className="underline decoration-border underline-offset-4 hover:decoration-foreground">
            {author.name}
          </Link>
          <span className="font-normal text-muted-foreground"> - {author.jobTitle}</span>
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">{author.summary}</p>
      </div>
    </aside>
  );
}
