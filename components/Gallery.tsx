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
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&auto=format&fit=crop"
              alt="Victoria Falls aerial view"
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
                Victoria Falls: Mosi-oa-Tunya
              </span>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, marginTop: 3 }}>
                One of the Seven Natural Wonders of the World
              </p>
            </div>
          </div>

          <div className="gallery-side">
            <div className="gallery-side-img">
              <img
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&auto=format&fit=crop"
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
                  Vic Falls Safari Lodge
                </span>
              </div>
            </div>
            <div className="gallery-side-img">
              <img
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop"
                alt="Luxury lodge room"
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
                  Lodge Accommodation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-column grid */}
        <div className="gallery-bottom">
          {[
            {
              src: 'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=400&auto=format&fit=crop',
              alt: 'Victoria Falls mist',
              label: 'The Falls at Sunrise',
            },
            {
              src: 'https://images.unsplash.com/photo-1609952542840-df54cfddc3dc?w=400&auto=format&fit=crop',
              alt: 'African wildlife',
              label: 'Wildlife & Safari',
            },
            {
              src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&auto=format&fit=crop',
              alt: 'Boutique lodge',
              label: 'Boutique Lodge',
            },
            {
              src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop',
              alt: 'Sundowner evening',
              label: 'Sundowner Evenings',
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
