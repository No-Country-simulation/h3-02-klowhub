'use client';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function PaypalMetod() {
  const clientId: string = process.env.NEXT_PUBLIC_CLIENT_ID!;
  return (
    <div className="flex items-center justify-center">
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          currency: 'USD',
          components: 'buttons',
        }}>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'silver' }}
          createOrder={async (data, actions) => {
            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const order = (await res.json()) as { id: string };
            console.log(order);
            return order.id;
          }}
          onCancel={data => {
            console.log('Cancelled:', data);
          }}
          onApprove={async (data, actions) => {
            console.log('Approved:', data);
            if (actions.order) {
              try {
                const orderCaptureResponse = await actions.order.capture();
                console.log('Order captured successfully', orderCaptureResponse);
              } catch (error) {
                console.error('Error capturing order', error);
              }
            } else {
              console.error('Order is undefined');
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalMetod;
