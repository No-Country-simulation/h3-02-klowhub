import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import { Link } from '@core/lib/i18nRouting';
import type { MentorsCardType } from '@core/schemas/mentor-card.schema';
import { getContent } from '@core/services/getContent';
import CardTeacher from '@features/mentors/components/MentorCard';
import MentorsCarouselWrapper from './MentorsCarouselWrapper';

export default async function MentorSection() {
  const ct = await getTranslations<'Common'>('Common');
  const mentors = await getContent<MentorsCardType[]>('/json/recommended-mentors.json');
  return (
    <section className="mx-auto w-full">
      <CardsFlexContainer items={mentors}>
        {(item, i) => (
          <CardTeacher
            key={`gcm-${i}`}
            name={item.name}
            price={item.price}
            reviews={item.reviews}
            platform={item.platform}
            imageSrc={item.img}
            countryCode={item.country}
            sessions={item.sessions}
            idioma={item.language}
            hourText={ct('hours')}
            reviewText={ct('reviews')}
            sessionText={ct('session')}
          />
        )}
      </CardsFlexContainer>

      <MentorsCarouselWrapper
        mentors={mentors}
        hourText={ct('hours')}
        reviewText={ct('reviews')}
        sessionText={ct('session')}
      />

      <div className="mx-auto mt-8 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/mentors">{ct('viewMore')}</Link>
        </Button>
      </div>
    </section>
  );
}
