'use client';

import { useState, useEffect } from 'react';
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

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setPaymentError(data.error || 'Unable to initiate payment. Please try again.');
        setIsSubmitting(false);
      }
    } catch {
      setPaymentError('Something went wrong. Please check your connection and try again.');
      setIsSubmitting(false);
    }
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
            <p style={{ fontSize: 15, color: '#5C3A50', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 24px' }}>
              You will receive a confirmation email at <strong>{form.email}</strong> with payment
              instructions for the US$50 deposit. Your place will be fully secured once the deposit
              is received.
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
                info@alinstitute.org
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
                <option>2005 (Cohort 1)</option>
                <option>2006 (Cohort 2)</option>
                <option>2007 (Cohort 3)</option>
                <option>2008 (Cohort 4)</option>
                <option>2009 (Cohort 5)</option>
                <option>2010 (Cohort 6)</option>
                <option>2011 (Cohort 7)</option>
                <option>2012 (Cohort 8)</option>
                <option>2013 (Cohort 9)</option>
                <option>2014 (Cohort 10)</option>
                <option>2015 (Cohort 11)</option>
                <option>2016 (Cohort 12)</option>
                <option>2017 (Cohort 13)</option>
                <option>2018 (Cohort 14)</option>
                <option>2019 (Cohort 15)</option>
                <option>2020 (Cohort 16)</option>
                <option>2021 (Cohort 17)</option>
                <option>2022 (Cohort 18)</option>
                <option>2023 (Cohort 19)</option>
                <option>2024 (Cohort 20)</option>
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
              {isSubmitting ? '⏳ Redirecting to PayPal...' : '🔒 Submit & Pay via PayPal'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
