# Backend Integration Guide
### CS Mangesh Narvekar Portfolio — Contact & Booking Forms

This document explains the backend that was added to power the **two existing
forms** on the portfolio site:

1. **Contact Form** — "Direct Advisory Requisition" (in the Contact section of `src/App.tsx`)
2. **Booking Form** — "Schedule Corporate Advisory" (the modal in `src/components/BookingModal.tsx`)

**No UI, design, layout, styling, animations, content, or existing functionality
was changed.** The only frontend changes are:

- The two form `onSubmit` handlers now call a backend API instead of writing to
  `localStorage` with a fake `setTimeout`.
- One new file, `src/lib/api.ts`, was added as a small fetch helper (no UI).
- One new file, `src/vite-env.d.ts`, was added so TypeScript recognizes the new
  environment variable (no UI).
- `.env.example` (root) gained one new variable: `VITE_API_BASE_URL`.

Everything else — every component, every class name, every animation, every
piece of copy — is untouched.

---

## 1. What Was Built

A new, fully separate backend lives in **`/server`**:

```
server/
├── package.json
├── .env.example
├── .gitignore
└── src/
    ├── server.js              # Express app entry point
    ├── config/
    │   └── db.js               # MongoDB Atlas connection (Mongoose)
    ├── models/
    │   ├── ContactSubmission.js
    │   └── BookingSubmission.js
    ├── routes/
    │   ├── contactRoutes.js     # POST /api/contact
    │   └── bookingRoutes.js     # POST /api/booking
    ├── controllers/
    │   ├── contactController.js
    │   └── bookingController.js
    ├── middleware/
    │   ├── validators.js        # express-validator rules
    │   └── errorHandler.js      # validation + centralized error handling
    └── utils/
        ├── mailer.js             # Nodemailer transporter
        └── emailTemplates.js     # HTML email templates
```

### How a submission flows

1. User submits the Contact or Booking form (UI unchanged).
2. The existing `handleContactSubmit` / `handleSubmit` function now sends a
   `POST` request (via `src/lib/api.ts`) to the backend.
3. The backend (`server/`):
   - **Validates** the payload (required fields, email format, 10-digit phone,
     allowed dropdown values, lengths).
   - **Saves** the submission to **MongoDB Atlas** via Mongoose.
   - **Emails Nagesh Narvekar** (configurable `ADMIN_EMAIL`) with all submitted
     details, using a `Reply-To` set to the submitter's email.
   - **Emails the submitter** an automatic confirmation.
   - Returns `{ success: true, ... }` (or an error message on failure).
4. The frontend shows the **existing** success/error UI exactly as it did
   before (the same `formSuccess` / `formError` / `submitted` / `error`
   states are used — just driven by a real API response now).

### Data stored in MongoDB Atlas

**`contactsubmissions` collection** (one document per Contact form submission):

| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `email` | String | required, lowercased |
| `phone` | String | required |
| `service` | String | one of the 5 dropdown options |
| `message` | String | required |
| `status` | String | `new` / `responded` / `archived` (default `new`) — for your own tracking in Atlas |
| `notificationEmailSent` | Boolean | whether the admin email succeeded |
| `confirmationEmailSent` | Boolean | whether the user confirmation email succeeded |
| `createdAt` / `updatedAt` | Date | automatic timestamps |

**`bookingsubmissions` collection** (one document per Booking form submission):

| Field | Type | Notes |
|---|---|---|
| `name` | String | required |
| `email` | String | required, lowercased |
| `phone` | String | required |
| `date` | String | preferred date (`YYYY-MM-DD`) |
| `timeSlot` | String | one of the 5 time slot options |
| `serviceType` | String | one of the 6 dropdown options |
| `description` | String | optional |
| `status` | String | `pending` / `confirmed` / `cancelled` (default `pending`) |
| `notificationEmailSent` | Boolean | whether the admin email succeeded |
| `confirmationEmailSent` | Boolean | whether the user confirmation email succeeded |
| `createdAt` / `updatedAt` | Date | automatic timestamps |

You can view, sort, filter, and export all of this directly in the
**MongoDB Atlas web UI** (Collections tab) — no admin panel was built, per the
requirements.

