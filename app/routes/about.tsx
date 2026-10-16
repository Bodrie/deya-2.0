import { photos } from "~/assets/images";
import { CtaBand } from "~/components/sections/CtaBand";
import { Essay } from "~/components/sections/Essay";
import { PageIntro } from "~/components/sections/PageIntro";
import { ArchFrame } from "~/components/ui/ArchFrame";
import { LeafList } from "~/components/ui/LeafList";
import { bio } from "~/content/about";
import { site } from "~/content/site";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/about";
import styles from "./about.module.css";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "За мен – Емилия Стефанова | Енергийни терапии ДЕЯ",
    description:
      "Емилия Стефанова – енергиен терапевт, тета хилинг терапевт, Рейки учител и терапевт, масажист. От 2015 г. работи с хора в Плевен.",
    path: "/za-men",
  });
}

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="За мен"
        title={site.person}
        aside={
          <ArchFrame
            photo={photos.portrait}
            priority
            sizes="(min-width: 30rem) 26rem, 84vw"
            focus="50% 40%"
            className={styles.arch}
          />
        }
      >
        <LeafList
          items={[...site.roles]}
          columns={2}
          className={styles.roles}
        />
        <div className={styles.bio}>
          {bio.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </PageIntro>

      <Essay />
      <CtaBand />
    </>
  );
}
