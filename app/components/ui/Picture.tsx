import type { Photo } from "~/assets/images";

interface PictureProps {
  photo: Photo;
  /** Layout width hint for the browser, e.g. "(min-width: 64rem) 30rem, 90vw". */
  sizes: string;
  /** Above-the-fold images should load eagerly with high priority. */
  priority?: boolean;
  /** Focal point when the image is cropped, as CSS object-position (e.g. "50% 30%"). */
  focus?: string;
  className?: string;
}

const mime = (format: string) => `image/${format === "jpg" ? "jpeg" : format}`;

/** Responsive <picture> with AVIF/WebP sources and a JPEG fallback. */
export function Picture({
  photo,
  sizes,
  priority = false,
  focus,
  className,
}: PictureProps) {
  const { sources, img } = photo.picture;

  return (
    <picture className={className}>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source
          key={format}
          type={mime(format)}
          srcSet={srcSet}
          sizes={sizes}
        />
      ))}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={focus ? { objectPosition: focus } : undefined}
      />
    </picture>
  );
}
