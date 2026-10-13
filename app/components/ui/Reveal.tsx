import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/*
 * Eases blocks in as they scroll into view.
 *
 * The prerendered HTML always shows the content. After hydration, only blocks
 * that are still below the fold are marked as pending (hidden), and they are
 * released when they come into view. Styles live in styles/base.css and are
 * skipped entirely for visitors who prefer reduced motion.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.reveal = "shown";
        observer?.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return observer;
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Stagger in milliseconds, for siblings that arrive together. */
  delay?: number;
  children: ReactNode;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el || !io) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const belowFold =
      el.getBoundingClientRect().top > window.innerHeight * 0.92;
    if (!belowFold) return;

    el.dataset.reveal = "pending";
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
    : undefined;

  return (
    <Tag ref={ref} data-reveal="" className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
