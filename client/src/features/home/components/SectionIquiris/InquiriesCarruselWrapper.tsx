'use client';

import CardsFlexCarrusel from '@core/components/CardsFlexCarrusel';
import type { InquiriesCardType } from '@core/schemas/inquiries-card.schema';
import CardInquiries from '../CardInquiries/CardInquiries';

interface InquiriesCarruselWrapperProps {
  inquiries: InquiriesCardType[];
}
/*
      classNameContainer="max-w-[325px] min-w-[325px]"
      classNmaeButtons="min-[730px]:hidden"
*/
export default function InquiriesCarruselWrapper({ inquiries }: InquiriesCarruselWrapperProps) {
  return (
    <CardsFlexCarrusel
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
    </CardsFlexCarrusel>
  );
}
