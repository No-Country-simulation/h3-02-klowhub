import { Tabs, TabsContent, TabsList, TabsTrigger } from '@root/src/core/components/Tabs/Index';
import type { VideoModuleType } from '../../schemas/video-schemas';
import VideoModules from '../VideoModules/Index';

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
      <TabsContent value="queries"></TabsContent>
      <TabsContent value="resources"></TabsContent>
    </Tabs>
  );
};

export default WatchCourseNavigator;
