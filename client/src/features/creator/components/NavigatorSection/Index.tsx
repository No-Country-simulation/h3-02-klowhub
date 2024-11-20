import { useTranslations } from 'next-intl';
import Navigator from '@core/components/Navigator/Index';

const NavigatorSection = () => {
  const t = useTranslations<'Creator'>('Creator');
  return (
    <div className="flex flex-row flex-wrap justify-between gap-x-[2%] gap-y-4 lg:flex-nowrap lg:gap-6">
      <Navigator
        href="/creator/courses"
        bgSize="290% 175%"
        bgPosition="3% 20%"
        bgImage="/images/klowhub_banner2.png"
        className="w-[48%] lg:w-full">
        {t('navigatorCourse')}
      </Navigator>
      <Navigator
        href="/creator/projects"
        bgSize="300% 240%"
        bgPosition="-50% 3%"
        bgImage="/images/klowhub_banner2.png"
        className="w-[48%] lg:w-full">
        {t('navigatorProjects')}
      </Navigator>
      <Navigator
        href="/creator/apps"
        bgSize="125% 100%"
        bgPosition="55% 100%"
        bgImage="/images/klowhub_banner2.png"
        className="w-[48%] lg:w-full">
        {t('navigatorApps')}
      </Navigator>
      <Navigator
        href="/creator/consultancies"
        bgSize="300% 240%"
        bgPosition="-50% 3%"
        bgImage="/images/klowhub_banner2.png"
        className="w-[48%] lg:w-full">
        {t('navigatorMentors')}
      </Navigator>
    </div>
  );
};

export default NavigatorSection;
