import { metrics } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";

/**
 * Sits directly under the hero because it is the fastest honest signal
 * available. Every figure is checkable against a public repository, and the
 * tests total is the sum of the four project suites: 163 + 45 + 56 + 33 = 297.
 * The figures live in `data/site.ts`; recount from the suites before changing
 * either that file or this comment.
 */
export function Metrics() {
  return (
    <section aria-label="By the numbers" className="border-y border-border">
      <div className="mx-auto grid max-w-[88rem] grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            data-reveal
            className={[
              "px-5 py-9 sm:px-8 sm:py-11",
              // Interior hairlines only, so the band reads as one ruled strip
              // rather than four boxes.
              index % 2 === 1 ? "border-l border-border" : "",
              index >= 2 ? "border-t border-border lg:border-t-0" : "",
              index === 2 ? "lg:border-l" : "",
              index === 3 ? "lg:border-l" : "",
            ].join(" ")}
          >
            <p className="font-display text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
              <CountUp value={metric.value} />
              {metric.suffix ? (
                <span className="text-faint">{metric.suffix}</span>
              ) : null}
            </p>
            <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-faint">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
