import { NextResponse } from 'next/server';
interface ApiResponse {
  access_token: string;
}
interface OrderData {
  id: string;
}

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const paypalApiUrl = 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${paypalApiUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = (await response.json()) as ApiResponse;

  return data.access_token;
}

export async function POST() {
  try {
    const accessToken = await getAccessToken();

    const orderResponse = await fetch(`${paypalApiUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '100.00',
            },
          },
        ],
      }),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.json();
      return NextResponse.json({ error }, { status: orderResponse.status });
    }

    const orderData = (await orderResponse.json()) as OrderData;

    return NextResponse.json({
      id: orderData.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating PayPal order:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
  }
}
