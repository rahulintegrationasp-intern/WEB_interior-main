# Patterns & Pallettes — Interior Design Studio (MERN Stack)

A full-stack portfolio and client-engagement web application for **Patterns & Pallettes Interior Design Studio**, built with **React 19, Vite, Tailwind CSS, Framer Motion, Node.js, Express 5, MongoDB (Mongoose), Cloudinary, and Nodemailer**.

---

## Visual Direction & Design System

The frontend implements an editorial luxury dark-mode design system inspired by architectural digest showcases:
- **Surface Palette**: Deep espresso (`#140904`), elevated dark walnut (`#1D0E07` / `#26130A`), warm amber (`#C87D3B`), and brushed copper (`#D49B6A`) borders.
- **Typography**: High-contrast editorial serif display headings (`Cormorant Garamond`) paired with clean geometric sans-serif body and UI controls (`Plus Jakarta Sans`).
- **Hero Presentation**: Left-aligned warm amber interior photography transitioning seamlessly via multi-stop dark espresso gradients into the right-hand headline and call-to-action area.
- **Accessibility & Responsiveness**: Mobile-first responsive layouts across `360px`, `390px`, `768px`, `1024px`, and `1440px`, semantic landmarks, labeled form inputs, keyboard focus rings, and `prefers-reduced-motion` support.

---

## Project Structure

```text
WEB_interior-main/
├── .env.example                 # Root environment variable template
├── README.md                    # Project documentation
├── client/                      # React 19 + Vite + Tailwind CSS frontend
│   ├── .env.example             # Frontend environment template (VITE_API_BASE_URL)
│   ├── index.html               # HTML entry with Google Fonts & metadata
│   ├── public/
│   │   ├── logo.jpeg            # Studio brand emblem
│   │   └── images/              # Curated interior & fallback photography
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js           # Centralized API base URL & endpoint helpers
│   │   ├── data/
│   │   │   └── studioData.js    # Studio services, fallback projects, stats & testimonials
│   │   ├── components/
│   │   │   ├── Navbar/          # Sticky responsive navigation bar + mobile drawer
│   │   │   ├── Footer/          # Editorial studio footer
│   │   │   ├── Shared/          # EnquiryForm & NotFound (404) components
│   │   │   ├── Home/            # Hero, Stats, Interactive Services, Projects, Testimonials, CTA
│   │   │   ├── OurServices/     # 8 Core Services, Features, 4-Step Process, Why Choose Us
│   │   │   ├── Portfolio/       # Portfolio Gallery, Category Filter, Before/After, ProjectDetail
│   │   │   ├── About/           # Studio Story, Spaces We Design, Founder Quote, Achievements
│   │   │   ├── Contact/         # Contact Cards, Enquiry Form, Google Map, Social Links
│   │   │   └── Admin/           # Authentication (Login) & Dashboard (Project CRUD)
│   │   ├── App.jsx              # Application router
│   │   ├── index.css            # Design system tokens & reusable component classes
│   │   └── main.jsx             # React DOM root
│   ├── tailwind.config.js       # Tailwind theme tokens
│   └── package.json
└── server/                      # Node.js + Express 5 + MongoDB backend
    ├── .env.example             # Backend environment variable template
    ├── db.js                    # MongoDB connection helper
    ├── index.js                 # Express server entry point & Cloudinary setup
    ├── models/
    │   └── project.js           # Mongoose schema for Portfolio Projects
    ├── routes/
    │   ├── project.js           # Project CRUD endpoints + Multer/Cloudinary upload
    │   └── form.js              # Consultation enquiry email endpoint (Nodemailer)
    └── package.json
```

---

## Frontend Routes

| Route | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Public | Hero, Studio Stats, Interactive Services Accordion, Featured Projects, Testimonials, Consultation Form |
| `/services` | `OurServices` | Public | 8 Interior Services in detail, Features We Offer, 4-Step Process, Why Choose Us |
| `/portfolio` | `Portfolio` | Public | Project Gallery, Category Filter (`All`, `Residential`, `Commercial`, `Hospitality`), Before/After Slider |
| `/portfolio/:id` | `ProjectDetail` | Public | Individual Project Detail view with metadata, materials, style, and consultation CTA |
| `/about` | `About` | Public | Studio Story, Spaces We Design, Principal Designer Quote (Janhavi Bagul), Achievements, Client Reviews |
| `/contact` | `Contact` | Public | Direct Contact Cards, Enquiry Form, Google Map Embed, Consultation Hours, Social Links |
| `/authentication` (alias `/admin/login`) | `Authentication` | Public | Admin Portal Login |
| `/dashboard` (alias `/admin/dashboard`, `/admin/projects`) | `Dashboard` | Admin | Portfolio Project CRUD (Add, Edit, Delete with Confirmation, Filter & Search) |
| `*` | `NotFound` | Public | Styled 404 Page |

---

## REST API Endpoints

### Projects (`/api/project`)
- `GET /api/project` — List all projects (supports optional `?category=Residential|Commercial|Hospitality` filter).
- `GET /api/project/:id` — Fetch a single project by MongoDB `_id`.
- `POST /api/project` — Create a new project (`multipart/form-data` with fields `name`, `desc`, `cat`, and image file `pimg` uploaded to Cloudinary).
- `PATCH /api/project/:id` — Update an existing project (`multipart/form-data` with optional `name`, `desc`, `cat`, `pimg`).
- `DELETE /api/project/:id` — Delete a project by `_id`.

### Enquiries (`/api/form`)
- `POST /api/form/enq` — Submit a consultation enquiry (`{ firstname, lastname, mobileno, email, address, selectedservice, message }`) and send an email notification via Nodemailer.

---

## Environment Variables

Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`:

### Backend (`server/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Express server port | `8080` |
| `DB` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `CN` | Cloudinary Cloud Name | `your_cloud_name` |
| `AK` | Cloudinary API Key | `123456789012345` |
| `AS` | Cloudinary API Secret | `your_api_secret` |
| `EMAIL` | Gmail address for Nodemailer SMTP | `studio@gmail.com` |
| `PASSWORD` | Gmail App Password for Nodemailer | `abcd efgh ijkl mnop` |
| `RECEIVER_EMAIL` | Destination email for client enquiries | `adityasalkar1806@gmail.com` |

### Frontend (`client/.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL for backend API requests | `http://localhost:8080` |

---

## Local Setup & Development

1. **Install Backend Dependencies & Start API Server**
   ```bash
   cd server
   cp .env.example .env
   # Update server/.env with your MongoDB, Cloudinary, and SMTP credentials
   npm install
   npm start
   ```
   The API server starts on `http://localhost:8080`.

2. **Install Frontend Dependencies & Start Vite Dev Server**
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```
   Open the local URL shown by Vite (typically `http://localhost:5173`).

3. **Production Build & Lint**
   ```bash
   cd client
   npm run lint
   npm run build
   ```
