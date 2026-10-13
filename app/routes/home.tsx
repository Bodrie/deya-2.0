import { photos } from "~/assets/images";
import { AboutTeaser } from "~/components/sections/AboutTeaser";
import { Approach } from "~/components/sections/Approach";
import { ContactSection } from "~/components/sections/ContactSection";
import { Hero } from "~/components/sections/Hero";
import { QuoteBand } from "~/components/sections/QuoteBand";
import { ServicesOverview } from "~/components/sections/ServicesOverview";
import { Statement } from "~/components/sections/Statement";
import { businessJsonLd, pageMeta } from "~/lib/seo";
import type { Route } from "./+types/home";

export function meta(): Route.MetaDescriptors {
  return [
    ...pageMeta({
      title: "Енергийни терапии ДЕЯ – Емилия Стефанова | Плевен",
      description:
        "Индивидуални възстановяващи сесии, тета хилинг, Рейки сесии и обучения, енерготерапевтичен масаж в Плевен. Сесии на живо и онлайн с Емилия Стефанова.",
      path: "/",
    }),
    { "script:ld+json": businessJsonLd },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesOverview />
      <AboutTeaser />
      <QuoteBand />
      <Approach
        photo={photos.massageRoom}
        caption="Залата за масаж и възстановяващи сесии"
      />
      <ContactSection />
    </>
  );
}
