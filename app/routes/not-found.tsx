import { StatusPage } from "~/components/layout/StatusPage";
import type { Route } from "./+types/not-found";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Страницата не е намерена | Енергийни терапии ДЕЯ" },
    { name: "robots", content: "noindex" },
  ];
}

export default function NotFound() {
  return (
    <StatusPage
      code="Грешка 404"
      title="Страницата не е намерена"
      text="Адресът може да е променен или страницата вече не съществува."
    />
  );
}
