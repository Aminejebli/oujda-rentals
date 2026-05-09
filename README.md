# Oujda Rentals

A mobile-first MVP car rental marketplace for Oujda, Morocco.

Users can browse cars, compare prices, view rental agencies, and contact agencies directly through WhatsApp.

## Tech Stack

- Next.js
- Tailwind CSS
- Supabase
- Vercel
- GitHub

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
copy .env.example .env.local
```

Then add your real Supabase values inside `.env.local`.

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main Pages

- `/` homepage
- `/cars` car listing with filters
- `/cars/[slug]` car detail page
- `/agencies` agency listing
- `/agencies/[slug]` agency profile page

## Supabase

The database schema is stored in:

```text
supabase/schema.sql
```

It creates:

- `categories`
- `agencies`
- `cars`

Do not commit `.env.local`.
