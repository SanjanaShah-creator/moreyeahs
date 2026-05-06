# Deployment Checklist

Use this checklist to ensure successful deployment to Vercel.

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup

- [ ] Generate Gmail App Password
  - Go to https://myaccount.google.com/apppasswords
  - Create app password for "MoreYeahs Website"
  - Save the 16-character password securely

- [ ] Set up PostgreSQL database (if needed)
  - [ ] Create database on hosting provider (Neon, Supabase, Railway, etc.)
  - [ ] Get connection string
  - [ ] Run schema: `psql $DATABASE_URL < scripts/schema.sql`

### 2. Vercel Project Setup

- [ ] Create/login to Vercel account at https://vercel.com
- [ ] Import Git repository
- [ ] Configure project settings

### 3. Configure Environment Variables in Vercel

Go to Project Settings → Environment Variables and add:

#### Required Variables
- [ ] `NEXT_PUBLIC_WP_API_URL` = `https://dev.moreyeahs.com`
- [ ] `NEXT_PUBLIC_CHATBOT_API_URL` = `https://newchatbot.moreyeahs.com`
- [ ] `NEXT_PUBLIC_CHATBOT_CHAT_API_URL` = `https://newchatbot.moreyeahs.com/chat`
- [ ] `NEXT_PUBLIC_CHATBOT_HISTORY_API_URL` = `https://newchatbot.moreyeahs.com/history`
- [ ] `GMAIL_USER` = `digitalmoreyeahs@gmail.com`
- [ ] `GMAIL_APP_PASSWORD` = `[your-16-char-app-password]`

#### Optional Variables
- [ ] `DATABASE_URL` = `postgresql://user:pass@host:port/db` (only if using database)

**Important:** Set each variable for all three environments:
- Production ✓
- Preview ✓
- Development ✓

### 4. Local Testing

- [ ] Run `npm install` to ensure dependencies are installed
- [ ] Run `npm run build` to verify build succeeds
- [ ] Check for TypeScript errors
- [ ] Test contact form locally
- [ ] Test career application form locally

### 5. Code Quality

- [ ] Run `npm run lint` and fix any issues
- [ ] Remove console.logs (or ensure they're intentional)
- [ ] Check for TODO/FIXME comments
- [ ] Verify all images are optimized
- [ ] Check for hardcoded URLs (should use env variables)

## 🚀 Deployment Steps

### Option A: Automatic Deployment (Recommended)

1. [ ] Commit all changes: `git add .`
2. [ ] Create commit: `git commit -m "Ready for deployment"`
3. [ ] Push to main branch: `git push origin main`
4. [ ] Vercel will automatically deploy
5. [ ] Monitor deployment at https://vercel.com/dashboard

### Option B: Manual Deployment via Script

1. [ ] Run `deploy.bat`
2. [ ] Enter commit message when prompted
3. [ ] Wait for Vercel to deploy (~1-2 minutes)
4. [ ] Check deployment status in Vercel dashboard

### Option C: Vercel CLI

1. [ ] Install Vercel CLI: `npm i -g vercel`
2. [ ] Login: `vercel login`
3. [ ] Deploy: `vercel --prod`

## ✅ Post-Deployment Checklist

### 1. Verify Deployment

- [ ] Check deployment status in Vercel dashboard
- [ ] Visit production URL
- [ ] Check for any build errors in logs

### 2. Test Core Functionality

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Dark/light theme toggle works
- [ ] All pages load without errors
- [ ] Images load correctly
- [ ] Videos play correctly

### 3. Test Forms

- [ ] Contact form submits successfully
- [ ] Career application form works
- [ ] Resume upload works
- [ ] Email notifications are received at `digitalmoreyeahs@gmail.com`
- [ ] Data appears in Google Sheets (if configured)

### 4. Test WordPress Integration

- [ ] Blog posts load
- [ ] Case studies load
- [ ] Resources load
- [ ] Dynamic routes work

### 5. Performance & SEO

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify meta tags
- [ ] Check Open Graph images
- [ ] Test social media sharing

### 6. Cross-Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### 7. Mobile Responsiveness

- [ ] Test on mobile devices
- [ ] Check tablet view
- [ ] Verify touch interactions
- [ ] Test mobile navigation

## 🐛 Troubleshooting

### Build Fails

**Check:**
- [ ] Build logs in Vercel dashboard
- [ ] All dependencies in package.json
- [ ] TypeScript errors
- [ ] Environment variables are set

**Fix:**
```bash
# Test build locally
npm run build

# Check for errors
npm run lint
```

### Environment Variables Not Working

**Check:**
- [ ] Variables are set in Vercel dashboard
- [ ] Variables are set for correct environment
- [ ] Variable names match exactly (case-sensitive)
- [ ] No extra spaces in values

**Fix:**
- Redeploy after adding variables
- Check spelling and case

### Email Not Sending

**Check:**
- [ ] `GMAIL_USER` is correct
- [ ] `GMAIL_APP_PASSWORD` is 16 characters
- [ ] 2-Step Verification enabled on Gmail
- [ ] App password is valid

**Fix:**
- Regenerate app password
- Check deployment logs for errors

### Database Connection Issues

**Check:**
- [ ] `DATABASE_URL` format is correct
- [ ] Database is accessible
- [ ] Connection string includes password
- [ ] Database allows external connections

**Fix:**
- Test connection locally first
- Check database provider settings
- Verify IP whitelist settings

## 📊 Monitoring

After deployment, monitor:

- [ ] Vercel Analytics
- [ ] Error logs in Vercel dashboard
- [ ] Function logs
- [ ] Email delivery
- [ ] Form submissions

## 🔄 Rollback Plan

If deployment fails:

1. [ ] Check Vercel dashboard for previous successful deployment
2. [ ] Click "Redeploy" on last working version
3. [ ] Or revert Git commit: `git revert HEAD`
4. [ ] Push to trigger new deployment

## 📝 Notes

- Deployment typically takes 1-2 minutes
- Preview deployments are created for all branches
- Production deployment only happens on main branch
- Environment variables changes require redeployment

## ✅ Deployment Complete!

Once all checks pass:

- [ ] Update team on successful deployment
- [ ] Document any issues encountered
- [ ] Update this checklist if needed
- [ ] Celebrate! 🎉
