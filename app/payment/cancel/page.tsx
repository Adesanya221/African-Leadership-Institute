export default function PaymentCancelPage() {
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
            background: '#FFF5F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            margin: '0 auto 24px',
          }}
        >
          ✕
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
          Payment Cancelled
        </h1>
        <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.7, marginBottom: 24 }}>
          Your payment was not completed. No charge has been made. You can return to the registration
          form to try again.
        </p>
        <a
          href="/#register"
          className="btn btn-primary"
          style={{ display: 'inline-flex' }}
        >
          Return to Registration
        </a>
      </div>
    </section>
  );
}
