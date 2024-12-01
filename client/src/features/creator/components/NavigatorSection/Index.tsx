import { useTranslations } from 'next-intl';
import NavigatorDefaultStyle from '@core/components/NavigatorDefaultStyle';

const NavigatorSection = () => {
  const t = useTranslations<'Creator'>('Creator');
  return (
    <div className="flex flex-row flex-wrap justify-between gap-x-[2%] gap-y-4 lg:flex-nowrap lg:gap-6">
      <NavigatorDefaultStyle styleNumber="1" href="/creator/courses">
        {t('navigatorCourse')}
      </NavigatorDefaultStyle>
      <NavigatorDefaultStyle styleNumber="2" href="/creator/projects">
        {t('navigatorProjects')}
      </NavigatorDefaultStyle>
      <NavigatorDefaultStyle styleNumber="3" href="/creator/apps">
        {t('navigatorApps')}
      </NavigatorDefaultStyle>
      <NavigatorDefaultStyle styleNumber="4" href="/creator/mentors">
        {t('navigatorMentors')}
      </NavigatorDefaultStyle>
    </div>
  );
};

export default NavigatorSection;
