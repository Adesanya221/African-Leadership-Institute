export default function Gallery() {
  return (
    <section id="gallery" style={{ background: '#1C0912' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: '#C1357A',
              fontWeight: 600,
            }}
          >
            Victoria Falls, Zimbabwe
          </span>
          <h2
            style={{
              color: '#FAE8F3',
              fontFamily: 'Georgia, serif',
              fontSize: 36,
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            Experience the Destination
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(250,232,243,0.6)',
              maxWidth: 580,
              margin: '12px auto 0',
              lineHeight: 1.75,
            }}
          >
            Five extraordinary days at one of the world&apos;s great natural wonders,
            with world-class lodges and luxury right on the doorstep.
          </p>
        </div>

        {/* Main gallery grid */}
        <div className="gallery-main">
          <div className="gallery-main-img">
            <img
              src="/gallery/vic falls.jpg"
              alt="Victoria Falls"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 24px',
                background: 'linear-gradient(transparent,rgba(28,9,18,0.85))',
              }}
            >
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>
                Victoria Falls
              </span>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 3 }}>
                The fourth wonder of the world
              </p>
            </div>
          </div>

          <div className="gallery-side">
            <div className="gallery-side-img">
              <img
                src="/gallery/gallery-2.png"
                alt="Victoria Falls Safari Lodge"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '14px 18px',
                  background: 'linear-gradient(transparent,rgba(28,9,18,0.85))',
                }}
              >
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  Victoria Falls Safari Lodge
                </span>
              </div>
            </div>
            <div className="gallery-side-img">
              <img
                src="/gallery/gallery-3.jpg"
                alt="Zambezi Boutique Lodge"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '14px 18px',
                  background: 'linear-gradient(transparent,rgba(28,9,18,0.85))',
                }}
              >
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  Zambezi Boutique Lodge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-column grid */}
        <div className="gallery-bottom">
          {[
            {
              src: '/gallery/victoria-falls-hotel-facade.jpg.webp',
              alt: 'Victoria Falls Estates',
              label: 'Estate Living',
            },
            {
              src: '/gallery/outdoor-pool.jpg.webp',
              alt: 'Vic Falls Hotel Livingstone Room',
              label: 'Vic Falls Hotel',
            },
            {
              src: '/gallery/gallery-6.png',
              alt: 'Victoria Falls Safari Suite',
              label: 'Safari Suite',
            },
            {
              src: '/gallery/victoria-falls-safari-lodge-3.png',
              alt: 'Victoria Falls Estates',
              label: 'Luxury Accomodation',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="gallery-bottom-item"
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px 14px',
                  background: 'linear-gradient(transparent,rgba(28,9,18,0.85))',
                }}
              >
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="scroll-hint" style={{ color: 'rgba(250,232,243,0.5)' }}>← Swipe to explore →</p>
      </div>
    </section>
  );
}
