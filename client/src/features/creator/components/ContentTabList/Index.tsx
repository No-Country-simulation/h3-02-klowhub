'use client';

import { useState } from 'react';
import { TabsList, TabsTrigger } from '@core/components/Tabs/Index';
import ContentDropdown from '../ContentDropdown/Index';

interface ContentTabListProps {
  general: string;
  apps: string;
  courses: string;
  projects: string;
  mentors: string;
}

const ContentTabList = ({ apps, courses, general, mentors, projects }: ContentTabListProps) => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <TabsList className="w-full min-[580px]:min-w-[438px] min-[580px]:overflow-hidden min-[820px]:max-w-[40%]">
      <div className="hidden w-full overflow-hidden min-[580px]:flex">
        <TabsTrigger value="general" onSelect={() => setActiveTab(general)}>
          {general}
        </TabsTrigger>
        <TabsTrigger value="apps" onSelect={() => setActiveTab(apps)}>
          {apps}
        </TabsTrigger>
        <TabsTrigger value="courses" onSelect={() => setActiveTab(courses)}>
          {courses}
        </TabsTrigger>
        <TabsTrigger value="projects" onSelect={() => setActiveTab(projects)}>
          {projects}
        </TabsTrigger>
        <TabsTrigger value="mentors" onSelect={() => setActiveTab(mentors)}>
          {mentors}
        </TabsTrigger>
      </div>
      <div className="block w-full min-[580px]:hidden">
        <ContentDropdown
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          apps={apps}
          courses={courses}
          general={general}
          mentors={mentors}
          projects={projects}
        />
      </div>
    </TabsList>
  );
};

export default ContentTabList;
