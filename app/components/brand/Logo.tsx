import type { CSSProperties } from "react";
import emblemUrl from "~/assets/brand/emblem.svg?url";
import logoUrl from "~/assets/brand/logo.svg?url";
import wordmarkUrl from "~/assets/brand/wordmark.svg?url";
import { cx } from "~/lib/cx";
import styles from "./Logo.module.css";

/**
 * The ДЕЯ logo is drawn as a CSS mask over a gold gradient, so one vector file
 * can be tinted for light grounds (deep gold) and dark grounds (bright gold).
 */
type Tone = "light" | "dark";

const mask = (url: string) => ({ "--mask": `url("${url}")` }) as CSSProperties;

interface LogoProps {
  tone?: Tone;
  className?: string;
}

/** Hands and leaves, without the wordmark. Decorative. */
export function Emblem({ tone = "light", className }: LogoProps) {
  return (
    <span
      aria-hidden="true"
      data-tone={tone}
      className={cx(styles.mark, styles.emblem, className)}
      style={mask(emblemUrl)}
    />
  );
}

/** Full stacked logo: emblem above the ДЕЯ wordmark. */
export function LogoStacked({ tone = "dark", className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="ДЕЯ"
      data-tone={tone}
      className={cx(styles.mark, styles.stacked, className)}
      style={mask(logoUrl)}
    />
  );
}

/** Horizontal lockup for the header: emblem, wordmark and descriptor. */
export function LogoLockup({ tone = "light", className }: LogoProps) {
  return (
    <span className={cx(styles.lockup, className)} data-tone={tone}>
      <span
        aria-hidden="true"
        data-tone={tone}
        className={cx(styles.mark, styles.lockupEmblem)}
        style={mask(emblemUrl)}
      />
      <span className={styles.lockupText}>
        <span
          aria-hidden="true"
          data-tone={tone}
          className={cx(styles.mark, styles.wordmark)}
          style={mask(wordmarkUrl)}
        />
        <span className={styles.descriptor}>Енергийни терапии</span>
      </span>
    </span>
  );
}
