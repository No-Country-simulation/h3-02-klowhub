import css from './checklist.module.css';
import { cn } from '../../lib/utils';

interface CheckListProps {
  items: string[];
  className?: string;
}

export default function CheckList({ items = [], className = '' }: CheckListProps) {
  return (
    <ul className={cn('space-y-1 text-sm font-normal text-white', className)}>
      {items.map((item, i) => (
        <li key={`check-${i}`} className={css.checkListItem}>
          <div className="absolute left-[3.75rem] top-1/2 inline-flex -translate-y-1/2">{item}</div>
        </li>
      ))}
    </ul>
  );
}
