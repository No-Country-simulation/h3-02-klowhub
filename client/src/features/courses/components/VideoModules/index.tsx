'use client';

import { useState } from 'react';
import ScrollArea from '@core/components/ScrollArea/ScrollArea';
import CollapsableModule from './CollapsableModule';
import type { VideoModuleType } from '../../schemas/coursevideo.schemas';

interface VideoModulesProps {
  modules: VideoModuleType[];
}

type ModuleId = string | number;

const VideoModules = ({ modules = [] }: VideoModulesProps) => {
  console.log(modules, 'moduleskey');
  const [openModules, setOpenModules] = useState<ModuleId[]>([]);
  const toggleModule = (id: ModuleId) => {
    setOpenModules(prev => (prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]));
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4 py-4 pe-2">
        {modules.map(module => (
          <CollapsableModule
            key={module?.['_id'] || module.id}
            module={module}
            isOpen={openModules.includes(module?.['_id'] || module.id)}
            onToggle={() => toggleModule(module?.['_id'] || module.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default VideoModules;
