import { useTranslations } from 'next-intl';
import BannerCta from '@root/src/features/home/components/Banner';

const InicioBanner = () => {
  const t = useTranslations('Banner');
  return (
    <BannerCta
      title={t('connectWithExperts')}
      description={t('learnFromTheBest')}
      imageSrc="/images/klowhub_banner.png" // Cambia esta ruta a la imagen que quieres usar
    />
  );
};

export default InicioBanner;
