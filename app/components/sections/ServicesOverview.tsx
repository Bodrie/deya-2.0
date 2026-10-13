import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/Button";
import { serviceIcons } from "~/components/ui/Icons";
import { Reveal } from "~/components/ui/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { services } from "~/content/services";
import styles from "./ServicesOverview.module.css";

export function ServicesOverview() {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            id="services-title"
            eyebrow="Услуги"
            title="Как мога да ви подкрепя"
          />
          <div className={styles.aside}>
            <Button
              to="/uslugi"
              variant="text"
              icon={<ArrowRight aria-hidden="true" strokeWidth={1.6} />}
            >
              Всички услуги
            </Button>
          </div>
        </div>

        <ul role="list" className={styles.grid}>
          {services.map((service, i) => {
            const Icon = serviceIcons[service.id];
            return (
              <Reveal
                as="li"
                key={service.id}
                className={styles.card}
                delay={(i % 2) * 110}
              >
                <Icon className={styles.icon} />
                <h3 className={styles.title}>
                  <Link
                    to={`/uslugi#${service.anchor}`}
                    className={styles.link}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className={styles.summary}>{service.summary}</p>
                <span className={styles.more} aria-hidden="true">
                  Научете повече
                  <ArrowRight strokeWidth={1.6} />
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
