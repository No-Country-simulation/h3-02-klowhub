'use client';

import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';

interface UserModeToggleProps {
  explorerText: string;
  creatorText: string;
  className?: string;
}

const UserModeToggle = ({ creatorText, explorerText, className = '' }: UserModeToggleProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <div className={cn('flex h-full max-h-full items-center justify-center gap-2', className)}>
      <span className="min-w-[85px] max-w-[85px] text-ellipsis text-nowrap font-medium text-white">
        {mode === 'creator' || pathname === '/creator' ? creatorText : explorerText}
      </span>
      <div className="flex h-full max-h-[40px] items-center rounded-full bg-primary-B-500 p-2">
        <Link
          href="/platform?mode=explorer"
          className={cn(
            'rounded-full p-1 transition-colors',
            mode === 'creator' || pathname === '/membership' || pathname === '/creator'
              ? 'bg-primary-B-500 text-white shadow-app-4'
              : 'bg-white text-primary-B-500'
          )}>
          <svg
            width="35"
            height="26"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.3335 16.6667V8.33333C3.3335 7.44928 3.68469 6.60143 4.30981 5.97631C4.93493 5.35119 5.78277 5 6.66683 5H13.3335C14.2176 5 15.0654 5.35119 15.6905 5.97631C16.3156 6.60143 16.6668 7.44928 16.6668 8.33333V16.6667C16.6668 17.1087 16.4912 17.5326 16.1787 17.8452C15.8661 18.1577 15.4422 18.3333 15.0002 18.3333H5.00016C4.55814 18.3333 4.13421 18.1577 3.82165 17.8452C3.50909 17.5326 3.3335 17.1087 3.3335 16.6667Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 5.00008V3.33341C7.5 2.89139 7.6756 2.46746 7.98816 2.1549C8.30072 1.84234 8.72464 1.66675 9.16667 1.66675H10.8333C11.2754 1.66675 11.6993 1.84234 12.0118 2.1549C12.3244 2.46746 12.5 2.89139 12.5 3.33341V5.00008"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.6665 17.5001V13.3334C6.6665 12.8914 6.8421 12.4675 7.15466 12.1549C7.46722 11.8423 7.89114 11.6667 8.33317 11.6667H11.6665C12.1085 11.6667 12.5325 11.8423 12.845 12.1549C13.1576 12.4675 13.3332 12.8914 13.3332 13.3334V17.5001"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.6665 8.33325H13.3332"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.6665 15H13.3332"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          href="/creator?mode=creator"
          className={cn(
            'rounded-full p-1 transition-colors',
            mode !== 'creator' || (pathname !== '/membership' && pathname !== '/creator')
              ? 'bg-primary-B-500 text-white shadow-app-4'
              : 'bg-white text-primary-B-500'
          )}>
          <svg
            width="35"
            height="26"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.24992 13.7498C2.99992 14.7998 2.58325 17.9164 2.58325 17.9164C2.58325 17.9164 5.69992 17.4998 6.74992 16.2498C7.34159 15.5498 7.33325 14.4748 6.67492 13.8248C6.35101 13.5156 5.92433 13.337 5.47677 13.3231C5.02922 13.3093 4.59232 13.4612 4.24992 13.7498Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 12.5L8 10C8.44345 8.84957 9.00184 7.74676 9.66667 6.70838C10.6377 5.15587 11.9897 3.87758 13.5942 2.99512C15.1986 2.11266 17.0022 1.65535 18.8333 1.66671C18.8333 3.93338 18.1833 7.91671 13.8333 10.8334C12.7807 11.499 11.664 12.0573 10.5 12.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.99992 9.99993H3.83325C3.83325 9.99993 4.29159 7.47493 5.49992 6.6666C6.84992 5.7666 9.66659 6.6666 9.66659 6.6666"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 12.5002V16.6668C10.5 16.6668 13.025 16.2085 13.8333 15.0002C14.7333 13.6502 13.8333 10.8335 13.8333 10.8335"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UserModeToggle;
