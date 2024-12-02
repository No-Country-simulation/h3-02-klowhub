'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { MentorsCardType } from '@core/schemas/mentor-card.schema';
import MentorCard from '../MentorCard';

interface MentorsCarouselWrapperProps {
  mentors: MentorsCardType[];
  hourText: string;
  reviewText: string;
  sessionText: string;
}

export default function MentorsCarouselWrapper({
  hourText,
  reviewText,
  sessionText,
  mentors,
}: MentorsCarouselWrapperProps) {
  return (
    <CardsFlexCarousel items={mentors} classNameContainer="max-w-[320px] min-[500px]:max-w-[450px]">
      {(item, i) => (
        <MentorCard
          key={`gcm-${i}`}
          name={item.name}
          price={item.price}
          reviews={item.reviews}
          platform={item.platform}
          imageSrc={item.img}
          platformImg="/images/appsheet_logo.png"
          urlPais="/svg/argentina.svg"
          sessions={item.sessions}
          idioma={item.language}
          hourText={hourText}
          reviewText={reviewText}
          sessionText={sessionText}
        />
      )}
    </CardsFlexCarousel>
  );
}
