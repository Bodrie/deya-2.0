/*
 * Photos of the studio and of Емилия. Each import is resized and re-encoded at
 * build time (AVIF, WebP and a JPEG fallback). We never request widths above
 * an original's native size. A light grade (a touch brighter, slightly calmer
 * colour) helps the studio phone photos sit in the pearl palette; the
 * portraits keep their natural colour so skin tones stay true.
 */
import massageRoom from "./studio-massage-room.jpg?w=480;718&brightness=1.05&saturation=0.72&format=avif;webp;jpg&as=picture";
import sessionRoom from "./studio-session-room.jpg?w=480;720&brightness=1.05&saturation=0.72&format=avif;webp;jpg&as=picture";
import garden from "./emilia-garden.jpg?w=560;880;1200&format=avif;webp;jpg&as=picture";
import portrait from "./emilia-portrait.jpg?w=480;760;1010&format=avif;webp;jpg&as=picture";

export interface Photo {
  picture: ImagetoolsPicture;
  alt: string;
}

export const photos = {
  sessionRoom: {
    picture: sessionRoom,
    alt: "Залата за сесии в студио ДЕЯ: светъл килим, запалени свещи, столове с възглавници и растения до прозореца",
  },
  massageRoom: {
    picture: massageRoom,
    alt: "Масажната кушетка с мека бяла завивка и възглавница на цветя в светлата зала на студиото",
  },
  garden: {
    picture: garden,
    alt: "Емилия Стефанова, усмихната, в бяла дантелена блуза сред зеленина",
  },
  portrait: {
    picture: portrait,
    alt: "Портрет на Емилия Стефанова: усмихната, с ръка под брадичката",
  },
} satisfies Record<string, Photo>;
