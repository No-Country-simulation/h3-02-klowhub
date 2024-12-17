'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
export const Paid = () => {
  const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID!;
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
        />
      </PayPalScriptProvider>
    </div>
  );
};
