# God's Oracle Ministries (GOM) — Website

Official website for **God's Oracle Ministries**, built with Next.js (App
Router), **Appwrite** (auth, database & storage), and **GSAP** animations.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Appwrite setup

This project uses Appwrite for everything: email/password auth, the database
(`events`, `pastors`, `churches`, `contact` collections), and file storage
(event & pastor images).

### 1. Create an Appwrite project

1. Create the project in the [Appwrite Console](https://cloud.appwrite.io) and
   note its **Project ID** and region endpoint (e.g.
   `https://fra.cloud.appwrite.io/v1`).
2. Add a **Web platform** for your app URL (`http://localhost:3000` for dev).
3. Create an **API key** under *Integrations → API keys* with these scopes:
   - `users.read`, `users.write`
   - `sessions.read`, `sessions.write`
   - `databases.read`, `databases.write`
   - `storage.read`, `storage.write`

### 2. Environment variables

Copy `.env.local` fields:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://<region>.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<project-id>
APPWRITE_API_KEY=<server-only-api-key>

NEXT_PUBLIC_APPWRITE_DATABASE_ID=gom
NEXT_PUBLIC_APPWRITE_EVENTS_COLLECTION_ID=events
NEXT_PUBLIC_APPWRITE_PASTORS_COLLECTION_ID=pastors
NEXT_PUBLIC_APPWRITE_CHURCHES_COLLECTION_ID=churches
NEXT_PUBLIC_APPWRITE_CONTACT_COLLECTION_ID=contact
NEXT_PUBLIC_APPWRITE_EVENT_IMAGES_BUCKET_ID=event_images
NEXT_PUBLIC_APPWRITE_PASTO_IMAGES_BUCKET_ID=pasto_images
```

### 3. Run the setup script

The bootstrap script creates the database, collections & attributes, storage
buckets, and permissions automatically:

```bash
node scripts/setup-appwrite.mjs
```

Optionally set `APPWRITE_ADMIN_EMAIL` / `APPWRITE_ADMIN_PASSWORD` in
`.env.local` and the script will create an admin user you can sign in as.

### Data model

| Collection | Fields |
| --- | --- |
| `events` | title, subtitle, address, date (datetime), starttime, endtime, gspeaker, tag, image, status |
| `pastors` | name, rank, address, email, phone, startdate, image, borderColor, glowColor, status |
| `churches` | name, address, desc, map (Google Maps embed URL), status |
| `contact` | name, email, phone, message, createdAt |

Permissions: public read for `events`/`pastors`/`churches` + images (so the
website works for visitors). Authenticated users (any logged-in Appwrite user)
can create/update/delete. `contact` allows anyone to submit a message and
admins to read them.

### Email/password auth

Sign in at `/login`. Email/password is enabled by default in Appwrite. Logged-in
users reach the admin dashboard at `/auth` (Events, Pastors, Churches admin).

## Stack

- **Next.js 16** (App Router) + Tailwind CSS v4
- **Appwrite** — `@appwrite.io/react` (auth/SSR), `appwrite` (web SDK),
  `node-appwrite` (server/setup)
- **GSAP** + ScrollTrigger for scroll animations
- **Bible API** (`bible-api.com`) for the daily verse (free, no key)