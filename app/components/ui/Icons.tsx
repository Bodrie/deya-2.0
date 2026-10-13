import type { SVGProps } from "react";
import type { ServiceId } from "~/content/services";

/*
 * Service icons, drawn on a 48px grid with the almond leaf from the ДЕЯ logo
 * as the shared motif. Line icons inherit `currentColor`.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function LineIcon({ size = 48, children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** A screen with a leaf: sessions from a distance. */
export function IconOnline(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="6" y="9" width="36" height="25" rx="3" />
      <path d="M19 41h10M24 34v7" />
      <path d="M24 14.5c3.6 2.7 3.6 9.6 0 12.6c-3.6-3-3.6-9.9 0-12.6z" />
      <path d="M24 18v9" />
    </LineIcon>
  );
}

/** An arched doorway with a candle: the studio. */
export function IconLive(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M11 42V22a13 13 0 0 1 26 0v20" />
      <path d="M6 42h36" />
      <path d="M24 22.5c2.6 2.9 3.5 5.3 3.5 7.5a3.5 3.5 0 1 1-7 0c0-2.2.9-4.6 3.5-7.5z" />
      <path d="M21.5 42v-6.5h5V42" />
    </LineIcon>
  );
}

/** Three nested arches: the three degrees of Reiki, each going deeper. */
export function IconReiki(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M5 42h38" />
      <path d="M8 42V24a16 16 0 0 1 32 0v18" />
      <path d="M14 42V26a10 10 0 0 1 20 0v16" />
      <path d="M20 42V28a4 4 0 0 1 8 0v14" />
    </LineIcon>
  );
}

/** Open hands holding new leaves, after the ДЕЯ logo: care through touch. */
export function IconMassage(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4.5 25c3 8.4 10 14 19.5 14s16.5-5.6 19.5-14" />
      <path d="M4.5 25c3.5-1.6 7 .4 8.8 3.6c1.9 3.2 5 4.9 10.7 4.9" />
      <path d="M43.5 25c-3.5-1.6-7 .4-8.8 3.6c-1.9 3.2-5 4.9-10.7 4.9" />
      <path d="M24 30c-4.4-4.6-4.4-13.6 0-19c4.4 5.4 4.4 14.4 0 19z" />
      <path d="M17.5 18.5c-2.6-1.8-3.4-5.4-2-8.5c3 1.2 4.6 4.6 3.6 7.9" />
      <path d="M30.5 18.5c2.6-1.8 3.4-5.4 2-8.5c-3 1.2-4.6 4.6-3.6 7.9" />
    </LineIcon>
  );
}

export const serviceIcons: Record<
  ServiceId,
  (props: IconProps) => React.JSX.Element
> = {
  online: IconOnline,
  live: IconLive,
  reiki: IconReiki,
  massage: IconMassage,
};

/** Small filled leaf used as a list bullet. */
export function LeafBullet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M2.5 13.5C2.5 7.2 7.2 2.5 13.5 2.5c0 6.3-4.7 11-11 11z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconFacebook({ size = 20, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        fill="currentColor"
        d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3.1z"
      />
    </svg>
  );
}
