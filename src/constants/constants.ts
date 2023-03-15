export const DATE_REGEX =
  /^20[2-3][0-9]-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

export const PHONE_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

export const headerSettings = [
  { name: "Профил", href: "/profile" },
  { name: "Излез", href: "/" },
];

export const facebookLink =
  "https://www.facebook.com/%D0%95%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D0%B9%D0%BD%D0%B8-%D1%82%D0%B5%D1%80%D0%B0%D0%BF%D0%B8%D0%B8-%D0%94%D0%95%D0%AF-105865118280197";

export const sxMbSpacing = {
  xs: 4,
  sm: 5,
  md: 5,
  lg: 5,
};
