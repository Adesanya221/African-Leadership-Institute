'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PaymentSuccessInner() {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get('reference_id');
  const [updating, setUpdating] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function markPaid() {
      if (!referenceId) {
        setUpdating(false);
        return;
      }
      try {
        const res = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference_id: referenceId }),
        });

        if (!res.ok) {
          const data = await res.json();
          console.error('Confirm payment error:', data.error);
          setError('We could not automatically confirm your payment. Please contact us.');
        }
      } catch (e) {
        console.error(e);
        setError('Something went wrong confirming your payment.');
      } finally {
        setUpdating(false);
      }
    }

    markPaid();
  }, [referenceId]);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F5F6',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          textAlign: 'center',
          background: '#fff',
          borderRadius: 16,
          padding: '48px 36px',
          border: '0.5px solid rgba(155,29,110,0.12)',
          boxShadow: '0 8px 32px rgba(155,29,110,0.08)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#F0FFF4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            margin: '0 auto 24px',
          }}
        >
          {updating ? '⏳' : '✓'}
        </div>
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 28,
            fontWeight: 400,
            color: '#1C0912',
            marginBottom: 12,
          }}
        >
          {updating ? 'Confirming Payment…' : 'Payment Successful!'}
        </h1>
        <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.7, marginBottom: 24 }}>
          {updating
            ? 'Please wait while we confirm your PayPal payment and secure your place.'
            : 'Your US$50 deposit has been received. Your place at the Tutu Fellows 20th Year Reunion is now secured. A confirmation email will be sent to you shortly.'}
        </p>

        {referenceId && (
          <div
            style={{
              background: '#F9EEF5',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 24,
              fontSize: 13,
              color: '#5C3A50',
            }}
          >
            <strong>Reference:</strong> {referenceId}
          </div>
        )}

        {error && (
          <div
            style={{
              background: '#FFF5F5',
              border: '1px solid #e53e3e',
              borderRadius: 10,
              padding: '12px 16px',
              marginBottom: 24,
              fontSize: 13,
              color: '#e53e3e',
            }}
          >
            {error}
          </div>
        )}

        {!updating && (
          <a
            href="/"
            className="btn btn-primary"
            style={{ display: 'inline-flex' }}
          >
            Back to Home
          </a>
        )}
      </div>
    </section>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F5F6' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: '#5C3A50' }}>Loading…</p>
        </div>
      </section>
    }>
      <PaymentSuccessInner />
    </Suspense>
  );
}
