'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';



export default function Home() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [upiLink, setUpiLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/generate-upi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount }),
    });
    const data = await res.json();
    setUpiLink(data.upiLink);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>UPI Deep Link Payment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} required type="number" />
        <button type="submit">Generate UPI Link</button>
      </form>

      {upiLink && (
        <div style={{ marginTop: '2rem' }}>
          <p className= "border w-full"><strong>Click to Pay:</strong></p>
          <a href={upiLink} style={{ color: 'blue' }}>{upiLink}</a>

          <p><strong>Or Scan QR:</strong></p>
          <QRCodeCanvas value={upiLink} size={200} />

        </div>
      )}
    </main>
  );
}
