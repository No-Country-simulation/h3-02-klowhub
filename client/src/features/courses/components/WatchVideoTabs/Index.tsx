import { Tabs, TabsContent, TabsList, TabsTrigger } from '@root/src/core/components/Tabs/Index';
import type { VideoModule } from '../../types/video.types';
import VideoModules from '../VideoModules/Index';

const modules: VideoModule[] = [
  {
    id: 1,
    name: 'Módulo 1',
    lessons: [
      { id: 11, name: 'Introducción' },
      { id: 12, name: 'Leccion 1' },
      { id: 13, name: 'Leccion 2' },
      { id: 14, name: 'Leccion 3' },
    ],
  },
  { id: 2, name: 'Módulo 2', lessons: [] },
  { id: 3, name: 'Módulo 3', lessons: [] },
  { id: 5, name: 'Módulo 5', lessons: [] },
  { id: 6, name: 'Módulo 6', lessons: [] },
  { id: 7, name: 'Módulo 7', lessons: [] },
];

const WatchVideoTabs = () => {
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

export default WatchVideoTabs;
