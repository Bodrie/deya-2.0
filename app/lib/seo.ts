import type { MetaDescriptor } from "react-router";
import { site } from "~/content/site";

const ogImage = {
  url: `${site.url}/og-image.jpg`,
  width: "1200",
  height: "630",
  alt: `${site.brandFull} – ${site.person}, Плевен`,
};

interface PageMetaInput {
  title: string;
  description: string;
  /** Path of the page, e.g. "/uslugi". */
  path: string;
}

/** Title, description, canonical URL and social preview tags for a page. */
export function pageMeta({
  title,
  description,
  path,
}: PageMetaInput): MetaDescriptor[] {
  const url = new URL(path, site.url).toString();

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.brandFull },
    { property: "og:locale", content: site.locale },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage.url },
    { property: "og:image:width", content: ogImage.width },
    { property: "og:image:height", content: ogImage.height },
    { property: "og:image:alt", content: ogImage.alt },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

/** schema.org description of the practice, for search engines. */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: site.brandFull,
  description:
    "Индивидуални възстановяващи сесии, тета хилинг, Рейки сесии и обучения, енерготерапевтичен масаж в Плевен.",
  url: site.url,
  image: ogImage.url,
  logo: `${site.url}/icon-512.png`,
  telephone: site.phone.international,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    // Non-breaking spaces are for on-page typesetting only.
    streetAddress: `${site.address.street}, ${site.address.unit}`.replace(
      /\u00A0/g,
      " ",
    ),
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  areaServed: site.address.city,
  founder: {
    "@type": "Person",
    name: site.person,
    jobTitle: site.roles.join(", "),
  },
  knowsAbout: [
    "Тета хилинг",
    "Рейки",
    "Енерготерапевтичен масаж",
    "Класически масаж",
    "Йога масаж",
  ],
  sameAs: [site.facebook],
};
