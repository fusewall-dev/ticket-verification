export async function GET(req) {
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
  
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('Paystack secret key not found in environment variables');
    }
  
    const response = await fetch('https://api.paystack.co/transaction', {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
  
    const data = await response.json();
    //console.log(data.data);
    return new Response(JSON.stringify(data.data), {
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    
  }
  