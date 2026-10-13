/// <reference types="vite/client" />

/** Shape returned by vite-imagetools for `?…&as=picture` imports. */
interface ImagetoolsPicture {
  /** Keyed by format (avif, webp, jpg…); each value is a ready `srcset`. */
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

declare module "*as=picture" {
  const picture: ImagetoolsPicture;
  export default picture;
}
