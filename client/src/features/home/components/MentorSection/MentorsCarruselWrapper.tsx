'use client';

import CardsFlexCarrusel from '@core/components/CardsFlexCarrusel';
import type { MentorsCardType } from '@core/schemas/mentor-card.schema';
import MentorCard from '../MentorCard';

interface MentorsCarruselWrapperProps {
  mentors: MentorsCardType[];
  hourText: string;
  reviewText: string;
  sessionText: string;
}

export default function MentorsCarruselWrapper({
  hourText,
  reviewText,
  sessionText,
  mentors,
}: MentorsCarruselWrapperProps) {
  return (
    <CardsFlexCarrusel items={mentors} classNameContainer="max-w-[320px] min-[500px]:max-w-[450px]">
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
    </CardsFlexCarrusel>
  );
}
