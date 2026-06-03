'use client';

import { useState, useEffect, useRef } from 'react';
import { useBooking } from '@/context/BookingContext';

interface FormData {
  fullName: string;
  email: string;
  country: string;
  cohort: string;
  accommodation: string;
  phone: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  country?: string;
  cohort?: string;
  accommodation?: string;
  phone?: string;
}

export default function Register() {
  const { selectedAccommodation } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<'kkiapay' | 'payfast' | 'paypal'>('kkiapay');
  const [showBankingModal, setShowBankingModal] = useState(false);
  const referenceIdRef = useRef<string>('');
  const [xofAmount, setXofAmount] = useState<number | null>(null);
  const [xofRate, setXofRate] = useState<number | null>(null);
  const [xofCopied, setXofCopied] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    country: '',
    cohort: '',
    accommodation: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedAccommodation) {
      setForm((prev) => ({ ...prev, accommodation: selectedAccommodation }));
    }
  }, [selectedAccommodation]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        const rate = data?.rates?.XOF;
        if (rate) {
          setXofRate(rate);
          setXofAmount(Math.round(150 * rate));
        }
      })
      .catch(() => { /* silently fall back to static values */ });
  }, []);


  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.country) newErrors.country = 'Please select your country';
    if (!form.cohort) newErrors.cohort = 'Please select your cohort year';
    if (!form.accommodation) newErrors.accommodation = 'Please select an accommodation option';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (form.phone.replace(/[\s\-\(\)]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [paymentError, setPaymentError] = useState('');

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setPaymentError('');

    // ── KKiaPay (direct hosted payment page) ──
    if (paymentMethod === 'kkiapay') {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, paymentMethod: 'kkiapay' }),
        });
        const data = await res.json();
        if (data.referenceId) referenceIdRef.current = data.referenceId;
      } catch { /* continue even if DB save fails */ }

      // NOTE: When restoring the SDK widget, set amount in XOF (KKiaPay currency).
      // US$150 ≈ 90,750 XOF (at ~605 XOF/USD). Verify the rate before going live.
      window.location.href = 'https://direct.kkiapay.me/45674/tutu-fellows-20th-year-reunion-Myp2iwZFZ';
      return;
    }

    // ── Bank Transfer ──
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, paymentMethod: 'bank' }),
      });
      const data = await res.json();
      if (data.referenceId) referenceIdRef.current = data.referenceId;
    } catch { /* continue even if DB save fails */ }

    setIsSubmitting(false);
    setShowBankingModal(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <section id="register" style={{ background: '#F7F5F6' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="card success-card">
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#F9EEF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                margin: '0 auto 24px',
              }}
            >
              ✓
            </div>
            <h2 style={{ color: '#9B1D6E', marginBottom: 16 }}>Registration Received!</h2>
            <p style={{ fontSize: 16, color: '#5C3A50', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 12px' }}>
              Thank you, <strong>{form.fullName}</strong>. Your registration has been recorded
              successfully.
            </p>
            <div
              style={{
                background: '#F9EEF5',
                borderRadius: 12,
                padding: '20px 28px',
                maxWidth: 400,
                margin: '0 auto 24px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: '#9B1D6E', marginBottom: 12 }}>
                Your Details:
              </p>
              <p style={{ fontSize: 13, color: '#5C3A50', marginBottom: 6 }}>
                <strong>Cohort:</strong> {form.cohort}
              </p>
              <p style={{ fontSize: 13, color: '#5C3A50', marginBottom: 6 }}>
                <strong>Accommodation:</strong> {form.accommodation}
              </p>
              <p style={{ fontSize: 13, color: '#5C3A50' }}>
                <strong>Country:</strong> {form.country}
              </p>
            </div>
            <p style={{ fontSize: 13, color: '#5C3A50' }}>
              Questions? Contact{' '}
              <a href="mailto:info@alinstitute.org" style={{ color: '#9B1D6E', fontWeight: 600 }}>
                programme@alinstitute.org
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" style={{ background: '#F7F5F6' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: '#9B1D6E',
              fontWeight: 600,
            }}
          >
            Step 1: Secure Your Place
          </span>
          <h2>Register &amp; Pay Your Deposit</h2>
          <p className="sub">
            Complete your details and pay the US$150 deposit to confirm your spot. Your place is only
            secured once the deposit is received. Deadline: <strong>30 June 2026.</strong>
          </p>
        </div>

        <div className="card">
          <div className="grid-2">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Amara Okafor"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                style={errors.fullName ? { borderColor: '#e53e3e' } : undefined}
              />
              {errors.fullName && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.fullName}</p>
              )}
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. a.okafor@example.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                style={errors.email ? { borderColor: '#e53e3e' } : undefined}
              />
              {errors.email && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.email}</p>
              )}
            </div>
            <div>
              <label>Country of Residence</label>
              <select
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value)}
                style={errors.country ? { borderColor: '#e53e3e' } : undefined}
              >
                <option value="">Select country…</option>
                <option>Nigeria</option>
                <option>South Africa</option>
                <option>Kenya</option>
                <option>Ghana</option>
                <option>Zimbabwe</option>
                <option>Ethiopia</option>
                <option>Rwanda</option>
                <option>Senegal</option>
                <option>Other</option>
              </select>
              {errors.country && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.country}</p>
              )}
            </div>
            <div>
              <label>Tutu Fellow Cohort Year</label>
              <select
                value={form.cohort}
                onChange={(e) => handleChange('cohort', e.target.value)}
                style={errors.cohort ? { borderColor: '#e53e3e' } : undefined}
              >
                <option value="">Select cohort…</option>
                <option>2006 (Cohort 1)</option>
                <option>2007 (Cohort 2)</option>
                <option>2008 (Cohort 3)</option>
                <option>2009 (Cohort 4)</option>
                <option>2010 (Cohort 5)</option>
                <option>2011 (Cohort 6)</option>
                <option>2012 (Cohort 7)</option>
                <option>2013 (Cohort 8)</option>
                <option>2014 (Cohort 9)</option>
                <option>2015 (Cohort 10)</option>
                <option>2016 (Cohort 11)</option>
                <option>2017 (Cohort 12)</option>
                <option>2018 (Cohort 13)</option>
                <option>2019 (Cohort 14)</option>
                <option>2020 (Cohort 15)</option>
                <option>2021 (Cohort 16)</option>
                <option>2022 (Cohort 17)</option>
                <option>2023 (Cohort 18)</option>
                <option>2024 (Cohort 19)</option>
                <option>2025 (Cohort 20)</option>
              </select>
              {errors.cohort && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.cohort}</p>
              )}
            </div>
            <div>
              <label>Accommodation Preference</label>
              <select
                value={form.accommodation}
                onChange={(e) => handleChange('accommodation', e.target.value)}
                style={errors.accommodation ? { borderColor: '#e53e3e' } : undefined}
              >
                <option value="">Select option…</option>
                <option>Victoria Falls Estates (Self-Catering Apartments)</option>
                <option>Zambezi Boutique Lodge</option>
                <option>Victoria Falls Safari Lodge (Conference Venue)</option>
                <option>5-Star Partner Hotels (Enquire)</option>
              </select>
              {errors.accommodation && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
                  {errors.accommodation}
                </p>
              )}
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. +234 800 000 0000"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                style={errors.phone ? { borderColor: '#e53e3e' } : undefined}
              />
              {errors.phone && (
                <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 4 }}>{errors.phone}</p>
              )}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Dietary Requirements &amp; Other Notes</label>
            <textarea
              rows={2}
              placeholder="Vegetarian, halal, allergies, or any other information we should know…"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>

          {paymentError && (
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                background: '#FFF5F5',
                border: '1px solid #e53e3e',
                borderRadius: 10,
                color: '#e53e3e',
                fontSize: 13,
              }}
            >
              {paymentError}
            </div>
          )}

          {/* Payment method selector */}
          <div style={{ marginTop: 28, marginBottom: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#4A0A33', marginBottom: 12 }}>
              Choose your payment method:
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

              {/* KKiaPay — active */}
              <button
                type="button"
                onClick={() => setPaymentMethod('kkiapay')}
                style={{
                  flex: 1,
                  minWidth: 140,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: paymentMethod === 'kkiapay' ? '2px solid #9B1D6E' : '1.5px solid #DDD',
                  background: paymentMethod === 'kkiapay' ? '#F9EEF5' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: '#9B1D6E', margin: '0 0 2px' }}>KKiaPay</p>
                <p style={{ fontSize: 11, color: '#5C3A50', margin: 0 }}>Mobile Money &amp; Card</p>
              </button>

              {/* Bank Transfer — fallback */}
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                style={{
                  flex: 1,
                  minWidth: 140,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: paymentMethod === 'paypal' ? '2px solid #5C3A50' : '1.5px solid #DDD',
                  background: paymentMethod === 'paypal' ? '#F7F4F6' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: '#5C3A50', margin: '0 0 2px' }}>Bank Transfer</p>
                <p style={{ fontSize: 11, color: '#5C3A50', margin: 0 }}>EFT / Wire — details on next screen</p>
              </button>

              {/* Payfast — pending verification */}
              {/* <button type="button" disabled style={{ ... }}>Payfast</button> */}

            </div>
          </div>

          {/* KKiaPay amount notice — shown only when KKiaPay is selected */}
          {paymentMethod === 'kkiapay' && (
            <div style={{
              marginTop: 12,
              padding: '14px 16px',
              background: '#FFF9EC',
              border: '1px solid #F6C847',
              borderRadius: 10,
              fontSize: 13,
              color: '#7A5C00',
              lineHeight: 1.7,
            }}>
              <strong>Important — KKiaPay payment amount:</strong><br />
              When you reach the KKiaPay payment page, enter{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: 15, color: '#4A3000' }}>
                  {xofAmount ? xofAmount.toLocaleString() : '84,827'} XOF (FCFA)
                </strong>
                <button
                  type="button"
                  onClick={() => {
                    const val = String(xofAmount ?? 84827);
                    navigator.clipboard.writeText(val).then(() => {
                      setXofCopied(true);
                      setTimeout(() => setXofCopied(false), 2000);
                    });
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontSize: 11, fontWeight: 600,
                    padding: '3px 9px', borderRadius: 6,
                    border: '1px solid #F6C847',
                    background: xofCopied ? '#D4EDDA' : '#FFF3CD',
                    color: xofCopied ? '#155724' : '#7A5C00',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {xofCopied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </span>{' '}
              in the amount field. This is the equivalent of <strong>US$150</strong>.<br />
              <span style={{ fontSize: 11, color: '#9A7A00' }}>
                {xofRate
                  ? <>Live rate: 1 USD = {xofRate.toFixed(2)} XOF &mdash; updated just now.</>
                  : <>Rate approx. 565.51 XOF per USD (as of 3 June 2026).</>}{' '}
                Verify at{' '}
                <a
                  href="https://www.xe.com/currencyconverter/convert/?Amount=150&From=USD&To=XOF"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#9B1D6E', fontWeight: 600 }}
                >
                  xe.com
                </a>.
              </span>
            </div>
          )}

          <div className="register-footer">
            <div>
              <p style={{ fontSize: 13, color: '#5C3A50', marginBottom: 4 }}>
                Deposit payable on submission
              </p>
              <p style={{ fontSize: 32, fontWeight: 700, color: '#9B1D6E' }}>US$150.00</p>
              <p style={{ fontSize: 12, color: '#5C3A50', marginTop: 4 }}>
                Deducted from your total. Non-refundable.
              </p>
            </div>
            <button
              className="btn btn-primary register-btn"
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? '⏳ Processing...'
                : paymentMethod === 'kkiapay'
                ? '🔒 Pay via KKiaPay'
                : '🔒 Submit & Get Bank Details'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Banking Details Modal ── */}
      {showBankingModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}>
          <div style={{
            background: '#fff', borderRadius: 16,
            maxWidth: 520, width: '100%',
            maxHeight: '90vh', overflowY: 'auto',
            padding: '36px 32px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#F9EEF5', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 26, margin: '0 auto 14px',
              }}>✓</div>
              <h3 style={{ color: '#9B1D6E', margin: '0 0 8px', fontSize: 20 }}>Registration Submitted</h3>
              <p style={{ fontSize: 14, color: '#5C3A50', margin: 0 }}>Thank you, <strong>{form.fullName}</strong>. Your details have been recorded.</p>
            </div>

            <div style={{
              background: '#FFF9EC', border: '1px solid #F6C847',
              borderRadius: 10, padding: '12px 16px', marginBottom: 24,
            }}>
              <p style={{ fontSize: 13, color: '#7A5C00', margin: 0, lineHeight: 1.6 }}>
                <strong>Note:</strong> Our online payment gateways are currently experiencing some challenges. In the meantime, please make your <strong>US$150 deposit</strong> directly to the organisation's bank account below.
              </p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#9B1D6E', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14 }}>Banking Details</p>
              {[
                ['Bank', 'Nedbank'],
                ['Account Holder', 'African Leadership Institute in South Africa (RF) NPC'],
                ['Account Number', '1108093582'],
                ['Account Type', 'Current Account'],
                ['Branch Name', 'Sandton'],
                ['Branch Code', '198765'],
                ['SWIFT Code', 'NEDSZAJJ'],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '9px 0', borderBottom: '0.5px solid rgba(92,58,80,0.12)',
                  gap: 12,
                }}>
                  <span style={{ fontSize: 12, color: '#888', minWidth: 110 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#2D1A25', textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: '#F9EEF5', borderRadius: 10,
              padding: '12px 16px', marginBottom: 24,
            }}>
              <p style={{ fontSize: 12, color: '#5C3A50', margin: '0 0 6px', fontWeight: 600 }}>Transfer instructions:</p>
              <p style={{ fontSize: 12, color: '#5C3A50', margin: '0 0 4px', lineHeight: 1.6 }}>
                <strong>Local SA (EFT):</strong> Use account number <strong>1108093582</strong> and branch code <strong>198765</strong>
              </p>
              <p style={{ fontSize: 12, color: '#5C3A50', margin: '0 0 4px', lineHeight: 1.6 }}>
                <strong>International (Wire):</strong> Use SWIFT code <strong>NEDSZAJJ</strong>
              </p>
              <p style={{ fontSize: 12, color: '#5C3A50', margin: 0, lineHeight: 1.6 }}>
                <strong>Payment reference:</strong> Use your full name so your payment can be tracked
              </p>
            </div>

            <div style={{
              background: '#EEF2FF', border: '1px solid #C0CAFF',
              borderRadius: 10, padding: '12px 16px', marginBottom: 28,
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 13, color: '#2D3A8C', margin: 0, lineHeight: 1.7 }}>
                Once payment is made, please email your proof of payment to{' '}
                <a href="mailto:programme@alinstitute.org" style={{ color: '#9B1D6E', fontWeight: 700 }}>
                  programme@alinstitute.org
                </a>
              </p>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { setShowBankingModal(false); setSubmitted(true); }}
            >
              I&apos;ve Noted the Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
