"use client";

import { useEffect, useState } from "react";
import { useIsHydrated } from "@/lib/hooks/useMediaQuery";

/**
 * There is no contact form, because there is no backend or mail service to
 * receive one — a form that silently discards messages is worse than no form.
 * This is the useful half of one: the address, one click away from the
 * clipboard.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const isHydrated = useIsHydrated();

  // navigator.clipboard is absent on insecure origins and in some in-app
  // browsers; the button is only rendered where it will actually work. Gated on
  // hydration so the server and first client render agree.
  const canCopy = isHydrated && Boolean(navigator.clipboard);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (!canCopy) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard permission can be denied; the mailto link beside this button
      // still works, so there is nothing useful to report here.
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase transition-colors hover:border-border-strong hover:text-text"
    >
      {copied ? (
        <>
          <span aria-hidden="true" className="text-accent">
            ✓
          </span>
          Copied
        </>
      ) : (
        "Copy address"
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
