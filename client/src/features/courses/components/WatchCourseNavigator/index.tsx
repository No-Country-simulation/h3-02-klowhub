import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/components/Tabs';
import type { VideoModuleType } from '../../schemas/video-schemas';
import VideoModules from '../VideoModules';

interface WatchCourseNavigatorProps {
  modules: VideoModuleType[];
}

const WatchCourseNavigator = ({ modules }: WatchCourseNavigatorProps) => {
  return (
    <Tabs defaultValue="lessons">
      <TabsList>
        <TabsTrigger value="lessons">Lecciones</TabsTrigger>
        <TabsTrigger value="queries">Consultas</TabsTrigger>
        <TabsTrigger value="resources">Recursos</TabsTrigger>
      </TabsList>
      <TabsContent value="lessons">
        <VideoModules modules={modules} />
      </TabsContent>
      <TabsContent value="queries">
        <div className="min-[780px]:min-h-auto flex min-h-[425px] flex-col items-center justify-start gap-y-6 py-4 pe-2 pt-24">
          <p className="select-none text-lg font-medium text-white/70">Todabia no hay consultas</p>
          <Image src="/svg/messages.svg" alt="messages" width="45" height="45" />
        </div>
      </TabsContent>
      <TabsContent value="resources">
        <div className="min-[780px]:min-h-auto flex min-h-[425px] flex-col items-center justify-start gap-y-6 py-4 pe-2 pt-24">
          <p className="select-none text-lg font-medium text-white/70">
            No hay recursos disponibles
          </p>
          <Image src="/svg/archive.svg" alt="messages" width="45" height="45" />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default WatchCourseNavigator;
