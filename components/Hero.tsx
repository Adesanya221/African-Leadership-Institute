export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/gallery/heroo.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(45,10,30,0.88) 0%, rgba(155,29,110,0.78) 100%)',
          zIndex: 1,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(155,29,110,0.15) 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
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
        <p className="hero-desc" style={{ maxWidth: 600 }}>
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