---

## 2. MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and
   sign in (or create a free account).
2. Create a **free shared cluster** (M0 tier is enough for form submissions).
3. **Create a database user**:
   - Database Access → Add New Database User
   - Choose "Password" authentication, set a username/password (save these —
     you'll need them for `MONGODB_URI`).
   - Give it "Read and write to any database" (or scope it to your specific DB).
4. **Allow network access**:
   - Network Access → Add IP Address
   - For Render deployment, add `0.0.0.0/0` (Allow Access from Anywhere). This
     is required because Render's outbound IPs are dynamic on free/starter
     plans.
5. **Get your connection string**:
   - Database → Connect → "Drivers" → copy the `mongodb+srv://...` URI.
   - Replace `<username>` and `<password>` with your database user's
     credentials, and add a database name before the `?`, e.g.:
     ```
     mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/csmn_portfolio?retryWrites=true&w=majority
     ```
6. You do **not** need to manually create collections — Mongoose creates
   `contactsubmissions` and `bookingsubmissions` automatically on first
   submission.

---

## 3. Email Setup (Gmail App Password — Recommended)

Gmail is the easiest option and requires no domain verification.

1. Use (or create) a Gmail account that will send these emails — e.g.
   `csmnportfolio@gmail.com`.
2. Enable **2-Step Verification** on that account (Google Account → Security).
3. Go to **Google Account → Security → App Passwords**.
4. Create an App Password (choose "Mail" / "Other", name it e.g.
   "Portfolio Backend").
5. Google gives you a **16-character password** — copy it. This is what goes
   in `EMAIL_PASS` (not your normal Gmail password).

**Using a different provider?** The backend also supports custom SMTP (Zoho,
Hostinger, Outlook/Office 365, etc.) — see the commented-out `EMAIL_HOST` /
`EMAIL_PORT` / `EMAIL_SECURE` variables in `server/.env.example`.

---

## 4. Environment Variables

### Backend — `server/.env`

Copy `server/.env.example` to `server/.env` and fill in:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/csmn_portfolio?retryWrites=true&w=majority

FRONTEND_URL=http://localhost:3000,https://your-portfolio-site.onrender.com

EMAIL_SERVICE=gmail
EMAIL_USER=csmnportfolio@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM_NAME=CS Mangesh Narvekar Portfolio

ADMIN_EMAIL=nagesh.narvekar@example.com
ADMIN_NAME=Nagesh Narvekar
```

> Replace `ADMIN_EMAIL` with Nagesh Narvekar's actual email address. This is
> the only place it needs to be configured — change it any time without
> touching code, for easy handover.

### Frontend — `.env` (project root)

Copy `.env.example` (root) to `.env` and set:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, this becomes your deployed backend URL (see Section 6), e.g.:

```env
VITE_API_BASE_URL=https://csmn-portfolio-backend.onrender.com
```

> **Important (Vite):** any variable read by the frontend must be prefixed
> with `VITE_` and the frontend must be **rebuilt** after changing it (env
> values are baked into the static build at build time).

---

## 5. Running Locally

### Backend

```bash
cd server
npm install
cp .env.example .env   # then edit .env with your real values
npm run dev             # starts on http://localhost:5000 (auto-restarts on changes)
```

Verify it's running:

```bash
curl http://localhost:5000/api/health
# {"success":true,"status":"ok","timestamp":"..."}
```

### Frontend

```bash
# from project root
cp .env.example .env   # ensure VITE_API_BASE_URL=http://localhost:5000
npm install
npm run dev             # starts on http://localhost:3000
```

Open `http://localhost:3000`, scroll to the Contact section (or open the
"Schedule Corporate Advisory" booking modal), and submit a form. You should see:

- The **existing** success message appear (unchanged UI).
- A new document in MongoDB Atlas (Collections → `csmn_portfolio` →
  `contactsubmissions` / `bookingsubmissions`).
- An email arrive at `ADMIN_EMAIL` with the submission details.
- A confirmation email arrive at the address entered in the form.

---

## 6. Deployment (Render)

