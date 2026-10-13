import type { Photo } from "~/assets/images";
import { Emblem } from "~/components/brand/Logo";
import { cx } from "~/lib/cx";
import styles from "./ArchFrame.module.css";
import { Picture } from "./Picture";

interface ArchFrameProps {
  /** Without a photo, the arch holds the gold emblem on candle-lit plum. */
  photo?: Photo;
  sizes?: string;
  priority?: boolean;
  /** Focal point for the crop, as CSS object-position. */
  focus?: string;
  className?: string;
}

/**
 * A photo in an arched window, with a fine gold halo and a soft candle glow
 * behind it. The arch is the site's recurring shape.
 */
export function ArchFrame({
  photo,
  sizes = "100vw",
  priority,
  focus,
  className,
}: ArchFrameProps) {
  return (
    <div className={cx(styles.frame, className)}>
      <span className={styles.halo} aria-hidden="true" />
      {photo ? (
        <Picture
          photo={photo}
          sizes={sizes}
          priority={priority}
          focus={focus}
          className={styles.picture}
        />
      ) : (
        <div className={cx(styles.picture, styles.lit)} aria-hidden="true">
          <Emblem tone="dark" className={styles.emblem} />
        </div>
      )}
    </div>
  );
}
