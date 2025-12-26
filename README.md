# Global Internships - Landing Page

A modern, student-focused landing page for Global Internships with a multi-step signup wizard.

## Features

- 🎨 Beautiful, modern landing page design
- 📝 Multi-step form wizard for student signups
- 📧 Automated confirmation emails
- 💾 PostgreSQL database integration (Neon)
- 📄 Optional CV upload
- ✨ Responsive design

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form** + **Zod** for form validation
- **PostgreSQL** (Neon)
- **Nodemailer** for email sending

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://neondb_owner:npg_BHUN2KuT5GjV@ep-fragrant-star-a9yo80wt-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require

SMTP_HOST=smtppro.zoho.eu
SMTP_PORT=587
SMTP_USER=contact@global-internships.com
SMTP_PASSWORD=MsLU8b0gAzdB
SMTP_FROM=contact@global-internships.com
```

### 3. Initialize Database

The database table will be created automatically on first API call, or you can run:

```bash
npm run dev
```

Then visit `/api/init-db` (if you create that endpoint) or the table will be created on first signup.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The domain `global-internships.com` should be configured in Vercel's domain settings.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts      # API endpoint for form submission
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   └── SignupWizard.tsx      # Multi-step form component
├── lib/
│   ├── db.ts                  # Database utilities
│   └── email.ts               # Email sending utilities
└── base-folder/               # Logo files
```

## Form Fields

### Required:
- First Name
- Last Name
- Email Address
- Address
- University
- Major

### Optional:
- CV/Resume (PDF, DOC, DOCX - max 5MB)
- Message to Internship Team

## License

Private project for Global Internships.

