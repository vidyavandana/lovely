import { DeeplinkBuilder } from '@vivekkushwaha66/upi-deeplink-builder';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, amount } = body;

    const upiId = 'vidyavandana1234@okhdfcbank'; 
    const ref = 'TXN' + Date.now();

    const builder = new DeeplinkBuilder(name, upiId)
      .addTransactionAmount(amount)
      .addTransactionNote("Booking Payment")
      .addTransactionReferenceId(ref);

    const upiLink = builder.build();

    return new Response(JSON.stringify({ upiLink }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid input or server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
