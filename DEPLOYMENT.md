# Deployment Guide for Vercel

## Quick Start

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Reflectly feedback tool"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - click **"Deploy"**

### 3. Set Up Database (Vercel Postgres)

#### Option A: Vercel Postgres (Recommended)

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Choose a region close to your users
4. Click **"Create"**
5. Vercel will automatically add `POSTGRES_URL` to your environment variables

#### Option B: External PostgreSQL (Neon, Supabase, etc.)

1. Create a PostgreSQL database on [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Copy the connection string
3. Add it to Vercel environment variables as `DATABASE_URL`

### 4. Update Prisma Schema

Change the datasource in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

### 5. Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:

```bash
# Database (auto-added if using Vercel Postgres)
DATABASE_URL=your_postgres_connection_string

# NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=https://your-app.vercel.app

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 6. Add Build Script

Vercel needs to run Prisma migrations during build. Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && prisma db push && next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 7. Redeploy

After updating the schema and environment variables:
1. Commit and push changes to GitHub
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy from Vercel dashboard

## Post-Deployment Checklist

- [ ] Test authentication (sign up/sign in)
- [ ] Create a test project
- [ ] Submit feedback on the public page
- [ ] Verify upvoting works
- [ ] Test the embed widget on a test page

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all environment variables are set
- Verify `DATABASE_URL` is correct

### Database Connection Issues
- Confirm PostgreSQL connection string is valid
- Check if database allows connections from Vercel IPs
- Ensure `prisma generate` runs during build

### Authentication Not Working
- Verify `NEXTAUTH_URL` matches your Vercel domain
- Check `NEXTAUTH_SECRET` is set
- For Google OAuth, update authorized redirect URIs in Google Console

## Custom Domain (Optional)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Logs**: View real-time logs in Vercel dashboard
- **Errors**: Check Functions tab for serverless function errors

## Cost Estimate

- **Vercel Hobby Plan**: Free (sufficient for MVP)
- **Vercel Postgres**: Free tier includes 256 MB storage
- **Scaling**: Upgrade to Pro ($20/month) when needed

---

**That's it!** Your Reflectly app should now be live at `https://your-app.vercel.app` 🎉