Since the frontend is a **Render Static Site**, deploy the backend as a
**separate Render Web Service**. They communicate over HTTPS via
`VITE_API_BASE_URL` / `FRONTEND_URL` — no shared filesystem or process needed.

### Step A — Push to GitHub

Commit and push the whole project (including the new `/server` folder) to your
GitHub repository. `.env` files are git-ignored — only `.env.example` files are
committed.

### Step B — Deploy the Backend (Render Web Service)

1. Render Dashboard → **New** → **Web Service** → connect your repo.
2. **Root Directory**: `server`
3. **Runtime**: Node
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Environment Variables** (Settings → Environment): add every variable from
   `server/.env.example` with your real values:
   - `MONGODB_URI`
   - `FRONTEND_URL` (set this to your **Static Site's URL**, e.g.
     `https://csmn-portfolio.onrender.com` — comma-separate multiple origins if
     needed)
   - `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM_NAME`
   - `ADMIN_EMAIL`, `ADMIN_NAME`
   - `NODE_ENV=production`
   - (Leave `PORT` unset — Render provides its own `PORT`, which
     `process.env.PORT` already falls back to.)
7. Deploy. Note the resulting URL, e.g.
   `https://csmn-portfolio-backend.onrender.com`.
8. Confirm it's live: `https://csmn-portfolio-backend.onrender.com/api/health`

> **Free tier note:** Render's free web services "sleep" after inactivity, so
> the first form submission after idle time may take a few extra seconds while
> the service spins up. The existing "Verifying Profile... / Generating
> Reservation..." loading state already covers this gracefully.

### Step C — Update the Frontend's API URL

1. In your Render **Static Site** settings, add an environment variable:
   - `VITE_API_BASE_URL=https://csmn-portfolio-backend.onrender.com`
     (the URL from Step B).
2. Re-deploy (or trigger a manual rebuild) of the static site — Vite bakes
   env vars in at build time, so a rebuild is required for the change to
   take effect.

### Step D — Final Check

1. Visit your live portfolio site.
2. Submit the Contact form and the Booking form.
3. Confirm:
   - New documents appear in MongoDB Atlas.
   - Nagesh Narvekar receives both notification emails.
   - The submitter's email address receives both confirmation emails.
   - The UI behaves exactly as it always has (success messages, error
     messages, animations, etc.).

---

## 7. Validation & Error Handling Summary

**Server-side validation** (in addition to the existing client-side checks)
mirrors the frontend rules:

- All fields required except Booking's "description" (optional).
- Email must be a valid email address.
- Phone must contain at least 10 digits.
- `service` / `serviceType` / `timeSlot` must match one of the exact dropdown
  values from the forms (prevents tampering via direct API calls).
- Field length limits (e.g. message/description capped at 2000 characters) to
  prevent abuse.

**Error handling:**

- Invalid input → `400` with a clear message (shown in the existing
  `formError` / `error` UI element — no new UI was added).
- Database error → `500`, logged server-side, generic message returned to the
  client.
- Email sending failure does **not** fail the request — the submission is
  already safely stored in MongoDB Atlas (`notificationEmailSent` /
  `confirmationEmailSent` are set to `false` and the failure is logged on the
  server for troubleshooting).
- **CORS** is restricted to the origin(s) listed in `FRONTEND_URL`.
- **Rate limiting**: each form endpoint allows 20 requests per 15 minutes per
  IP address, to deter spam/abuse.
- **Helmet** sets standard security HTTP headers.

---

## 8. Future Handover Notes

Everything that might need to change later is a single environment variable —
no code edits required:

| To change... | Edit this variable |
|---|---|
| Notification recipient | `ADMIN_EMAIL` (and `ADMIN_NAME`) in `server/.env` |
| Sending email account | `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_SERVICE` in `server/.env` |
| Database / cluster | `MONGODB_URI` in `server/.env` |
| Allowed frontend origins | `FRONTEND_URL` in `server/.env` |
| Backend URL the frontend talks to | `VITE_API_BASE_URL` in root `.env` (requires frontend rebuild) |

To view, search, or export submissions: log into **MongoDB Atlas → Browse
Collections → `csmn_portfolio`** database → `contactsubmissions` /
`bookingsubmissions` collections.
