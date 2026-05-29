# Lemon Squeezy Setup Guide

Complete guide to configure Lemon Squeezy payments for the Tutu Fellows Reunion website.

---

## Step 1: Create a Lemon Squeezy Account

1. Go to [https://lemonsqueezy.com](https://lemonsqueezy.com)
2. Click **"Get Started"** and sign up with your email
3. Verify your email address
4. Complete the onboarding steps

---

## Step 2: Set Up Your Store

1. After signing in, go to **Settings → Stores** (or it may prompt you during onboarding)
2. Fill in your store details:
   - **Store Name:** `African Leadership Institute` (or similar)
   - **Store URL slug:** `alinstitute` (this creates your storefront URL)
   - **Country:** Select your country
   - **Currency:** `USD`
3. Click **Save**
4. **Copy your Store ID** — you'll find it in the URL bar when viewing the store: `https://app.lemonsqueezy.com/stores/XXXXX` — the number `XXXXX` is your **Store ID**

---

## Step 3: Complete Payment Setup (To Receive Money)

**This is required before you can receive real payments.**

1. Go to **Settings → Payments**
2. Click **"Connect with Stripe"** (Lemon Squeezy uses Stripe Connect under the hood for payouts)
3. Complete the Stripe Connect onboarding:
   - Enter your **business/personal details**
   - Add your **bank account** for payouts
   - Provide **identity verification** (ID document)
4. Once connected, you'll see a green "Connected" status
5. Choose your **payout schedule** (daily, weekly, or monthly)

> **Note:** You can use **Test Mode** to test payments before completing this step. Toggle "Test Mode" in the top-right of the Lemon Squeezy dashboard.

---

## Step 4: Create the Deposit Product

1. Go to **Products** in the left sidebar
2. Click **"+ New Product"**
3. Fill in the product details:
   - **Name:** `Tutu Fellows 20th Year Reunion – Registration Deposit`
   - **Description:** `US$50 deposit to secure your place at the 20th Year Reunion of the Archbishop Tutu Leadership Fellowship. 25–29 November 2026, Victoria Falls, Zimbabwe.`
   - **Pricing:**
     - Select **"Single Payment"** (not subscription)
     - Set the price to **$50.00 USD**
   - **Media:** Optionally upload the AFLI logo or a reunion banner image
4. Click **"Publish"** to make the product live

---

## Step 5: Get the Variant ID

Every product in Lemon Squeezy has at least one **variant** (the pricing tier).

1. After creating the product, click on it to view details
2. Scroll down to the **Variants** section
3. You'll see one variant (the $50 price you set)
4. Click on the variant — the **Variant ID** is in the URL: `https://app.lemonsqueezy.com/products/XXXXX/variants/YYYYY` — the number `YYYYY` is your **Variant ID**

**Alternative way to find the Variant ID:**
- Go to the product page
- Look at the variant row — hover over it and you may see the ID
- Or use the Lemon Squeezy API: visit `https://api.lemonsqueezy.com/v1/variants` with your API key to list all variants

---

## Step 6: Generate an API Key

1. Go to **Settings → API** in the Lemon Squeezy dashboard
2. Click **"+ Create API Key"**
3. Give it a name like `tutu-reunion-website`
4. Click **Create**
5. **Copy the API key immediately** — it will only be shown once!

> **Keep this key secret.** Never put it in client-side code or commit it to Git.

---

## Step 7: Configure Your Environment Variables

1. In the project root, copy `.env.example` to `.env.local`:

   ```
   copy .env.example .env.local
   ```

2. Open `.env.local` and fill in your values:

   ```
   LEMONSQUEEZY_API_KEY=your_api_key_from_step_6
   LEMONSQUEEZY_STORE_ID=your_store_id_from_step_2
   LEMONSQUEEZY_VARIANT_ID=your_variant_id_from_step_5
   ```

3. Save the file and restart the dev server (`npm run dev`)

---

## Step 8: Test the Payment Flow

1. In the Lemon Squeezy dashboard, toggle **"Test Mode"** (top-right corner)
2. Make sure your API key was created while in **Test Mode** (or create a separate test key)
3. On the website, fill in the registration form and click **"Submit & Pay Deposit"**
4. You should be redirected to a Lemon Squeezy checkout page
5. Use the test card: `4242 4242 4242 4242` with any future expiry and any CVC
6. After payment, you'll be redirected to the success page

---

## Step 9: Go Live

When you're ready to accept real payments:

1. In Lemon Squeezy, switch **OFF** Test Mode
2. Create a **new API key** in Live Mode (or use the same one if it works in both)
3. Verify the **Store ID** and **Variant ID** are the same (they are shared across modes)
4. Update `.env.local` with the live API key
5. Ensure your **Payment Settings** (Step 3) are fully completed
6. Deploy the website

---

## Viewing Registrations & Payments

- **Orders:** Go to **Orders** in the Lemon Squeezy dashboard to see all payments
- **Customer data:** Each order shows the custom data (name, email, cohort, accommodation, etc.) submitted from the form
- **Export:** You can export order data to CSV from the Orders page
- **Notifications:** Lemon Squeezy sends email receipts to customers automatically

---

## Webhook (Optional — For Advanced Use)

If you want to save registration data to a database automatically after payment:

1. Go to **Settings → Webhooks** in Lemon Squeezy
2. Create a webhook pointing to `https://your-domain.com/api/webhook`
3. Select the event `order_created`
4. Lemon Squeezy will POST order data (including the custom form fields) to your endpoint after each successful payment

---

## Summary of Values You Need

| Value | Where to Find It | Example |
|---|---|---|
| `LEMONSQUEEZY_API_KEY` | Settings → API → Create API Key | `eyJ0eXAi...` |
| `LEMONSQUEEZY_STORE_ID` | Settings → Stores → Store URL | `12345` |
| `LEMONSQUEEZY_VARIANT_ID` | Products → Your Product → Variants → URL | `67890` |

---

## Need Help?

- Lemon Squeezy Docs: [https://docs.lemonsqueezy.com](https://docs.lemonsqueezy.com)
- Lemon Squeezy API Reference: [https://docs.lemonsqueezy.com/api](https://docs.lemonsqueezy.com/api)
- Support: [https://lemonsqueezy.com/help](https://lemonsqueezy.com/help)
