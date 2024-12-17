import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import { Link } from '@core/lib/i18nRouting';
import type { InquiriesCardType } from '@core/schemas/inquiries-card.schema';
import { getContent } from '@core/services/getContent';
import InquiriesCarouselWrapper from './InquiriesCarouselWrapper';
import CardInquiries from '../CardInquiries/CardInquiries';
import HeadInquiries from '../HeaderInquiries/HeadInquiries';

export default async function SectionIquiris() {
  const t = await getTranslations<'Platform'>('Platform');
  const inquiries = await getContent<InquiriesCardType[]>(
    '/json/recommended-inquiries.json',
    undefined,
    'APP_URL'
  );

  return (
    <section className="flex flex-col space-y-8 text-xl">
      <h2 className="text-white">{t('latestInquiriesTitle')}</h2>
      <div className="flex min-w-full flex-col gap-[25px] px-0 min-[730px]:bg-neutral-100 min-[730px]:p-12">
        <HeadInquiries />
        <div className="hidden w-full flex-col gap-[25px] min-[730px]:flex">
          {inquiries?.map((item, i) => (
            <CardInquiries
              key={`gci-${i}`}
              title={item.title}
              description={item?.description || ''}
              name={item.name}
              date={item.date}
              state={item.state}
              imageUrl={item.avatar}
              platform={item.platform}
              imageEstado="/svg/checkCircle.svg"
            />
          ))}
        </div>
        <InquiriesCarouselWrapper inquiries={inquiries} />
      </div>
      <div className="mx-auto mt-8 w-full max-w-72">
        <Button asChild size="full" className="py-6">
          <Link href="/consultancies">{t('gotoInquiries')}</Link>
        </Button>
      </div>
    </section>
  );
}
