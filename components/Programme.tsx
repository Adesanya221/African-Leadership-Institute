import AnimateOnScroll from './AnimateOnScroll';

export default function Programme() {
  return (
    <section id="programme" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <AnimateOnScroll>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '.12em',
                color: '#9B1D6E',
                fontWeight: 600,
              }}
            >
              The Retreat Experience
            </span>
            <h2>What to Expect</h2>
            <p className="sub" style={{ maxWidth: 620, margin: '0 auto' }}>
              Five days of strategy, connection, and celebration. This is why you must be there.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Programme layout ── */}
        <div>

        {/* Feature rows: both animate in together */}
        <AnimateOnScroll>
          <div className="programme-row">
          <div>
            <span
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: '#9B1D6E',
                fontWeight: 700,
              }}
            >
              Plenary Sessions
            </span>
            <h3 className="section-lead">
              Shaping the next chapter of African leadership
            </h3>
            <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.8, marginBottom: 16 }}>
              Opening and closing plenary sessions will bring the full cohort together to reflect on
              20 years of the Tutu Fellowship, hear from leading voices, and collectively define the
              ambition for the Alumni Organisation going forward.
            </p>
            <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.8 }}>
              These are the sessions that set the tone and the direction.
            </p>
          </div>
          <div className="programme-row-img">
            <img
              src="/programme/Planetary_session.jpeg"
              alt="Black professionals in conference meeting"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

          <div className="programme-row">
          <div className="programme-row-img">
            <img
              src="/programme/Focus groups.jpeg"
              alt="Black woman leading a professional meeting"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: '#9B1D6E',
                fontWeight: 700,
              }}
            >
              Focus Group Working Sessions
            </span>
            <h3 className="section-lead">
              Real work. Real outcomes.
            </h3>
            <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.8, marginBottom: 16 }}>
              Structured working groups will tackle the key pillars of the Alumni Organisation:
              governance, programming, peer support, and advocacy. This is where decisions get made
              and the architecture of the organisation takes shape.
            </p>
            <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.8 }}>
              You will leave having contributed directly to something that endures.
            </p>
          </div>
        </div>
        </AnimateOnScroll>

        {/* 3-column highlights */}
        <AnimateOnScroll delay={1}>
          <div className="programme-highlights">
        <div className="programme-highlights-grid">
          <div className="card" style={{ borderTop: '4px solid #9B1D6E' }}>
            <div style={{ height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              <img
                src="/programme/Historical Milestone Alumni Organisation Launch.jpeg"
                alt="African woman leader"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#9B1D6E',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}
            >
              Historic Milestone
            </span>
            <h3 style={{ margin: '10px 0 8px' }}>Alumni Organisation Launch</h3>
            <p style={{ fontSize: 14, color: '#5C3A50', lineHeight: 1.7 }}>
              The formal establishment of the Tutu Fellows Alumni Organisation, a defining moment in
              the 20-year journey of the Fellowship. You will be part of history.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #C1357A' }}>
            <div style={{ height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              <img
                src="/programme/Tours and Excursions.jpeg"
                alt="African professional"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#C1357A',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}
            >
              Beyond the Boardroom
            </span>
            <h3 style={{ margin: '10px 0 8px' }}>Tours &amp; Excursions</h3>
            <p style={{ fontSize: 14, color: '#5C3A50', lineHeight: 1.7 }}>
              Guided tours of the Falls, optional adventure activities, and curated excursions that
              let the magic of the destination become part of the experience. Bring your camera.
            </p>
          </div>

          <div className="card" style={{ borderTop: '4px solid #8C6880' }}>
            <div style={{ height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              <img
                src="/programme/Boma Dinner.jpeg"
                alt="African friends celebrating together"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#5C3A50',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}
            >
              Celebration
            </span>
            <h3 style={{ margin: '10px 0 8px' }}>Gala Dinner &amp; Boma Evening</h3>
            <p style={{ fontSize: 14, color: '#5C3A50', lineHeight: 1.7 }}>
              A celebratory gala dinner and traditional boma evening to mark 20 extraordinary years,
              honouring the Fellows, the Fellowship, and the vision of Archbishop Tutu.
            </p>
          </div>
        </div>

        </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={2}>
          <div className="quote-box">
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 20,
              color: '#4A0A33',
              lineHeight: 1.7,
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            &ldquo;This is more than a reunion. It is a strategy session, a celebration, and a
            launchpad. It is the moment where 20 years of individual excellence becomes collective
            power.&rdquo;
          </p>
          <p
          style={{
            fontSize: 9,
            color: '#9B1D6E',
            fontWeight: 600,
            marginTop: 16,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
            textAlign: 'center',
          }}
        >
          Kunyalala Maphisa
          <br />
          CEO
          <br />
          African Leadership Institute
        </p>
        </div>
        </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
