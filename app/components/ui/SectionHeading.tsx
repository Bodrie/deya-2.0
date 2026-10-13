import type { ReactNode } from "react";
import { cx } from "~/lib/cx";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading level; sections default to h2. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  id,
  align = "start",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cx(styles.heading, className)}
      data-align={align}
      data-tone={tone}
    >
      {eyebrow && (
        <p className="eyebrow" data-tone={tone}>
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {lead && <div className={cx("lead", styles.lead)}>{lead}</div>}
    </header>
  );
}
