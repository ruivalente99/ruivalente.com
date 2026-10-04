import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";

// Title, description and social tags come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <HomeContent />
    </>
  );
}
