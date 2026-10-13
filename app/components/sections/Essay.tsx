import { Reveal } from "~/components/ui/Reveal";
import { essay } from "~/content/about";
import { site } from "~/content/site";
import { cx } from "~/lib/cx";
import styles from "./Essay.module.css";

/** Emilia's essay on her work, set as a long read with its key lines drawn out. */
export function Essay() {
  return (
    <section className={styles.section} aria-labelledby="essay-title">
      <article className={cx("container", styles.article)}>
        <Reveal as="header" className={styles.head}>
          <p className="eyebrow">Лично</p>
          <h2 id="essay-title" className={styles.title}>
            {essay.title}
          </h2>
        </Reveal>

        <div className={styles.body}>
          {essay.blocks.map((block, i) =>
            block.kind === "pull" ? (
              <Reveal as="p" key={i} className={styles.pull}>
                {block.text}
              </Reveal>
            ) : (
              <p key={i} className={styles.paragraph}>
                {block.text}
              </p>
            ),
          )}
        </div>

        <footer className={styles.signature}>
          <p className={styles.name}>{site.person}</p>
          <ul role="list" className={styles.roles}>
            {site.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </footer>
      </article>
    </section>
  );
}
