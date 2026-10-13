import { ArrowDown } from "lucide-react";
import { Link } from "react-router";
import { CtaBand } from "~/components/sections/CtaBand";
import { PageIntro } from "~/components/sections/PageIntro";
import { MassageSection } from "~/components/sections/services/MassageSection";
import { ReikiSection } from "~/components/sections/services/ReikiSection";
import { SessionsSection } from "~/components/sections/services/SessionsSection";
import { serviceIcons } from "~/components/ui/Icons";
import { approach, services } from "~/content/services";
import { pageMeta } from "~/lib/seo";
import { nbsp } from "~/lib/typography";
import type { Route } from "./+types/services";
import styles from "./services.module.css";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Услуги – онлайн сесии, сесии на живо, Рейки обучения и масаж | ДЕЯ",
    description:
      "Индивидуални възстановяващи сесии онлайн и на живо в Плевен, тета хилинг, обучения в двуканална Рейки система (I, II и III степен) и енерготерапевтичен масаж.",
    path: "/uslugi",
  });
}

export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Услуги"
        title={nbsp("Сесии, обучения и масажни практики")}
        lead={<p>{approach.body}</p>}
        aside={
          <nav aria-label="Към услуга" className={styles.index}>
            <ul role="list" className={styles.indexList}>
              {services.map((service) => {
                const Icon = serviceIcons[service.id];
                return (
                  <li key={service.id}>
                    <Link
                      to={`#${service.anchor}`}
                      className={styles.indexLink}
                    >
                      <Icon className={styles.indexIcon} />
                      <span>{service.title}</span>
                      <ArrowDown
                        aria-hidden="true"
                        strokeWidth={1.6}
                        className={styles.indexArrow}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        }
      />

      <SessionsSection />
      <ReikiSection />
      <MassageSection />
      <CtaBand />
    </>
  );
}
