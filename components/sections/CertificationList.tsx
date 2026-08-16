"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Certification } from "@/types";
import { certifications } from "@/data/certifications";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const PREVIEW_WIDTH = 380;

/**
 * Certificate rows with a scan preview.
 *
 * The three states are genuinely different, so the markup differs rather than
 * pretending they are uniform:
 *   - link + image (Coursera): an anchor that previews on hover/focus
 *   - image only  (CCNA):      not a link, but still previewable and focusable
 *   - neither     (IELTS):     a plain row, no affordance implying otherwise
 *
 * Pointer handling: on a fine pointer the scan floats beside the cursor. Touch
 * devices have no hover at all, so they get an explicit toggle that expands the
 * scan inline underneath the row — the hover effect is never the only route to
 * the content.
 */
export function CertificationList() {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const isReduced = useReducedMotion();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  /**
   * Writes the position straight to the node. Keeping the pointer in state
   * would re-render the whole list on every mousemove — a lot of React work for
   * what is one `transform`.
   */
  const position = useCallback(() => {
    const node = previewRef.current;
    if (!node) return;

    const { x, y } = pointerRef.current;
    const height = node.offsetHeight || PREVIEW_WIDTH * 0.7;
    const left = Math.min(x + 24, window.innerWidth - PREVIEW_WIDTH - 16);
    const top = Math.min(Math.max(y - 100, 16), window.innerHeight - height - 16);
    node.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  }, []);

  const handleMove = useCallback(
    (event: React.MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      position();
    },
    [position],
  );

  /**
   * The panel only exists once `hoveredId` is set, which is a render *after*
   * the mousemove that would have placed it — so without this it paints once at
   * the top-left corner before the next mouse event moves it. Layout effect so
   * the correction happens before the browser paints, not one frame later.
   */
  useLayoutEffect(position, [hoveredId, position]);

  const hovered = certifications.find((c) => c.id === hoveredId && c.image);

  return (
    <>
      <ul className="mt-7 divide-y divide-border border-y border-border">
        {certifications.map((certification) => (
          <CertificationRow
            key={certification.id}
            certification={certification}
            canHover={hasFinePointer}
            isExpanded={expandedId === certification.id}
            onToggleExpanded={() =>
              setExpandedId((id) => (id === certification.id ? null : certification.id))
            }
            onPreviewOn={() => setHoveredId(certification.id)}
            onPreviewOff={() => setHoveredId((id) => (id === certification.id ? null : id))}
            onMouseMove={handleMove}
          />
        ))}
      </ul>

      {/* Floating scan. Rendered once rather than per row, and only where a
          hovering pointer exists. */}
      {hasFinePointer && hovered?.image ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed top-0 left-0 z-60 overflow-hidden rounded-lg border border-border-strong bg-bg-raised shadow-2xl shadow-black/60",
            !isReduced && "transition-opacity duration-200",
          )}
          // Positioned by handleMove via transform; `will-change` keeps that on
          // the compositor instead of triggering layout on every frame.
          style={{ width: PREVIEW_WIDTH, willChange: "transform" }}
        >
          <Image
            src={hovered.image.src}
            alt=""
            width={hovered.image.width}
            height={hovered.image.height}
            sizes={`${PREVIEW_WIDTH}px`}
            className="h-auto w-full"
          />
        </div>
      ) : null}
    </>
  );
}

interface RowProps {
  certification: Certification;
  canHover: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onPreviewOn: () => void;
  onPreviewOff: () => void;
  onMouseMove: (event: React.MouseEvent) => void;
}

function CertificationRow({
  certification,
  canHover,
  isExpanded,
  onToggleExpanded,
  onPreviewOn,
  onPreviewOff,
  onMouseMove,
}: RowProps) {
  const { name, issuer, date, href, image } = certification;

  const previewHandlers = image
    ? {
        // Record the pointer before flipping state, so the panel's first paint
        // already lands next to the cursor.
        onMouseEnter: (event: React.MouseEvent) => {
          onMouseMove(event);
          onPreviewOn();
        },
        onMouseLeave: onPreviewOff,
        onMouseMove,
        // Keyboard users get the same preview; it is anchored to the pointer's
        // last position, which is good enough for a decorative scan.
        onFocus: onPreviewOn,
        onBlur: onPreviewOff,
      }
    : {};

  const label = (
    <>
      <span className="flex items-center gap-2 text-sm text-text">
        {name}
        {href ? (
          <span
            aria-hidden="true"
            className="text-faint transition-colors group-hover:text-accent"
          >
            ↗
          </span>
        ) : null}
      </span>
      <span className="font-mono text-[0.68rem] tracking-[0.06em] text-faint">
        {issuer} · {date}
      </span>
    </>
  );

  const rowClass =
    "group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5";

  return (
    <li data-reveal>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(rowClass, "transition-colors hover:text-accent")}
          {...previewHandlers}
        >
          {label}
        </a>
      ) : (
        <div className={rowClass} {...previewHandlers}>
          {label}
        </div>
      )}

      {/* Touch fallback: hover cannot happen, so expose the scan explicitly. */}
      {image && !canHover ? (
        <div className="pb-3.5">
          <button
            type="button"
            onClick={onToggleExpanded}
            aria-expanded={isExpanded}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.65rem] tracking-[0.1em] text-faint uppercase"
          >
            {isExpanded ? "Hide certificate" : "View certificate"}
          </button>

          {isExpanded ? (
            <div className="mt-3 overflow-hidden rounded-lg border border-border bg-bg-raised">
              <Image
                src={image.src}
                alt={`${name} certificate issued by ${issuer}`}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 92vw, 380px"
                className="h-auto w-full"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
