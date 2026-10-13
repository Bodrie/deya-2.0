import { Mail, Phone } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Reveal } from "~/components/ui/Reveal";
import { site } from "~/content/site";
import styles from "./CtaBand.module.css";

/** Closing invitation on the inner pages. */
export function CtaBand() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <Reveal className={styles.panel}>
          <h2 id="cta-title" className={styles.title}>
            Запишете час
          </h2>
          <p className={styles.text}>
            Свържете се с&nbsp;мен по телефона или по имейл, за да уговорим
            удобен ден и&nbsp;час за вашата сесия.
          </p>
          <div className={styles.actions}>
            <Button
              tone="dark"
              to={site.phone.href}
              icon={<Phone aria-hidden="true" strokeWidth={1.6} />}
              iconPosition="start"
            >
              {site.phone.display}
            </Button>
            <Button
              tone="dark"
              variant="secondary"
              to={`mailto:${site.email}`}
              icon={<Mail aria-hidden="true" strokeWidth={1.6} />}
              iconPosition="start"
            >
              Изпратете имейл
            </Button>
          </div>
          <p className={styles.address}>
            Студиото: гр.&nbsp;{site.address.city}, {site.address.street},{" "}
            {site.address.unit}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
