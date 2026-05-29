# PayPal Setup Guide

How to configure PayPal payments for the Tutu Fellows Reunion registration.

---

## Step 1: Get Your PayPal.Me Link or Payment URL

**Option A – PayPal.Me (simplest)**
1. Go to [https://www.paypal.com/paypalme](https://www.paypal.com/paypalme)
2. Log in to your PayPal Business account
3. Create your PayPal.Me link, e.g. `africanleadership`
4. Your payment URL will be: `https://www.paypal.com/paypalme/africanleadership/50USD`

**Option B – PayPal Standard Button**
1. Go to [https://www.paypal.com/buttons](https://www.paypal.com/buttons)
2. Create a "Buy Now" button for $50 USD
3. In "Step 2: Add advanced features" → set:
   - **Custom field:** `{{reference_id}}` (we will append it automatically)
   - **Return URL:** `https://your-domain.com/payment/success`
   - **Notify URL (IPN):** `https://your-domain.com/api/webhook/paypal`
4. Copy the generated button URL (starts with `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&...`)

---

## Step 2: Set Environment Variables

### In Vercel
1. Go to your project → **Settings → Environment Variables**
2. Add:
   - `PAYPAL_PAYMENT_URL` = your PayPal URL from Step 1
   - `SUPABASE_SERVICE_ROLE_KEY` = from Supabase Project Settings → API
3. Click **Save**

### In Supabase (update RLS policy)
You need an UPDATE policy so the server can mark payments as "paid". Run this SQL in the Supabase SQL Editor:

```sql
-- Allow the server (service role) to update payment_status
-- This is automatically handled by the service role key,
-- but if you want to test the confirm-payment API publicly:

CREATE POLICY "Allow public update by reference_id" ON registrations
  FOR UPDATE TO anon
  USING (reference_id IS NOT NULL)
  WITH CHECK (payment_status = 'paid');
```

---

## Step 3: Test the Flow

1. Fill in the registration form on the website
2. Click **"Submit & Pay via PayPal"**
3. You will be redirected to PayPal
4. After payment, PayPal redirects back to `/payment/success?reference_id=AFLI-2026-...`
5. The success page auto-updates Supabase to `payment_status = 'paid'`

---

## Step 4: Configure PayPal Webhook / IPN (Optional but Recommended)

If you want automatic confirmation even if the user doesn't return to the website:

1. In PayPal Business → **Settings → Notifications → Instant Payment Notifications**
2. Click **Edit Settings**
3. Set **Notification URL:** `https://your-domain.com/api/webhook/paypal`
4. Enable **Receive IPN messages**
5. Click **Save**

Now PayPal will send a server-to-server notification whenever a payment is made, and your registration will be marked as paid automatically.

---

## What You Need

| Value | Where to Find | Example |
|---|---|---|
| `PAYPAL_PAYMENT_URL` | PayPal.Me or Button generator | `https://www.paypal.com/paypalme/africanleadership/50USD` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → Service Role Key | `eyJ...` |

---

## Troubleshooting

| Problem | Solution |
|---|---|
| "PAYPAL_PAYMENT_URL not configured" | Add the env var in Vercel |
| Payment not marked as paid | Check that `SUPABASE_SERVICE_ROLE_KEY` is set |
| User returns but no reference_id | Ensure PayPal is appending the return URL with params |
| RLS error on update | Add the UPDATE policy in Supabase SQL Editor |

---

## Need Help?

- PayPal Help: [https://www.paypal.com/help](https://www.paypal.com/help)
- Supabase RLS Docs: [https://supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)
