import { useTranslations } from 'next-intl';
import { cn } from '@core/lib/utils';
import styles from './headInquiries.module.css';

export default function CardInquiries() {
  const t = useTranslations('Platform');
  return (
    <div className={`${styles.gridContainer} max-w-[400px] rounded-lg bg-white/10 shadow-md`}>
      <div className={`${styles.consulta} `}>
        <p>{t('metainquiries')}</p>
      </div>
      <div className={`${styles.autor} `}></div>
      <div className="flex justify-center">
        <p>{t('metaauthor')}</p>
      </div>
      <div className={cn(styles.fecha, 'flex justify-center')}>
        <p>{t('metadate')}</p>
      </div>
      <div className={cn(styles.plataforma, 'flex justify-center')}>
        <p>{t('metaplatform')}</p>
      </div>
      <div className={cn(styles.estado, 'flex justify-center')}>
        <p>{t('metastade')}</p>
      </div>
    </div>
  );
}
