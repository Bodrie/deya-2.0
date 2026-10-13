import { cx } from "~/lib/cx";
import { LeafBullet } from "./Icons";
import styles from "./LeafList.module.css";

interface LeafListProps {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}

/** Bulleted list with the small gold leaf from the logo. */
export function LeafList({ items, columns = 1, className }: LeafListProps) {
  return (
    <ul
      role="list"
      className={cx(styles.list, className)}
      data-columns={columns}
    >
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <LeafBullet className={styles.leaf} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
