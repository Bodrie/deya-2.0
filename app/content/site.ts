import { typeset } from "~/lib/typography";

/**
 * Business details shown across the site. Edit here, not in components.
 */
export const site = {
  brand: "ДЕЯ",
  brandFull: "Енергийни терапии ДЕЯ",
  person: "Емилия Стефанова",
  roles: [
    "Енергиен терапевт",
    "Тета хилинг терапевт",
    "Рейки учител и терапевт",
    "Масажист",
  ],
  since: 2015,

  /** Public address of the deployed site. Used for canonical URLs, Open Graph and the sitemap. */
  url: "https://deya-therapy-2.web.app",
  locale: "bg_BG",

  phone: {
    display: "0878 774 806",
    href: "tel:+359878774806",
    international: "+359 878 774 806",
  },
  email: "emiliya.hristova@abv.bg",
  address: {
    city: "Плевен",
    street: "ул.\u00A0„Димитър Константинов“\u00A037",
    unit: "ет.\u00A02, офис\u00A03",
    country: "BG",
    /** Query used for the map and the directions link. */
    mapsQuery: "ул. Димитър Константинов 37, Плевен, България",
  },
  facebook:
    "https://www.facebook.com/%D0%95%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D0%B9%D0%BD%D0%B8-%D1%82%D0%B5%D1%80%D0%B0%D0%BF%D0%B8%D0%B8-%D0%94%D0%95%D0%AF-105865118280197",
} as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address.mapsQuery,
)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address.mapsQuery,
)}&output=embed`;

export interface NavItem {
  label: string;
  to: string;
}

export const navigation: NavItem[] = [
  { label: "Начало", to: "/" },
  { label: "Услуги", to: "/uslugi" },
  { label: "За мен", to: "/za-men" },
  { label: "Контакти", to: "/#kontakti" },
];

export const disclaimer = typeset(
  "Практиките и методите ми не заменят медицинска диагностика или лечение, а са насочени към подкрепа на релаксацията, енергийното равновесие, личния баланс и доброто усещане за себе си.",
);
