import AutoScroll from './AutoScroll';

export default function Costs() {
  return (
    <section id="costs" style={{ background: '#F7F5F6' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: '#9B1D6E',
              fontWeight: 600,
            }}
          >
            Investment
          </span>
          <h2>What You Will Pay</h2>
          <p className="sub" style={{ maxWidth: 600, margin: '0 auto' }}>
            Your total cost comprises two components: a flat Alumni Organization Contribution, and
            your chosen accommodation. Payment is structured across three tranches.
          </p>
        </div>

        {/* Two cost components — desktop */}
        <div className="grid-2 costs-desktop-2" style={{ marginBottom: 48 }}>
          <div className="card" style={{ borderTop: '4px solid #9B1D6E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F9EEF5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                📋
              </div>
              <div>
                
                <h3 style={{ margin: '4px 0 0' }}>Alumni Organization Contribution</h3>
              </div>
            </div>
            <p className="price-big" style={{ color: '#9B1D6E' }}>
              US$150
            </p>
            <p style={{ fontSize: 13, color: '#5C3A50', lineHeight: 1.7, marginBottom: 16 }}>
              Covers alumni organisation setup cost, programmatic expenses and other associated reunion costs. You may also feel free to contribute
              generously.
            </p>
            {/* <div style={{ background: '#F9EEF5', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: '#4A0A33', fontWeight: 600 }}>
                Same for all Fellows. No variation.
              </p>
            </div> */}
          </div>

          <div className="card" style={{ borderTop: '4px solid #8C6880' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F5F0F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                🏨
              </div>
              <div>
                
                <h3 style={{ margin: '4px 0 0' }}>Accommodation</h3>
              </div>
            </div>
            
            <p style={{ fontSize: 13, color: '#5C3A50', lineHeight: 1.7, marginBottom: 16 }}>
              Your accommodation cost depends on which property and room type you select. All rates
              have been negotiated by AFLI. See the Accommodation section below for full pricing per
              option.
            </p>
            
          </div>
        </div>

        {/* Two cost components — mobile auto-scroll carousel */}
        <AutoScroll className="auto-scroll costs-scroll-2 costs-mobile-2" speed={0.8}>
          <div className="card" style={{ borderTop: '4px solid #9B1D6E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F9EEF5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                📋
              </div>
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#9B1D6E',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                  }}
                >
                  Fixed Cost
                </span>
                <h3 style={{ margin: '4px 0 0' }}>Alumni Organization Contribution</h3>
              </div>
            </div>
            <p className="price-big" style={{ color: '#9B1D6E' }}>
              US$150
            </p>
            <p style={{ fontSize: 13, color: '#5C3A50', lineHeight: 1.7, marginBottom: 16 }}>
              Covers administration and other associated costs. You may also feel free to contribute
              generously.
            </p>
            <div style={{ background: '#F9EEF5', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: '#4A0A33', fontWeight: 600 }}>
                Same for all Fellows. No variation.
              </p>
            </div>
          </div>

          <div className="card" style={{ borderTop: '4px solid #8C6880' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: '#F5F0F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                🏨
              </div>
              <div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#5C3A50',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                  }}
                >
                  Variable Cost
                </span>
                <h3 style={{ margin: '4px 0 0' }}>Accommodation</h3>
              </div>
            </div>
            <p className="price-big" style={{ color: '#5C3A50' }}>
              Varies
            </p>
            <p style={{ fontSize: 13, color: '#5C3A50', lineHeight: 1.7, marginBottom: 16 }}>
              Your accommodation cost depends on which property and room type you select. All rates
              have been negotiated by AFLI. See the Accommodation section below for full pricing per
              option.
            </p>
            <div style={{ background: '#EBE0E7', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontSize: 12, color: '#3A2430', fontWeight: 600 }}>
                Confirmed upon your accommodation selection.
              </p>
            </div>
          </div>
        </AutoScroll>

        {/* Payment tranches */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: '#9B1D6E',
              fontWeight: 600,
            }}
          >
            Payment Schedule
          </span>
          <h3
            className="section-lead"
            style={{ margin: '10px 0 6px' }}
          >
            Three Payment Tranches
          </h3>
          <p style={{ fontSize: 14, color: '#5C3A50' }}>
            To make payments flexible and easy to manage, your total is split across three tranches leading up to the retreat.
          </p>
        </div>

        {/* Payment tranches — desktop */}
        <div style={{ position: 'relative' }} className="costs-desktop-3">
          <div className="costs-connector" />
          <div className="grid-3" style={{ position: 'relative', zIndex: 1 }}>
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #9B1D6E' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#9B1D6E',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  margin: '0 auto 20px',
                  boxShadow: '0 0 0 6px #fff',
                }}
              >
                1
              </div>
              <h3>Deposit</h3>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#9B1D6E', margin: '12px 0' }}>
                US$150
              </p>
              <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
                Secures your place and confirms your registration. Payable at the time of sign-up.
              </p>
              <span
                style={{
                  fontSize: 12,
                  background: '#F9EEF5',
                  color: '#9B1D6E',
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                Due 30 June 2026
              </span>
            </div>

            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #8C6880' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#EBE0E7',
                  color: '#5C3A50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  margin: '0 auto 20px',
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 3px #EBE0E7',
                }}
              >
                2
              </div>
              <h3>First Tranche</h3>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#5C3A50', margin: '12px 0' }}>
                50%
              </p>
              <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
                50% of your hotel cost, this will be calculated based on your room selection.
              </p>
              <span
                style={{
                  fontSize: 12,
                  background: '#EBE0E7',
                  color: '#5C3A50',
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                Due 31 July 2026
              </span>
            </div>

            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #8C6880' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#EBE0E7',
                  color: '#5C3A50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  margin: '0 auto 20px',
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 3px #EBE0E7',
                }}
              >
                3
              </div>
              <h3>Final Tranche</h3>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#5C3A50', margin: '12px 0' }}>
                50%
              </p>
              <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
                Remaining 50% of balance, clears your account before logistics are finalised.
              </p>
              <span
                style={{
                  fontSize: 12,
                  background: '#EBE0E7',
                  color: '#5C3A50',
                  padding: '6px 14px',
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                Due 30 September 2026
              </span>
            </div>
          </div>
        </div>

        {/* Payment tranches — mobile auto-scroll carousel */}
        <AutoScroll className="auto-scroll costs-scroll-3 costs-mobile-3" speed={0.8}>
          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #9B1D6E' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#9B1D6E',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
                margin: '0 auto 20px',
                boxShadow: '0 0 0 6px #fff',
              }}
            >
              1
            </div>
            <h3>Deposit</h3>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#9B1D6E', margin: '12px 0' }}>
              US$50
            </p>
            <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
              Secures your place and confirms your registration. Payable at the time of sign-up.
            </p>
            <span
              style={{
                fontSize: 12,
                background: '#F9EEF5',
                color: '#9B1D6E',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              Due 30 June 2026
            </span>
          </div>

          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #8C6880' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#EBE0E7',
                color: '#5C3A50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
                margin: '0 auto 20px',
                border: '3px solid #fff',
                boxShadow: '0 0 0 3px #EBE0E7',
              }}
            >
              2
            </div>
            <h3>First Tranche</h3>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#5C3A50', margin: '12px 0' }}>
              50%
            </p>
            <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
              50% of your remaining balance (Alumni Organization Contribution + accommodation),
              funds supplier commitments.
            </p>
            <span
              style={{
                fontSize: 12,
                background: '#EBE0E7',
                color: '#5C3A50',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              Due 31 July 2026
            </span>
          </div>

          <div className="card" style={{ textAlign: 'center', borderTop: '4px solid #8C6880' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#EBE0E7',
                color: '#5C3A50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 700,
                margin: '0 auto 20px',
                border: '3px solid #fff',
                boxShadow: '0 0 0 3px #EBE0E7',
              }}
            >
              3
            </div>
            <h3>Final Tranche</h3>
            <p style={{ fontSize: 32, fontWeight: 700, color: '#5C3A50', margin: '12px 0' }}>
              50%
            </p>
            <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 12 }}>
              Remaining 50% of balance, clears your account before logistics are finalised.
            </p>
            <span
              style={{
                fontSize: 12,
                background: '#EBE0E7',
                color: '#5C3A50',
                padding: '6px 14px',
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              Due 30 September 2026
            </span>
          </div>
        </AutoScroll>
      </div>
    </section>
  );
}
