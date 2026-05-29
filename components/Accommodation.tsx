'use client';

import { useBooking, AccommodationOption } from '@/context/BookingContext';

export default function Accommodation() {
  const { setSelectedAccommodation } = useBooking();

  const handleSelect = (selectValue: AccommodationOption) => {
    setSelectedAccommodation(selectValue);
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const properties = [
    {
      name: 'Victoria Falls Estates',
      type: 'Self-Catering Apartments',
      img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop',
      desc: 'Spacious self-catering apartments with 2-bed and 3-bed configurations, ideal for Fellows who prefer to share. Flexible and independent.',
      price: '~US$100',
      priceSuffix: '/person/night (TBC)',
      features: ['60 units held for AFLI group', '2-bed and 3-bed options', 'Available until filled'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Select This Option',
      selectValue: 'Victoria Falls Estates (Self-Catering Apartments)' as AccommodationOption,
    },
    {
      name: 'Zambezi Boutique Lodge',
      type: 'Boutique Guest Lodge',
      img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&auto=format&fit=crop',
      desc: "AFLI's operational base for the retreat. Intimate and social, with breakfast and teas included. The informal gathering point for the programme team and Fellows.",
      price: '~US$100',
      priceSuffix: '/person/night (TBC)',
      features: ['22 rooms only (limited availability)', 'Breakfast & teas included', 'Available until filled'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Select This Option',
      selectValue: 'Zambezi Boutique Lodge' as AccommodationOption,
    },
    {
      name: 'Vic Falls Safari Lodge',
      type: 'Main Conference Venue',
      img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400&auto=format&fit=crop',
      desc: 'The primary conference venue for all retreat sessions. Staying here puts you at the heart of the programme, with no transfers needed between accommodation and sessions.',
      price: 'TBC',
      priceSuffix: ' (AFLI rate)',
      features: ['45+ rooms available', 'All sessions on-site', 'Boma & gala dinner venue'],
      highlight: true,
      typeColor: '#9B1D6E',
      btnStyle: 'btn-primary',
      btnText: 'Select This Option',
      selectValue: 'Victoria Falls Safari Lodge (Conference Venue)' as AccommodationOption,
    },
    {
      name: '5-Star Partner Hotels',
      type: 'Partner Properties',
      img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&auto=format&fit=crop',
      desc: 'For Fellows who wish to arrange their own premium lodging at nearby five-star properties. AFLI preferential rates are available. Contact us to enquire about options.',
      price: 'Varies',
      priceSuffix: ' + AFLI rate',
      features: ['Subject to availability', 'AFLI group rate available', 'Enquire for details'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Enquire',
      selectValue: '5-Star Partner Hotels (Enquire)' as AccommodationOption,
    },
  ];

  return (
    <section id="accommodation" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
            Where You Will Stay
          </span>
          <h2>Accommodation Options</h2>
          <p className="sub" style={{ maxWidth: 640, margin: '0 auto' }}>
            All properties are within easy reach of the main conference venue. Select the option that
            suits your preference. All rates have been negotiated by AFLI at group rates.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="grid-4">
          {properties.map((prop) => (
            <div
              key={prop.name}
              className="accom-card"
              style={prop.highlight ? { border: '1.5px solid #9B1D6E' } : undefined}
            >
              <div style={{ height: 160, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                <img
                  src={prop.img}
                  alt={prop.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: prop.typeColor,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginBottom: 4,
                  }}
                >
                  {prop.type}
                </p>
                <h3 style={{ fontSize: 16 }}>{prop.name}</h3>
              </div>
              <p style={{ fontSize: 13, color: '#5C3A50', marginBottom: 14, lineHeight: 1.65 }}>
                {prop.desc}
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: '#9B1D6E', marginBottom: 4 }}>
                {prop.price}
                <span style={{ fontSize: 13, fontWeight: 500, color: '#5C3A50' }}>
                  {prop.priceSuffix}
                </span>
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '12px 0 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                }}
              >
                {prop.features.map((f) => (
                  <li key={f} style={{ fontSize: 12, color: '#5C3A50' }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${prop.btnStyle}`}
                style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
                onClick={() => handleSelect(prop.selectValue)}
              >
                {prop.btnText}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="carousel-scroll">
          {properties.map((prop) => (
            <div
              key={prop.name}
              className="accom-card"
              style={prop.highlight ? { border: '1.5px solid #9B1D6E' } : undefined}
            >
              <div style={{ height: 140, borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
                <img
                  src={prop.img}
                  alt={prop.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: prop.typeColor,
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    marginBottom: 4,
                  }}
                >
                  {prop.type}
                </p>
                <h3 style={{ fontSize: 15 }}>{prop.name}</h3>
              </div>
              <p style={{ fontSize: 12, color: '#5C3A50', marginBottom: 12, lineHeight: 1.6 }}>
                {prop.desc}
              </p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#9B1D6E', marginBottom: 4 }}>
                {prop.price}
                <span style={{ fontSize: 12, fontWeight: 500, color: '#5C3A50' }}>
                  {prop.priceSuffix}
                </span>
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '10px 0 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {prop.features.map((f) => (
                  <li key={f} style={{ fontSize: 11, color: '#5C3A50' }}>
                    ✓ {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${prop.btnStyle}`}
                style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
                onClick={() => handleSelect(prop.selectValue)}
              >
                {prop.btnText}
              </button>
            </div>
          ))}
        </div>
        <p className="scroll-hint">← Swipe to explore →</p>

        <div
          style={{
            marginTop: 28,
            padding: '18px 24px',
            background: '#F9EEF5',
            borderRadius: 12,
            border: '0.5px solid rgba(155,29,110,0.2)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 14, color: '#4A0A33', lineHeight: 1.7 }}>
            <strong>Note:</strong> Accommodation at the Estates and Boutique Lodge is available on a
            first-come, first-served basis. Secure your preferred option early during registration.
          </p>
        </div>
      </div>
    </section>
  );
}
