import { navigation, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-faint">
              {site.positioning}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border pt-7 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.65rem] tracking-[0.08em] text-faint">
            © {new Date().getFullYear()} {site.name} — {site.location}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
            >
              Email
            </a>
            <a
              href="#top"
              className="font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-accent"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
