import { Emblem } from "~/components/brand/Logo";
import { Button } from "~/components/ui/Button";
import { cx } from "~/lib/cx";
import styles from "./StatusPage.module.css";

interface StatusPageProps {
  code: string;
  title: string;
  text: string;
  /** Developer-only error details. */
  detail?: string;
}

/** Calm full-width message for 404s and unexpected errors. */
export function StatusPage({ code, title, text, detail }: StatusPageProps) {
  return (
    <section className={styles.page} aria-labelledby="status-title">
      <div className={cx("container", styles.inner)}>
        <Emblem className={styles.emblem} />
        <p className="eyebrow">{code}</p>
        <h1 id="status-title" className={styles.title}>
          {title}
        </h1>
        <p className="lead">{text}</p>
        <div className={styles.actions}>
          <Button to="/">Към началната страница</Button>
          <Button to="/uslugi" variant="secondary">
            Услуги
          </Button>
        </div>
        {detail && <pre className={styles.detail}>{detail}</pre>}
      </div>
    </section>
  );
}
