import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import CardSectionLoader from '@core/components/CardSectionLoader';
import CardCart from './CardCart';
import PaymentSummary from './PaymentSummary';
import CourseSection from '../CourseSection';

const CartSection: React.FC = () => {
  const t = useTranslations<'SumaryCart'>('SumaryCart');
  const courses = [
    {
      title: 'Gestión de inventarios con AppSheet',
      platform: 'Appsheet',
      sector: 'Industria',
      rating: 4.1,
      reviews: 74,
      tags: ['Logística', 'Optimización'],
      imageUrl: '/images/mocks/course_mock2.png',
      // onRemove: () => console.log('Remove AppSheet course'),
    },
    {
      title: 'Dominando el desarrollo de aplicaciones con Power Apps',
      platform: 'Power Apps',
      sector: 'Industria',
      rating: 4.1,
      reviews: 74,
      tags: ['Logística', 'Optimización'],
      imageUrl: '/images/mocks/course_mock3.png',
      // onRemove: () => console.log('Remove Power Apps course'),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold text-white">{t('Title')}</h1>
      <div className="flex w-full flex-col text-white lg:flex-row">
        <div className="flex-1 lg:pr-7">
          {courses.map((course, index) => (
            <CardCart key={index} {...course} />
          ))}
        </div>
        <div className="mb-10 w-full lg:w-1/4">
          <PaymentSummary
            subtotal={6071}
            serviceFee={130}
            discount={20}
            paymentMethods={['/svg/Stripe.svg', '/svg/PayPal.png', '/svg/Etherium.png']}
          />
        </div>
      </div>
      <div>
        <Suspense fallback={<CardSectionLoader />}>
          <CourseSection />
        </Suspense>
      </div>
    </div>
  );
};

export default CartSection;
