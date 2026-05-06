# Deployment Guide

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Gmail App Password** - Generate at [Google App Passwords](https://myaccount.google.com/apppasswords)
3. **PostgreSQL Database** (if using database features)

## Environment Variables

The following environment variables must be configured in Vercel:

### Required for Production

```bash
# WordPress API
NEXT_PUBLIC_WP_API_URL=https://dev.moreyeahs.com

# Chatbot API
NEXT_PUBLIC_CHATBOT_API_URL=https://newchatbot.moreyeahs.com
NEXT_PUBLIC_CHATBOT_CHAT_API_URL=https://newchatbot.moreyeahs.com/chat
NEXT_PUBLIC_CHATBOT_HISTORY_API_URL=https://newchatbot.moreyeahs.com/history

# Gmail SMTP (for careers form resume attachments)
GMAIL_USER=digitalmoreyeahs@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password

# Database (Optional - only if using database features)
DATABASE_URL=postgresql://username:password@host:port/database
```

## Vercel Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Configure environment variables:
   - Go to Project Settings → Environment Variables
   - Add each variable from the list above
   - Make sure to set them for Production, Preview, and Development environments
5. Click "Deploy"

### Option 2: Deploy via Git Push (Automated)

1. Connect your repository to Vercel (one-time setup)
2. Configure environment variables in Vercel dashboard
3. Run the deployment script:
   ```bash
   deploy.bat
   ```
4. Vercel will automatically deploy on every push to main branch

### Option 3: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Setting Up Environment Variables in Vercel

1. Navigate to your project in Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `GMAIL_APP_PASSWORD`)
   - **Value**: The actual value
   - **Environments**: Select Production, Preview, and Development
4. Click "Save"

## Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Other (Custom name)"
5. Enter "MoreYeahs Website"
6. Click "Generate"
7. Copy the 16-character password
8. Add it to Vercel as `GMAIL_APP_PASSWORD`

## Database Setup (Optional)

If you're using database features:

1. Set up a PostgreSQL database (e.g., on [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))
2. Get the connection string (format: `postgresql://user:pass@host:port/db`)
3. Add it to Vercel as `DATABASE_URL`
4. Run the schema setup:
   ```bash
   psql $DATABASE_URL < scripts/schema.sql
   ```

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### Environment Variables Not Working

- Verify variables are set for the correct environment (Production/Preview/Development)
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### Email Not Sending

- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct
- Ensure 2-Step Verification is enabled on Gmail account
- Check that App Password is 16 characters without spaces
- Review deployment logs for error messages

### Database Connection Issues

- Verify `DATABASE_URL` format is correct
- Check database is accessible from Vercel's servers
- Ensure database allows connections from Vercel's IP ranges
- Test connection locally first

## Monitoring

- **Deployment Status**: [Vercel Dashboard](https://vercel.com/dashboard)
- **Build Logs**: Available in each deployment
- **Runtime Logs**: Check Functions tab in Vercel dashboard
- **Analytics**: Enable in Project Settings

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your local values
3. Run development server:
   ```bash
   npm run dev
   ```

## Production URLs

- **Production**: Will be assigned by Vercel (e.g., `moreyeahs-website.vercel.app`)
- **Custom Domain**: Configure in Vercel Dashboard → Settings → Domains

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Project logs in Vercel dashboard
