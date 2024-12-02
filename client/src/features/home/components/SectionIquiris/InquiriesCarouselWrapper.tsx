'use client';

import CardsFlexCarousel from '@core/components/CardsFlexCarousel';
import type { InquiriesCardType } from '@core/schemas/inquiries-card.schema';
import CardInquiries from '../CardInquiries/CardInquiries';

interface InquiriesCarouselWrapperProps {
  inquiries: InquiriesCardType[];
}

export default function InquiriesCarouselWrapper({ inquiries }: InquiriesCarouselWrapperProps) {
  return (
    <CardsFlexCarousel
      items={inquiries}
      className="min-[730px]:hidden"
      classNameContainer="max-w-[325px] min-w-[325px] pl-6"
      classNmaeButtons="min-[730px]:hidden">
      {(item, i) => (
        <CardInquiries
          key={`gci-${i}`}
          title={item.title}
          description={item.description || ''}
          name={item.name}
          date={item.date}
          state={item.state}
          imageUrl={item.avatar}
          platform={item.platform}
          imageEstado="/svg/checkCircle.svg"
        />
      )}
    </CardsFlexCarousel>
  );
}
