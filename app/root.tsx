import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/noto-serif-display/wght.css";
import "@fontsource-variable/noto-serif-display/wght-italic.css";
import "./styles/tokens.css";
import "./styles/base.css";

import manropeCyrillic from "@fontsource-variable/manrope/files/manrope-cyrillic-wght-normal.woff2?url";
import displayCyrillic from "@fontsource-variable/noto-serif-display/files/noto-serif-display-cyrillic-wght-normal.woff2?url";
import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { StatusPage } from "./components/layout/StatusPage";

export const links: Route.LinksFunction = () => [
  // The Cyrillic subsets carry almost all visible text; fetch them early.
  {
    rel: "preload",
    href: displayCyrillic,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: manropeCyrillic,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f7f4f6" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#content" className="skip-link">
          Към съдържанието
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  const title = notFound ? "Страницата не е намерена" : "Нещо се обърка";

  return (
    <>
      <title>{`${title} | Енергийни терапии ДЕЯ`}</title>
      <Header />
      <main id="content" tabIndex={-1}>
        {notFound ? (
          <StatusPage
            code="Грешка 404"
            title={title}
            text="Адресът може да е променен или страницата вече не съществува."
          />
        ) : (
          <StatusPage
            code="Грешка"
            title={title}
            text="Възникна неочаквана грешка. Опитайте да презаредите страницата."
            detail={
              import.meta.env.DEV && error instanceof Error
                ? error.stack
                : undefined
            }
          />
        )}
      </main>
      <Footer />
    </>
  );
}
