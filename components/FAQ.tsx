'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Will AFLI arrange airport transfers?',
      a: 'Yes. Love For Africa will coordinate airport transfers for all registered Fellows travelling into Victoria Falls International Airport (VFA) or Harry Mwanga Nkumbula International Airport in Livingstone (LVI). You will be asked to provide your flight details as part of the registration process.',
    },
    {
      q: 'Is there an additional cost for the airport transfer?',
      a: 'Yes. Airport transfers are covered under the Alumni Organization Contribution of US$150. There is no separate charge for the shuttle to and from the airport for registered Fellows travelling within the standard retreat dates.',
    },
    {
      q: 'Can I arrive early or depart later than the official dates?',
      a: 'Yes. You are welcome to extend your stay before or after the retreat dates of 25–29 November 2026. Any additional nights will be at your own cost, and you will need to arrange those directly with your chosen property. Please note that transfers outside the official dates are not included.',
    },
    {
      q: 'What does the Alumni Organization Contribution cover?',
      a: 'The administration fee covers all programme costs associated with the retreat: facilitation, materials, conference space, meals and refreshments during sessions, the gala dinner, the boma evening, excursions, and onsite logistics coordination across all five days.',
    },
    {
      q: 'Is the US$50 deposit refundable?',
      a: 'The deposit is non-refundable. However, it is deducted from your total payment and is not charged in addition to the balance. It serves to confirm your commitment and secure your place at the retreat.',
    },
    {
      q: 'Will I need a visa to enter Zimbabwe?',
      a: 'Visa requirements vary by nationality. AFLI will provide official visa invitation letters upon request to all registered Fellows. Please contact the team once you have registered and confirmed your place. We recommend applying well in advance of the travel date.',
    },
    {
      q: 'What meals are included during the retreat?',
      a: 'Meals and refreshments are provided throughout all retreat sessions, including breakfast (at Zambezi Boutique Lodge for guests there), tea breaks, working lunches, the gala dinner, and the boma evening. Full details of the catering schedule will be shared in the pre-departure briefing pack sent to confirmed Fellows.',
    },
    {
      q: 'Can I bring a spouse or guest?',
      a: 'The retreat is designed exclusively for Tutu Fellows. Guest participation in programme sessions is not available. Fellows wishing to have family members travel with them are welcome to make independent arrangements for accompanying guests at their own cost. Please note that guest accommodation within the AFLI block is subject to availability.',
    },
  ];

  return (
    <section id="faqs" style={{ background: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
            Questions
          </span>
          <h2>Frequently Asked Questions</h2>
          <p className="sub" style={{ maxWidth: 560, margin: '0 auto' }}>
            Practical answers to the questions we expect Fellows will ask.
          </p>
        </div>

        <div className="card">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="faq-item">
              <div
                className="faq-q"
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFaq(index); }}
              >
                {faq.q}{' '}
                <span
                  style={{
                    color: '#9B1D6E',
                    fontSize: 18,
                    fontWeight: 400,
                    transition: 'transform 0.2s',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </div>
              <div
                className="faq-a"
                style={{
                  maxHeight: openIndex === index ? 500 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, opacity 0.3s ease',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#5C3A50', marginBottom: 16 }}>
            Have a question not answered here?
          </p>
          <a href="mailto:info@alinstitute.org" className="btn btn-outline">
            Contact the AFLI Team
          </a>
        </div>
      </div>
    </section>
  );
}
