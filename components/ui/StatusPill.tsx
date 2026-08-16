import type { ProjectStatus } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Colour carries meaning here rather than decoration: green means it is
 * actually reachable, amber means it is honestly unfinished. Nothing else on
 * the page uses amber, so the distinction stays readable at a glance.
 */
const TONE: Record<ProjectStatus, { dot: string; text: string; ring: string; pulse: boolean }> =
  {
    production: {
      dot: "bg-accent",
      text: "text-accent",
      ring: "border-accent/30 bg-accent/5",
      pulse: true,
    },
    "in-development": {
      dot: "bg-amber",
      text: "text-amber",
      ring: "border-amber/30 bg-amber/5",
      pulse: false,
    },
    released: { dot: "bg-dim", text: "text-dim", ring: "border-border", pulse: false },
    independent: { dot: "bg-dim", text: "text-dim", ring: "border-border", pulse: false },
  };

interface StatusPillProps {
  status: ProjectStatus;
  label: string;
  className?: string;
}

export function StatusPill({ status, label, className }: StatusPillProps) {
  const tone = TONE[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "font-mono text-[0.65rem] tracking-[0.14em] uppercase",
        tone.ring,
        tone.text,
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {tone.pulse ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              tone.dot,
            )}
            aria-hidden="true"
          />
        ) : null}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", tone.dot)} />
      </span>
      {label}
    </span>
  );
}
