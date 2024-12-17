'use client';

import { useAtom } from 'jotai';
import { CreateCourseTriggers } from '@features/courses/models/enums/createCourseEnums';
import { courseCreationStore } from '@features/courses/store/courseCreationStore';
import TabsList from './TabList';
import TabsTrigger from './TabTrigger';

interface TabListTriggerProps {
  triggers: { label: string; value: CreateCourseTriggers; key: string }[];
  className?: string;
}

export default function TabListTrigger({ triggers, className = '' }: TabListTriggerProps) {
  const [{ courseId: _, ...state }, __] = useAtom(courseCreationStore);

  return (
    <TabsList asChild className={className}>
      <div className="w-full">
        {triggers.map((item, i) => (
          <TabsTrigger
            key={`tlt-${i}`}
            value={item.value}
            disabled={state[item.key as keyof typeof state].active ? false : true}>
            {item.label}
          </TabsTrigger>
        ))}
      </div>
    </TabsList>
  );
}
