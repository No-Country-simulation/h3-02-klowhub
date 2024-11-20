import { getTranslations } from 'next-intl/server';
import ContentExtraInfoCard from '../ContentExtraInfoCard/Index';
import ContentTabs from '../ContentTabs/Index';

const ContentSection = async () => {
  const t = await getTranslations<'Creator'>('Creator');
  return (
    <div className="w-full rounded-lg bg-neutral-100 p-6 text-white shadow-app-1">
      <h2 className="pb-4 text-2xl font-bold leading-6">{t('contentTitle')}</h2>
      <p className="pb-4 text-sm md:text-base">{t('contentDescription')}</p>
      <div className="flex gap-x-5">
        <ContentTabs
          general={t('tabGeneral')}
          apps={t('tabApps')}
          courses={t('tabCourses')}
          projects={t('tabProjects')}
          mentors={t('tabMentors')}
          headerAmount={t('headerAmount')}
          headerName={t('headerName')}
          headerPlatform={t('headerPlatform')}
          headerState={t('headerState')}
          headerType={t('headerType')}
          viewDetails={t('viewDetails')}
        />
        <ContentExtraInfoCard
          totalEarningsText={t('totalEarnings')}
          totalEarnings="$2850"
          publishedCoursesText={t('publishedCourses')}
          publishedCourses="5"
          transferredAppsText={t('transferredApps')}
          transferredApps="11"
          mentoringHoursText={t('mentoringHours')}
          mentoringHours="27"
          viewDetails={t('viewEarnings')}
        />
      </div>
    </div>
  );
};

export default ContentSection;
