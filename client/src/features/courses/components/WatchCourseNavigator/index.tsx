import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/components/Tabs';
import type { Locale } from '@core/lib/i18nRouting';
import type { VideoModuleType } from '../../schemas/coursevideo.schemas';
import VideoModules from '../VideoModules';

interface WatchCourseNavigatorProps {
  modules: VideoModuleType[];
  locale: Locale;
}

const WatchCourseNavigator = async ({ modules, locale }: WatchCourseNavigatorProps) => {
  const t = await getTranslations<'CoursesWatch'>({ locale: locale, namespace: 'CoursesWatch' });
  return (
    <Tabs defaultValue="lessons">
      <TabsList>
        <TabsTrigger value="lessons">{t('lesson')}</TabsTrigger>
        <TabsTrigger value="queries">{t('consultation')}</TabsTrigger>
        <TabsTrigger value="resources">{t('resource')}</TabsTrigger>
      </TabsList>
      <TabsContent value="lessons">
        <VideoModules modules={modules} />
      </TabsContent>
      <TabsContent value="queries">
        <div className="min-[780px]:min-h-auto flex min-h-[425px] flex-col items-center justify-start gap-y-6 py-4 pe-2 pt-24">
          <p className="select-none text-lg font-medium text-white/70">{t('noConsultations')}</p>
          <Image src="/svg/messages.svg" alt="messages" width="45" height="45" />
        </div>
      </TabsContent>
      <TabsContent value="resources">
        <div className="min-[780px]:min-h-auto flex min-h-[425px] flex-col items-center justify-start gap-y-6 py-4 pe-2 pt-24">
          <p className="select-none text-lg font-medium text-white/70">{t('noResources')}</p>
          <Image src="/svg/archive.svg" alt="messages" width="45" height="45" />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default WatchCourseNavigator;
