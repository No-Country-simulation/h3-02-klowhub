import chevronRight from '/public/svg/chevronRight.svg';
import chevronDown from '/public/svg/chevronDown.svg';
import Image from 'next/image';
import ScrollArea from '@core/components/ScrollArea/ScrollArea';
import type { VideoModule } from '../../types/video.types';

interface VideoModulesProps {
  modules: VideoModule[];
}

const VideoModules = ({ modules }: VideoModulesProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-2 p-4">
        {modules.map(module => (
          <div key={module.id} className="space-y-2">
            <button className="hover:text-primary flex w-full items-center gap-2 transition-colors">
              {module.lessons.length > 0 ? (
                <Image
                  src={chevronDown}
                  alt="chevron down"
                  width={16}
                  height={16}
                  className="size-4"
                />
              ) : (
                <Image
                  src={chevronRight}
                  alt="chevron right"
                  width={16}
                  height={16}
                  className="size-4"
                />
              )}
              {module.name}
            </button>
            {module.lessons.length > 0 && (
              <div className="space-y-2 pl-6">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={index}
                    className="hover:text-primary block w-full text-left transition-colors">
                    {lesson.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default VideoModules;
