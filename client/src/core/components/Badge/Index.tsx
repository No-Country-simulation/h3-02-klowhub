interface BadgeProps {
  text?: string;
}
// Export default en componentes
export default function Badge({ text = '' }: BadgeProps) {
  return (
    <span className="inline-flex items-center justify-center rounded-md bg-primary-B-50 px-1.5 py-1 text-sm font-medium text-primary-B-450 shadow-sm backdrop-blur-sm">
      {text}
    </span>
  );
}
