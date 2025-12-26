# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   Create a `.env.local` file in the root directory with:
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_BHUN2KuT5GjV@ep-fragrant-star-a9yo80wt-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require
   
   SMTP_HOST=smtppro.zoho.eu
   SMTP_PORT=587
   SMTP_USER=contact@global-internships.com
   SMTP_PASSWORD=MsLU8b0gAzdB
   SMTP_FROM=contact@global-internships.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Initialize Database (Optional)**
   Visit `http://localhost:3000/api/init-db` to create the database table, or it will be created automatically on first signup.

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add all environment variables from `.env.local`
   - Deploy!

3. **Configure Domain**
   - In Vercel dashboard, go to Settings > Domains
   - Add `global-internships.com`
   - Follow DNS configuration instructions

## Notes

- The database table is created automatically on first signup
- CV files are currently stored as metadata only. For production, consider using Vercel Blob Storage or AWS S3
- Email sending uses Zoho SMTP - make sure credentials are correct
- Logo is located at `/public/logo.svg`

