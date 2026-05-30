'use client';

import { useState } from 'react';
import { useBooking, AccommodationOption } from '@/context/BookingContext';
import AutoScroll from './AutoScroll';

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
  const ext = folderExtMap[folder] ?? 'jpg';
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
      {/* Close button */}
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

      {/* Main image */}
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

        {/* Arrows */}
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

      {/* Thumbnail strip */}
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

      {/* Counter */}
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8 }}>
        {current + 1} / {images.length}
      </p>
    </div>
  );
}

export default function Accommodation() {
  const { setSelectedAccommodation } = useBooking();
  const [gallery, setGallery] = useState<{ images: string[]; open: boolean }>({
    images: [],
    open: false,
  });

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
      images: getRoomImages('victoria-falls-estates', 29),
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
      images: getRoomImages('zambezi-boutique', 7),
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
      images: getRoomImages('victoria-falls-safari', 22),
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
      name: 'Vic Falls Hotel – Livingstone Room',
      type: '5-Star Partner Property',
      images: getRoomImages('vic-falls-hotel', 7),
      desc: 'Premium lodging at the iconic Victoria Falls Hotel. AFLI preferential rates are available. Elegant heritage accommodation with stunning garden views.',
      price: 'Varies',
      priceSuffix: ' + AFLI rate',
      features: ['Heritage property', 'AFLI group rate available', 'Garden & lawn views'],
      highlight: false,
      typeColor: '#5C3A50',
      btnStyle: 'btn-outline',
      btnText: 'Enquire',
      selectValue: '5-Star Partner Hotels (Enquire)' as AccommodationOption,
    },
  ];

  const renderCard = (prop: typeof properties[0], isMobile: boolean) => (
    <div
      key={prop.name}
      className="accom-card"
      style={prop.highlight ? { border: '1.5px solid #9B1D6E' } : undefined}
    >
      {/* Image with gallery trigger */}
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
        style={{ width: '100%', justifyContent: 'center', fontSize: isMobile ? 12 : 13 }}
        onClick={() => handleSelect(prop.selectValue)}
      >
        {prop.btnText}
      </button>
    </div>
  );

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
          {properties.map((prop) => renderCard(prop, false))}
        </div>

        {/* Mobile carousel */}
        <AutoScroll className="carousel-scroll" speed={0.6}>
          {properties.map((prop) => renderCard(prop, true))}
        </AutoScroll>
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

      {/* Lightbox gallery */}
      <RoomGallery
        images={gallery.images}
        isOpen={gallery.open}
        onClose={() => setGallery({ images: [], open: false })}
      />
    </section>
  );
}
