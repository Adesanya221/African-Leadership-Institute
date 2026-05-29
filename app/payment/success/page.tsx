export default function PaymentSuccessPage() {
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
          ✓
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
          Payment Successful!
        </h1>
        <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.7, marginBottom: 24 }}>
          Your US$50 deposit has been received. Your place at the Tutu Fellows 20th Year Reunion is
          now secured. A confirmation email will be sent to you shortly.
        </p>
        <a
          href="/"
          className="btn btn-primary"
          style={{ display: 'inline-flex' }}
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}
