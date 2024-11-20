import { cva } from 'class-variance-authority';

interface BadgeProps {
  text?: string;
  variant?: 'default' | 'pro' | undefined;
}

const badgeStyles = cva(
  'inline-flex items-center justify-center shadow-sm no-outline px-1.5 py-1 text-sm font-medium backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-primary-B-50 text-primary-B-450 rounded-md',
        pro: 'bg-gradient-bg-3  text-white rounded-lg',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export default function Badge({ text = '', variant = 'default' }: BadgeProps) {
  return <span className={badgeStyles({ variant })}>{text}</span>;
}
