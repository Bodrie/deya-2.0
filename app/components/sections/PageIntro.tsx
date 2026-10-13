import type { ReactNode } from "react";
import { cx } from "~/lib/cx";
import styles from "./PageIntro.module.css";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Extra content under the lead, e.g. in-page links. */
  children?: ReactNode;
  /** Optional media column on wide screens. */
  aside?: ReactNode;
}

/** Opening block of an inner page. Holds the page's h1. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: PageIntroProps) {
  return (
    <section className={styles.intro} aria-labelledby="page-title">
      <div
        className={cx("container", styles.grid)}
        data-aside={aside ? "" : undefined}
      >
        <div className={styles.copy}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
          {lead && <div className={cx("lead", styles.lead)}>{lead}</div>}
          {children}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </section>
  );
}
