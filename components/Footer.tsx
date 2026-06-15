export default function Footer() {
  return (
    <footer style={{ background: '#2D0A1E', padding: '60px 56px', color: 'rgba(250,232,243,0.85)' }}>
      <div className="footer-inner">
        <div>
          <div className="logo-area">
        <img
          src="/afli-logo.gif"
          alt="African Leadership Institute"
          style={{ height: 38, width: 'auto' }}
        />
        <div
          style={{
            width: 1,
            height: 40,
            background: 'rgba(155,29,110,0.2)',
            flexShrink: 0,
          }}
        />
        <img
          src="/AFLI 20TH Background removed.png?v=2"
          alt="Tutu Fellows 20th Year Reunion"
          style={{ height: 110, width: 'auto' }}
        />
      </div>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(250,232,243,0.5)',
              maxWidth: 320,
              lineHeight: 1.7,
            }}
          >
            Convening body for the Archbishop Tutu Leadership Fellowship. Marking 20 years of
            extraordinary African leadership.
          </p>
        </div>
        <div className="footer-right">
          <p style={{ fontSize: 13, color: 'rgba(250,232,243,0.6)', marginBottom: 6 }}>
            alinstitute.org
          </p>
          <p style={{ fontSize: 13, color: 'rgba(250,232,243,0.6)', marginBottom: 6 }}>
            programme@alinstitute.org
          </p>
          <div className="footer-badges">
            <span
              style={{
                background: 'rgba(155,29,110,0.25)',
                color: 'rgba(250,232,243,0.7)',
                fontSize: 11,
                padding: '5px 12px',
                borderRadius: 6,
              }}
            >
              25–29 Nov 2026
            </span>
            <span
              style={{
                background: 'rgba(155,29,110,0.15)',
                color: 'rgba(250,232,243,0.5)',
                fontSize: 11,
                padding: '5px 12px',
                borderRadius: 6,
              }}
            >
              Victoria Falls, Zimbabwe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
