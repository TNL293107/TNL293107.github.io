import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { person } from '@/content/site';

/* Newsreader was chosen for Vietnamese support; Instrument Serif has no
   `vietnamese` subset, so any display face here must declare one or the
   diacritics detach. */
const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tnl293107.github.io'),
  title: `${person.name} — ${person.role}`,
  description: `${person.name} — backend engineer in ${person.place}. ${person.lede}`,
  authors: [{ name: person.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: person.name,
    title: `${person.name} — ${person.role}`,
    description: person.lede,
  },
  twitter: { card: 'summary', title: `${person.name} — ${person.role}`, description: person.lede },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain bg-void font-body text-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: person.name,
              alternateName: person.handle,
              url: 'https://tnl293107.github.io/',
              email: `mailto:${person.email}`,
              jobTitle: person.role,
              address: { '@type': 'PostalAddress', addressLocality: 'Đà Nẵng', addressCountry: 'VN' },
              alumniOf: { '@type': 'CollegeOrUniversity', name: 'FPT University Đà Nẵng' },
              sameAs: [person.github],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
