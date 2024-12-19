'use client';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import Button from '@core/components/Button';
import { cartStoreAtom } from '@features/cart/store/cart.store';
import { Paid } from '../Paypal/Paid';

interface PaymentSummaryProps {
  subtotal: number;
  serviceFee: number;
  discount?: number;
  paymentMethods: string[];
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  subtotal,
  serviceFee,
  discount = 0,
  paymentMethods,
}) => {
  const t = useTranslations<'SumaryCart'>('SumaryCart');
  const cart = useAtomValue(cartStoreAtom);
  const price = cart.reduce((acc, item) => acc + parseFloat(item.price as string), 0);
  const fee = price > 0 ? serviceFee : 0;
  const total = price + fee - (price * discount) / 100;

  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    if (index === 1) {
      setSelectedMethodIndex(selectedMethodIndex === index ? null : index);
    }
  };

  return (
    <div className="rounded-lg border-2 border-[#21262f] bg-[#222934] p-4 text-white shadow-app-1 md:grow md:p-3 lg:p-4">
      <h3 className="mb-4 text-lg font-semibold">{t('Resumen')}</h3>
      <p className="mb-3 text-sm">
        {t('Subtotal')}: <span className="float-right">${price}</span>
      </p>
      <p className="mb-10 text-sm">
        {t('Tarifa')}: <span className="float-right">${fee}</span>
      </p>
      <div className="mt-4">
        <label htmlFor="coupon" className="mb-3 block text-sm">
          {t('Cupon')}
        </label>
        <div className="flex flex-col gap-2 lg:flex-row">
          <input
            type="text"
            id="coupon"
            className="w-full flex-1 rounded-lg bg-gray-700 p-2 text-white focus:outline-none"
            placeholder={t('Placeholder')}
          />
          <Button
            className="mt-1 w-full rounded-r-lg text-white hover:bg-primary-B-450 lg:mt-0 lg:w-auto"
            variant={'neutral'}>
            {t('BotonIngresar')}
          </Button>
        </div>
        {discount > 0 && (
          <p className="mt-5 text-sm">
            {t('Hotsale')}: <span className="float-right">{discount}%</span>
          </p>
        )}
        <p className="mt-4 text-lg font-semibold">
          {t('Total')}: <span className="float-right">${total.toFixed(2)}</span>
        </p>
      </div>

      <div className="mb-3 mt-6">
        <p className="mb-5 text-sm">{t('MetodoPago')}:</p>
        <div className="flex gap-4">
          {paymentMethods.map((method, index) => (
            <Image
              key={index}
              src={method}
              alt={method}
              className={`w-18 h-12 cursor-pointer rounded-lg bg-pink-100 object-contain py-1 hover:scale-105 ${
                selectedMethodIndex === index ? 'ring-2 ring-pink-500' : ''
              }`}
              width={300}
              height={14}
              onClick={() => handleImageClick(index)} // Alterna el método de pago seleccionado
            />
          ))}
        </div>
        <p className="mr-2 mt-5 text-center text-base font-medium text-secondary-A-500">
          {t('Condiciones')}
        </p>
        <div className="h-15 ml-20 mt-4 flex w-20 items-center">
          {/* Renderiza Paid solo si se selecciona el índice 1 (imagen del medio) */}
          {selectedMethodIndex === 1 && <Paid />}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
