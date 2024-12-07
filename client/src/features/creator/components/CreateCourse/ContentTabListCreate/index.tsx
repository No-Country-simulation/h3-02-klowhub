'use client';

import { useState } from 'react';
import { TabsList, TabsTrigger } from '@core/components/Tabs';
import ContentDropdown from '../../ContentDropdown/Index';

interface ContentTabListProps {
  general: string;
  apps: string;
  courses: string;
  projects: string;
}

const ContentTabListCreate = ({ apps, courses, general, projects }: ContentTabListProps) => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <TabsList className="w-full min-[580px]:min-w-[438px] min-[770px]:min-w-[480px] min-[820px]:max-w-[40%]">
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
      </div>
      <div className="block w-full min-[580px]:hidden">
        <ContentDropdown
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          apps={apps}
          courses={courses}
          general={general}
          mentors={''}
          projects={projects}
        />
      </div>
    </TabsList>
  );
};

export default ContentTabListCreate;
