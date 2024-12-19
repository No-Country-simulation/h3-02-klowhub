import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import CardSectionLoader from '@core/components/CardSectionLoader';
import CourseSection from '@features/home/components/CourseSection';
import CourseCartList from '../CartList';
import PaymentSummary from '../PaymentSummary';

const CartSection = async () => {
  const t = await getTranslations<'SumaryCart'>('SumaryCart');
  const ct = await getTranslations<'Common'>('Common');

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold text-white">{t('Title')}</h1>
      <div className="flex w-full flex-col text-white lg:flex-row">
        <CourseCartList deleteText={ct('delete')} />

        <div className="mb-10 w-full lg:w-1/4">
          <PaymentSummary
            subtotal={0}
            serviceFee={130}
            discount={0}
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
