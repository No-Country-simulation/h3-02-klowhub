import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import CardsFlexContainer from '@core/components/CardsFlexContainer';
import { Link } from '@core/lib/i18nRouting';
import CardTeacher from '@features/home/components/MentorCard';
import { getRecommendedMentors } from '@features/home/services/getRecommendedMentors';

export default async function MentorSection() {
  const ct = await getTranslations<'Common'>('Common');
  const mentors = await getRecommendedMentors();
  return (
    <section className="mx-auto w-full">
      <CardsFlexContainer items={mentors}>
        {(item, i) => (
          <CardTeacher
            key={`gcm-${i}`}
            title={item.name}
            price={item.price}
            reviews={item.reviews}
            textButton={item.platform}
            imageSrc={item.img}
            emoji="/images/appsheet_logo.png"
            urlPais="/svg/argentina.svg"
            sessions={item.sessions}
            idioma={item.language}
          />
        )}
      </CardsFlexContainer>

      <div className="mx-auto mt-8 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/mentors">{ct('viewMore')}</Link>
        </Button>
      </div>
    </section>
  );
}
