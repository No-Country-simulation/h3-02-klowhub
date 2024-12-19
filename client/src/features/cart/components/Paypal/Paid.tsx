'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
export const Paid = () => {
  const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const price = '19.99'; // En formato string con dos decimales
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
