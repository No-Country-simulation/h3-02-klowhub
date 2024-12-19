'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@core/lib/i18nRouting';
import { signOut } from '@features/auth/service/signout.service';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';
import Button from '../Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../Dropdown/Index';

interface UserSubmenuProps {
  profileAlt: string;
  profileText: string;
  logoutText: string;
  creator: CreatorCourseType | null;
}

export default function UserSubmenu({
  creator,
  profileAlt,
  profileText,
  logoutText,
}: UserSubmenuProps) {
  const handleLogout = () => {
    signOut().then(() => {});
  };
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild className="no-outline">
        <Button className="flex size-12 items-center justify-center rounded-full p-0">
          <Image
            src={creator?.image || '/images/mocks/avatar_mock1.png'}
            alt={creator?.firstName || 'default'}
            width={60}
            height={60}
            className="size-full rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        <DropdownMenuContent
          asChild
          sideOffset={12}
          alignOffset={-20}
          align="end"
          className="min-w-48 border-0 bg-neutral-100 !p-0 font-medium">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}>
            <div className="border-b px-4 py-2">
              <p className="text-sm font-medium text-white">{creator?.firstName}</p>
              <p className="text-xs text-white/50">{creator?.email}</p>
            </div>
            <DropdownMenuItem
              asChild
              className="h-11 min-h-11 w-full cursor-pointer px-4 text-white transition-colors duration-300 ease-in-out hover:bg-white/5 hover:text-primary-A-200 active:bg-white/10 active:text-primary-A-100">
              <Link href={'/profile'} className="flex items-center gap-3 text-left text-sm">
                {profileText}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="h-11 min-h-11 w-full cursor-pointer px-4 text-white transition-colors duration-300 ease-in-out hover:bg-white/5 hover:text-primary-A-200 active:bg-white/10 active:text-primary-A-100">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full items-center justify-start gap-3 text-sm">
                {logoutText}
              </Button>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
