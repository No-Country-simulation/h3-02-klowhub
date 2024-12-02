import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@core/components/Dropdown/Index';
import Button from '@core/components/Button';
import TabsTrigger from '@core/components/Tabs/TabTrigger';
import caretDown from '/public/svg/caretDown.svg';

interface ContentDropdownProps {
  general: string;
  apps: string;
  courses: string;
  projects: string;
  mentors: string;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const ContentDropdown = ({
  apps,
  courses,
  general,
  mentors,
  projects,
  activeTab,
  setActiveTab,
}: ContentDropdownProps) => {
  const tabs = [
    { value: 'general', label: general },
    { value: 'apps', label: apps },
    { value: 'courses', label: courses },
    { value: 'projects', label: projects },
    { value: 'mentors', label: mentors },
  ];

  return (
    <div className="mb-4 min-[580px]:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {activeTab}
            <Image src={caretDown} alt="caretDown" width={16} height={16} className="ml-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)] bg-neutral-100/50 backdrop-blur-lg min-[580px]:hidden">
          {tabs.map(tab => (
            <DropdownMenuItem
              key={tab.value}
              className="w-full"
              onSelect={() => setActiveTab(tab.label)}>
              <TabsTrigger
                value={tab.value}
                className="w-full"
                onSelect={() => setActiveTab(tab.label)}>
                {tab.label}
              </TabsTrigger>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ContentDropdown;
