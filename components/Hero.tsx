export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background:
          "linear-gradient(135deg, rgba(45,10,30,0.88) 0%, rgba(155,29,110,0.78) 100%), url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat",
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(155,29,110,0.15) 0%, transparent 60%)',
        }}
      />
      <div className="hero-content">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#C1357A',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            style={{
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '.15em',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 600,
            }}
          >
            Victoria Falls, Zimbabwe • 25–29 November 2026
          </span>
        </div>
        <h1>
          Tutu Fellows
          <br />
          20th Year Reunion
          <br />
          <span style={{ color: '#C1357A', fontStyle: 'italic' }}>
            &amp; Strategy Retreat
          </span>
        </h1>
        <p
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.8,
            marginBottom: 36,
            maxWidth: 600,
          }}
        >
          A landmark strategy retreat, the formal launch of the Tutu Fellows
          Alumni Organisation, and five extraordinary days at one of Africa's
          most spectacular natural wonders.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 14,
            marginBottom: 36,
            flexWrap: 'wrap',
          }}
        >
          <span className="badge-brand">👥 100+ Fellows Expected</span>
          <span className="badge-brand">🌍 40+ Countries</span>
          <span className="badge-brand">🏨 4 Nights · 5 Days</span>
          <span className="badge-brand">🎉 20-Year Milestone</span>
        </div>
        <div className="hero-buttons">
          <a href="#register" className="btn btn-primary">
            Secure Your Place
          </a>
          <a
            href="#programme"
            className="btn btn-outline"
            style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
          >
            View Programme
          </a>
        </div>
      </div>
    </section>
  );
}
