'use client';

import { useState, useRef, useEffect } from 'react';
import { useBooking, AccommodationOption } from '@/context/BookingContext';

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

const folderPrefixMap: Record<string, string> = {
  'victoria-falls-estates': 'estates',
  'zambezi-boutique': 'zambezi',
  'victoria-falls-safari': 'safari',
  'vic-falls-hotel': 'hotel',
};

const folderExtMap: Record<string, string> = {
  'victoria-falls-estates': 'jpg',
  'zambezi-boutique': 'jpg',
  'victoria-falls-safari': 'png',
  'vic-falls-hotel': 'jpg',
};

function getRoomImages(folder: string, count: number) {
  const prefix = folderPrefixMap[folder] ?? folder;
  const ext = folderExtMap[folder] ?? 'jpeg';
  return range(count).map((i) => `/rooms/${folder}/${prefix}-${i}.${ext}`);
}

interface RoomGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

function RoomGallery({ images, isOpen, onClose }: RoomGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: '#fff',
          fontSize: 28,
          width: 44,
          height: 44,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        &times;
      </button>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 900,
          height: '60vh',
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current]}
          alt={`Photo ${current + 1} of ${images.length}`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: 8,
          }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                fontSize: 24,
                width: 44,
                height: 44,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              &#8249;
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                fontSize: 24,
                width: 44,
                height: 44,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 16,
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '4px 8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              flexShrink: 0,
              width: 64,
              height: 48,
              borderRadius: 6,
              overflow: 'hidden',
              border: idx === current ? '2px solid #9B1D6E' : '2px solid transparent',
              padding: 0,
              cursor: 'pointer',
              background: '#333',
              opacity: idx === current ? 1 : 0.6,
            }}
          >
            <img
              src={img}
              alt={`Thumb ${idx + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8 }}>
        {current + 1} / {images.length}
      </p>
    </div>
  );
}

interface RoomTier {
  label: string;
  price: string;
}

interface Property {
  name: string;
  type: string;
  images: string[];
  desc: string;
  price: string;
  priceSuffix: string;
  roomTiers?: RoomTier[];
  features: string[];
  highlight: boolean;
  typeColor: string;
  btnStyle: string;
  btnText: string;
  selectValue: AccommodationOption;
}

export default function Accommodation() {
  const { setSelectedAccommodation } = useBooking();
  const [gallery, setGallery] = useState<{ images: string[]; open: boolean }>({
    images: [],
    open: false,
  });
  const [activeCard, setActiveCard] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [estatesImages, setEstatesImages] = useState<string[]>([
    '/rooms/victoria-falls-estates/Vic Falls Estate _A748577-HDR.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A748788.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A748791.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A748886-HDR.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A749834-HDR.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A749864-HDR.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A749907.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A749908.jpeg',
    '/rooms/victoria-falls-estates/Vic Falls Estate _A749924.jpeg',
  ]);

  useEffect(() => {
    fetch('/api/room-images?folder=victoria-falls-estates')
      .then((r) => r.json())
      .then((data) => { if (data.images?.length) setEstatesImages(data.images); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const handleScroll = () => {
      setHasScrolled(true);
      const cardWidth = grid.scrollWidth / 3;
      setActiveCard(Math.round(grid.scrollLeft / cardWidth));
    };
    grid.addEventListener('scroll', handleScroll, { passive: true });
    return () => grid.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (selectValue: AccommodationOption) => {
    setSelectedAccommodation(selectValue);
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const properties: Property[] = [
    {
      name: 'Victoria Falls Estates',
      type: 'Self-Catering Apartments',
      images: estatesImages,
      desc: 'Spacious self-catering apartments with 2-bed and 3-bed configurations, ideal for Fellows who prefer to share. Flexible and independent.',
      price: 'US$100',
      priceSuffix: '/person/night',
      features: ['60 rooms held', 'Available until filled', 'Breakfast and tea included'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Select This Option',
      selectValue: 'Victoria Falls Estates (Self-Catering Apartments)' as AccommodationOption,
    },
    {
      name: 'Zambezi Boutique Lodge',
      type: 'Boutique Guest Lodge',
      images: getRoomImages('zambezi-boutique', 5),
      desc: 'Intimate and social, with breakfast and teas included. Ideal for fellows who prefer to be located at the informal gathering point for the programme.',
      price: 'US$100',
      priceSuffix: '/person/night',
      features: ['15 rooms available', 'Breakfast & teas included'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Select This Option',
      selectValue: 'Zambezi Boutique Lodge' as AccommodationOption,
    },
    {
      name: 'Vic Falls Safari Lodge',
      type: 'Main Conference Venue',
      images: getRoomImages('victoria-falls-safari', 8),
      desc: 'The primary conference venue for all retreat sessions. Staying here puts you at the heart of the programme, with no transfers needed between accommodation and sessions.',
      price: 'from US$215',
      priceSuffix: '/room/night',
      roomTiers: [
        { label: 'Standard Room (x34)', price: 'US$215' },
        { label: 'Standard Room B (x4)', price: 'US$278' },
        { label: '2-Bed Safari Suite (x3)', price: 'US$536/suite' },
        { label: '3-Bed Safari Suite (x2)', price: 'US$715/suite' },
      ],
      features: ['45 rooms held', 'All sessions on-site including Boma & gala dinner venue', 'Breakfast & teas included'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Select This Option',
      selectValue: 'Victoria Falls Safari Lodge (Conference Venue)' as AccommodationOption,
    },
  ];

  const renderCard = (prop: Property, isMobile: boolean) => (
    <div
      key={prop.name}
      className="accom-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...(prop.highlight ? { border: '1.5px solid #9B1D6E' } : undefined),
      }}
    >
      <div
        style={{
          height: isMobile ? 140 : 160,
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: isMobile ? 14 : 16,
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => setGallery({ images: prop.images, open: true })}
      >
        <img
          src={prop.images[0]}
          alt={prop.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span>📷</span>
          <span>{prop.images.length} photos</span>
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? 10 : 12 }}>
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
        <h3 style={{ fontSize: isMobile ? 15 : 16 }}>{prop.name}</h3>
      </div>

      <p
        style={{
          fontSize: isMobile ? 12 : 13,
          color: '#5C3A50',
          marginBottom: isMobile ? 12 : 14,
          lineHeight: isMobile ? 1.6 : 1.65,
        }}
      >
        {prop.desc}
      </p>

      <p style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: '#9B1D6E', marginBottom: 4 }}>
        {prop.price}
        <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 500, color: '#5C3A50' }}>
          {prop.priceSuffix}
        </span>
      </p>

      {prop.roomTiers && (
        <div style={{ marginBottom: isMobile ? 10 : 12 }}>
          {prop.roomTiers.map((tier) => (
            <div
              key={tier.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: isMobile ? 11 : 12,
                color: '#5C3A50',
                padding: '4px 0',
                borderBottom: '0.5px solid rgba(92,58,80,0.15)',
              }}
            >
              <span>{tier.label}</span>
              <span style={{ fontWeight: 600 }}>{tier.price}</span>
            </div>
          ))}
        </div>
      )}

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: isMobile ? '10px 0 14px' : '12px 0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 4 : 5,
        }}
      >
        {prop.features.map((f) => (
          <li key={f} style={{ fontSize: isMobile ? 11 : 12, color: '#5C3A50' }}>
            ✓ {f}
          </li>
        ))}
      </ul>

      <button
        className={`btn ${prop.btnStyle}`}
        style={{ width: '100%', justifyContent: 'center', fontSize: isMobile ? 12 : 13, marginTop: 'auto' }}
        onClick={() => handleSelect(prop.selectValue)}
      >
        {prop.btnText}
      </button>
    </div>
  );

  return (
    <section id="accommodation" style={{ background: '#fff', overflow: 'visible' }}>
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

        <div className={`accom-scroll-wrap${hasScrolled ? ' scrolled' : ''}`}>
          <div className="accom-grid" ref={gridRef}>
            {properties.map((prop) => renderCard(prop, false))}
          </div>
        </div>

        {/* Scroll hint — mobile only, fades out after first scroll */}
        <div className={`accom-scroll-hint${hasScrolled ? ' accom-scroll-hint--hidden' : ''}`}>
          <span className="accom-scroll-hint__arrow">&#8592;</span>
          <span>Swipe to explore all options</span>
          <span className="accom-scroll-hint__arrow">&#8594;</span>
        </div>
        <div className="accom-scroll-dots">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`accom-scroll-dot${activeCard === i ? ' accom-scroll-dot--active' : ''}`}
            />
          ))}
        </div>

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

      <RoomGallery
        images={gallery.images}
        isOpen={gallery.open}
        onClose={() => setGallery({ images: [], open: false })}
      />
    </section>
  );
}