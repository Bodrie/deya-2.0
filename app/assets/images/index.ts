/*
 * Photos of the studio. Each import is resized and re-encoded at build time
 * (AVIF, WebP and a JPEG fallback). The originals are small, so we never
 * request widths above their native size. A light grade (a touch brighter,
 * slightly calmer colour) helps the phone photos sit in the pearl palette.
 */
import lounge from "./studio-lounge.jpg?w=480;718&brightness=1.05&saturation=0.72&format=avif;webp;jpg&as=picture";
import massageRoom from "./studio-massage-room.jpg?w=480;718&brightness=1.05&saturation=0.72&format=avif;webp;jpg&as=picture";
import sessionRoom from "./studio-session-room.jpg?w=480;720&brightness=1.05&saturation=0.72&format=avif;webp;jpg&as=picture";

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
  lounge: {
    picture: lounge,
    alt: "Кът за изчакване в студиото: кремави столове, възглавници и стъклена масичка с ваза с лалета",
  },
} satisfies Record<string, Photo>;
