import Image from 'next/image';
import { cn } from '@core/lib/utils';

interface ComingSoonProps {
  title: string;
  subTitle: string;
  className?: string;
}

export default function ComingSoon({ title, subTitle, className = '' }: ComingSoonProps) {
  return (
    <div
      className={cn(
        'relative mt-5 overflow-hidden rounded-lg border border-neutral-100/20 bg-gradient-to-br from-neutral-100/40 to-neutral-100/30 p-8 shadow-2xl backdrop-blur-md',
        className
      )}>
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        <Image src="/svg/rocket.svg" alt="Rocket" width={60} height={60} className="mb-4 size-16" />
        <h2 className="mb-4 bg-gradient-to-r from-primary-A-300 to-primary-B-300 bg-clip-text text-3xl font-bold text-transparent">
          {title}
        </h2>
        <p className="mb-6 text-center text-lg text-gray-300">{subTitle}</p>
        <div className="h-1 w-16 rounded-full bg-primary-B-400"></div>
      </div>
      <div
        className="pointer-events-none absolute left-0 top-0 size-full"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
        }}></div>
    </div>
  );
}
