import { useEffect, useMemo, useRef, useState } from "react";

function parseNumber(value: string) {
  const match = value.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, rawNumber, suffix] = match;
  const target = Number(rawNumber.replaceAll(",", ""));
  if (!Number.isFinite(target)) return null;

  const decimals = rawNumber.includes(".")
    ? rawNumber.split(".")[1].length
    : 0;
  const format = (number: number) =>
    `${prefix}${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number)}${suffix}`;

  return { target, format };
}

export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseNumber(value), [value]);
  const [display, setDisplay] = useState(() =>
    parsed ? parsed.format(0) : value,
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !parsed) {
      setDisplay(value);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1600;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(parsed.format(parsed.target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [parsed, value]);

  return (
    <span ref={ref} aria-label={value} aria-live="off">
      {display}
    </span>
  );
}
