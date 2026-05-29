# Supabase Setup Guide

Complete guide to set up the Supabase database for collecting registration data.

---

## Step 1: Create a Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** and sign up (you can use GitHub login)
3. Click **"New Project"**
4. Fill in:
   - **Project Name:** `tutu-reunion`
   - **Database Password:** Choose a strong password (save it somewhere)
   - **Region:** Choose the closest to your users (e.g., West EU or East US)
5. Click **"Create new project"** — wait ~60 seconds for it to provision

---

## Step 2: Create the Registrations Table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste the following SQL and click **"Run"**:

```sql
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT NOT NULL,
  cohort TEXT NOT NULL,
  phone TEXT,
  accommodation TEXT NOT NULL,
  notes TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the website (anon key)
CREATE POLICY "Allow public inserts" ON registrations
  FOR INSERT WITH CHECK (true);

-- Only allow authenticated users (you) to read data
CREATE POLICY "Allow authenticated reads" ON registrations
  FOR SELECT USING (auth.role() = 'authenticated');
```

4. You should see "Success. No rows returned" — the table is created!

---

## Step 3: Get Your API Keys

1. Go to **Settings → API** (left sidebar → gear icon → API)
2. You'll see:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon (public) key** — a long JWT string starting with `eyJ...`
3. Copy both values

---

## Step 4: Add Keys to Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...your_anon_key
```

Also add these in **Vercel** (Settings → Environment Variables) when you deploy.

---

## Step 5: Verify It Works

1. Start the dev server (`npm run dev`)
2. Fill in the registration form and submit
3. Go to Supabase → **Table Editor** → `registrations`
4. You should see the new row with the submitted data and `payment_status: pending`

---

## Viewing Registration Data

### In Supabase Dashboard:
- Go to **Table Editor** → `registrations`
- View all submissions in a spreadsheet-like view
- Filter by payment_status, country, cohort, etc.
- Sort by `created_at` to see most recent

### Export to CSV:
- In Table Editor, click the **Export** button (top right)
- Download as CSV to share with the team

---

## Table Schema Reference

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Auto-generated unique ID |
| `full_name` | Text | Fellow's full name |
| `email` | Text | Email address |
| `country` | Text | Country of residence |
| `cohort` | Text | Tutu Fellow cohort year |
| `phone` | Text | Phone number (optional) |
| `accommodation` | Text | Selected accommodation option |
| `notes` | Text | Dietary requirements / other notes |
| `payment_status` | Text | `pending` or `paid` |
| `created_at` | Timestamp | When they registered |

---

## Updating Payment Status (Optional)

After confirming payment through Lemon Squeezy, you can manually update the status in Supabase:

1. Go to Table Editor → find the row
2. Click on the `payment_status` cell
3. Change from `pending` to `paid`

Or run this SQL:
```sql
UPDATE registrations SET payment_status = 'paid' WHERE email = 'fellow@example.com';
```

---

## Security Notes

- The **anon key** only allows INSERT (creating new registrations) — visitors cannot read other people's data
- Only **authenticated** users (you, logged into the Supabase dashboard) can view all registrations
- Row Level Security (RLS) is enabled by default

---

## Need Help?

- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Dashboard: [https://app.supabase.com](https://app.supabase.com)
