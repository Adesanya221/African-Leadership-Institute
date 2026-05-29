'use client';

import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={open ? 'nav-open' : ''}>
      <div className="logo-area">
        <img
          src="/afli-logo.gif"
          alt="African Leadership Institute"
          style={{ height: 38, width: 'auto' }}
        />
        <div
          style={{
            width: 1,
            height: 28,
            background: 'rgba(155,29,110,0.2)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#5C3A50',
            letterSpacing: '.02em',
            lineHeight: 1.3,
          }}
        >
          Tutu Fellows<br />20th Year Reunion
        </span>
      </div>
      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          fontSize: 24,
          color: '#9B1D6E',
        }}
      >
        {open ? '✕' : '☰'}
      </button>
      <div className="nav-links">
        <a href="#programme" className="nav-btn" onClick={() => setOpen(false)}>Programme</a>
        <a href="#costs" className="nav-btn" onClick={() => setOpen(false)}>Costs</a>
        <a href="#accommodation" className="nav-btn" onClick={() => setOpen(false)}>Accommodation</a>
        <a href="#faqs" className="nav-btn" onClick={() => setOpen(false)}>FAQs</a>
        <a href="#register" className="nav-btn primary" onClick={() => setOpen(false)}>Secure Your Place →</a>
      </div>
    </nav>
  );
}
