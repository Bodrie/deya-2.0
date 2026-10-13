import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { cx } from "~/lib/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";

interface ButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  /** Internal path ("/uslugi", "/#kontakti") or any external / tel: / mailto: URL. */
  to: string;
  variant?: Variant;
  /** Use "dark" on plum sections. */
  tone?: "light" | "dark";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  children: ReactNode;
}

/** Link styled as a button. Internal paths use client-side navigation. */
export function Button({
  to,
  variant = "primary",
  tone = "light",
  icon,
  iconPosition = "end",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], className);
  const content = (
    <>
      {icon && iconPosition === "start" && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "end" && (
        <span className={cx(styles.icon, styles.trailing)}>{icon}</span>
      )}
    </>
  );

  if (to.startsWith("/")) {
    return (
      <Link to={to} className={classes} data-tone={tone} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={to} className={classes} data-tone={tone} {...rest}>
      {content}
    </a>
  );
}
