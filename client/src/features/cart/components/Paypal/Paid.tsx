'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useAtomValue } from 'jotai';
import { cartStoreAtom } from '@features/cart/store/cart.store';
import env from '@root/env.config';
export const Paid = () => {
  const clientId: string = env.NEXT_PUBLIC_CLIENT_ID;
  const cart = useAtomValue(cartStoreAtom);
  const total = cart.reduce((acc, item) => acc + parseFloat(item.price as string), 0) + 130;
  const price = total.toString();
  // const price = prise; // En formato string con dos decimales
  const currency = 'USD'; // Código de moneda, e.g., USD, EUR, etc.
  return (
    <div className="flex items-center justify-center">
      <PayPalScriptProvider
        options={{
          clientId: clientId,
        }}>
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'blue',
            label: 'paypal',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE', // Captura inmediata del pago
              purchase_units: [
                {
                  amount: {
                    currency_code: currency, // Código de moneda requerido
                    value: price, // Precio estático
                  },
                },
              ],
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};
