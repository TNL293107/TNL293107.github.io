import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Numeric index + section name, e.g. "03" / "Projects". */
  index: string;
  kicker: string;
  title: string;
  /**
   * Trailing clause rendered in the accent colour. Carried over from the
   * previous build's emphasis device, which is this site's own voice rather
   * than the reference's "Title - Tagline!" construction.
   */
  accent?: string;
  lead?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  lead,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="mono-label flex items-center gap-3" data-reveal>
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
        {kicker}
      </p>

      <h2
        id={id}
        className="mt-5 text-[length:var(--text-section)] leading-[1.06] font-medium"
        data-reveal
      >
        {title}
        {accent ? <span className="text-accent"> {accent}</span> : null}
      </h2>

      {lead ? (
        <p
          className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-dim"
          data-reveal
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
