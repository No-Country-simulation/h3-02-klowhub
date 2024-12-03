import css from './checklist.module.css';
import { cn } from '../../lib/utils';

interface CheckListProps {
  items: string[];
  className?: string;
}

export default function CheckList({ items = [], className = '' }: CheckListProps) {
  return (
    <ul
      className={cn(
        'space-y-11 text-sm font-normal text-white min-[450px]:space-y-7 min-[540px]:space-y-4',
        className
      )}>
      {items.map((item, i) => (
        <li key={`check-${i}`} className={css.checkListItem}>
          <p className="absolute left-[3.35rem] top-[60%] line-clamp-4 max-h-20 -translate-y-1/2 text-ellipsis min-[540px]:left-[3.75rem] min-[540px]:top-1/2 min-[540px]:line-clamp-3 min-[540px]:max-h-[60px] min-[840px]:line-clamp-none min-[840px]:inline-flex min-[840px]:max-h-none">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}
