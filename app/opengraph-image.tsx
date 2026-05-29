import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tutu Fellows 20th Year Reunion – Victoria Falls 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2D0A1E 0%, #9B1D6E 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: '3px solid rgba(250,232,243,0.4)',
              background: 'rgba(155,29,110,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#FAE8F3',
            }}
          >
            🎓
          </div>
          <span
            style={{
              fontSize: '22px',
              color: 'rgba(250,232,243,0.7)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            African Leadership Institute
          </span>
        </div>
        <div
          style={{
            fontSize: '56px',
            fontFamily: 'Georgia, serif',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Tutu Fellows 20th Year Reunion
        </div>
        <div
          style={{
            fontSize: '24px',
            color: 'rgba(250,232,243,0.8)',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          25–29 November 2026 • Victoria Falls, Zimbabwe
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: 'rgba(250,232,243,0.15)',
              border: '1px solid rgba(250,232,243,0.25)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'rgba(250,232,243,0.9)',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Strategy Retreat
          </div>
          <div
            style={{
              background: 'rgba(250,232,243,0.15)',
              border: '1px solid rgba(250,232,243,0.25)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'rgba(250,232,243,0.9)',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Alumni Launch
          </div>
          <div
            style={{
              background: 'rgba(250,232,243,0.15)',
              border: '1px solid rgba(250,232,243,0.25)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'rgba(250,232,243,0.9)',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            20 Cohorts United
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
