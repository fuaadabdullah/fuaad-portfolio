# Deployment Guide: Vercel

This guide walks you through deploying your portfolio to Vercel.

## Prerequisites

- ✅ GitHub repository: `fuaadabdullah/fuaad-portfolio`
- ✅ All changes committed and pushed
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))

## Step 1: Commit and Push Your Changes

```bash
# Stage all changes
git add .

# Commit with a meaningful message
git commit -m "feat: add analytics, contact form, and performance optimizations"

# Push to GitHub
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended for First Deploy)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub account and find `fuaad-portfolio`
4. Click **"Import"**
5. Configure your project:
   - **Project Name**: `fuaad-portfolio` (or customize)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
6. **Environment Variables** (optional for now):
   - Skip for first deploy - we'll add these later
7. Click **"Deploy"**

### Option B: Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Deploy from your project directory
cd /Users/fuaadabdullah/Downloads/fuaad-portfolio-starter
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? fuaad-portfolio
# - Directory? ./
# - Override settings? No
```

## Step 3: Post-Deployment Configuration

### 3.1 Enable Analytics

1. Go to your project dashboard on Vercel
2. Click on the **"Analytics"** tab
3. Click **"Enable Analytics"**
4. Analytics are now active! (Already integrated via `@vercel/analytics`)

### 3.2 Add Custom Domain

1. Go to your project **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `heyimfuaad.com`)
4. Vercel will provide DNS records to add at your domain registrar:
   - **Option A (Recommended)**: Point nameservers to Vercel
   - **Option B**: Add A/CNAME records manually

**DNS Configuration Example** (if using A/CNAME):
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait for DNS propagation (usually 5-60 minutes)

### 3.3 Set Environment Variables (Post-Domain Setup)

1. Go to **Settings** → **Environment Variables**
2. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://heyimfuaad.com` | Production |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID | Production, Preview |

3. Click **"Save"**
4. Redeploy to apply changes (go to **Deployments** → click **"•••"** → **"Redeploy"**)

## Step 4: Update Formspree Form ID

1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Copy your form ID (looks like `xyzabc123`)
4. Update `app/services/page.tsx`:
   ```tsx
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Replace `YOUR_FORM_ID` with your actual ID
5. Commit and push the change

## Step 5: Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"Domain"** property type
4. Enter your domain: `heyimfuaad.com`
5. Verify ownership (DNS TXT record method):
   - Copy the TXT record from Google
   - Add it to your DNS settings
   - Click **"Verify"**
6. Once verified, submit your sitemap:
   - Go to **Sitemaps** in the left sidebar
   - Enter: `https://heyimfuaad.com/sitemap.xml`
   - Click **"Submit"**

## Step 6: Final Checklist

After deployment, verify:

- [ ] Site loads at your Vercel URL (e.g., `fuaad-portfolio.vercel.app`)
- [ ] Custom domain works (if configured)
- [ ] Analytics are tracking (check Vercel Analytics tab)
- [ ] Contact form works (test submission)
- [ ] All pages load correctly (`/`, `/portfolio`, `/resume`, `/services`)
- [ ] OG images display in social shares
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] Resume PDF downloads correctly

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors locally: `pnpm build`

### Environment Variables Not Working
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding/changing environment variables
- Check that variables are set for the correct environment (Production/Preview)

### Domain Not Working
- Wait for DNS propagation (can take up to 48 hours)
- Verify DNS records at [dnschecker.org](https://dnschecker.org)
- Check SSL certificate status in Vercel dashboard

### Analytics Not Tracking
- Analytics only work in production (not in dev mode)
- Check that `<Analytics />` component is in `app/layout.tsx`
- Wait 24-48 hours for initial data to appear

## Continuous Deployment

Once set up, every push to your `main` branch will automatically:
1. Trigger a new build on Vercel
2. Deploy to production (after successful build)
3. Update your live site

Preview deployments are created for pull requests automatically.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Analytics Guide](https://vercel.com/docs/analytics)
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)
