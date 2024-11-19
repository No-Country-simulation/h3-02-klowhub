import { useTranslations } from 'next-intl';
import styles from './HeadInquiries.module.css';

export default function CardInquiries() {
  const t = useTranslations('Platform');
  return (
    <div className={`${styles.gridContainer} max-w-[400px] rounded-lg bg-white/10 shadow-md`}>
      <div className={`${styles.consulta} `}>
        <p>{t('metainquiries')}</p>
      </div>
      <div className={`${styles.autor} `}></div>
      <p>{t('metaauthor')}</p>
      <div className={`${styles.fecha} `}>
        <p>{t('metadate')}</p>
      </div>
      <div className={`${styles.plataforma} `}>
        <p>{t('metaplatform')}</p>
      </div>
      <div className={`${styles.estado} `}>
        <p>{t('metastade')}</p>
      </div>
    </div>
  );
}
