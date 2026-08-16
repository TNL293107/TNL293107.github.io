import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { RevealController } from "@/components/layout/RevealController";
import { TechIconSprite } from "@/components/ui/TechIconSprite";

/**
 * All three families must carry the `vietnamese` subset, or "Trần Nhất Long"
 * falls back to a system font and renders with the diacritics visibly detached
 * from the letter. This bit the previous build (Instrument Serif and DM Mono
 * ship no Vietnamese), so any replacement family must be checked first:
 *
 *   curl -s "https://fonts.googleapis.com/css2?family=<Family>&display=swap" \
 *     | grep -c "/\* vietnamese \*\/"
 *
 * Space Grotesk, Inter and JetBrains Mono all return 1.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Backend-focused engineer in Đà Nẵng building services, data models, AI pipelines and the infrastructure they run on. Software Engineering student at FPT University.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Backend / Data Engineer`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "backend engineer",
    "data engineering",
    "ASP.NET Core",
    "FastAPI",
    "PostgreSQL",
    "Docker",
    "LLM integration",
    "Đà Nẵng",
    "FPT University",
    site.handle,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Backend / Data Engineer`,
    description: site.positioning,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Backend / Data Engineer`,
    description: site.positioning,
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

/** Machine-readable identity. Mirrors only claims already made on the page. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Backend Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Đà Nẵng",
    addressCountry: "VN",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "FPT University Đà Nẵng" },
  knowsAbout: [
    "Backend engineering",
    "Data modelling",
    "C#",
    "ASP.NET Core",
    "Python",
    "FastAPI",
    "Java",
    "PostgreSQL",
    "Docker",
    "LLM integration",
  ],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:tracking-wider focus:text-accent-ink focus:uppercase"
        >
          Skip to content
        </a>

        <TechIconSprite />
        <SmoothScroll />
        <RevealController />

        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
