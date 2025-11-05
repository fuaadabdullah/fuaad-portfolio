# Portfolio Operations Manual

> **Private reference** — Quick links and operating rhythms for maintaining heyimfuaad.me

---

## Quick Links

### Development & Optimization

- **Next.js Metadata & OG**: [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- **Image optimization with next/image**: [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- **Core Web Vitals thresholds**: [Google Web Vitals](https://web.dev/vitals/)
- **WCAG 2.2 Quick Reference**: [W3C WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)

### SEO & Indexing

- **Next.js Sitemap**: [Next.js Sitemap Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- **Next.js robots.txt**: [Next.js Robots File](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- **Google Search Console**: [Search Console](https://search.google.com/search-console)
- **Submit Sitemap**: [Google Sitemap Guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- **Search Console Help**: [Coverage Reports](https://support.google.com/webmasters/answer/7440203)

### Deployment & Analytics

- **Vercel Deployment**: [Vercel Deployments](https://vercel.com/docs/deployments/overview)
- **Vercel Custom Domains**: [Custom Domains Guide](https://vercel.com/docs/projects/domains)
- **Vercel Analytics**: [Web Analytics](https://vercel.com/docs/analytics)
- **Vercel Speed Insights**: [Speed Insights](https://vercel.com/docs/speed-insights)
- **Plausible Integration**: [Plausible Analytics](https://plausible.io/docs)

### Testing & Validation

- **Rich Results Test**: [Google Rich Results](https://search.google.com/test/rich-results)
- **PageSpeed Insights**: [PSI Tool](https://pagespeed.web.dev/)
- **Lighthouse CI**: [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- **Twitter Card Validator**: [Twitter Cards](https://cards-dev.twitter.com/validator)
- **Meta Debugger**: [Facebook Debugger](https://developers.facebook.com/tools/debug/)

---

## Operating Rhythms

### Weekly (keep it tight)

**Portfolio & Services Maintenance**
- [ ] Review and update Portfolio projects if new work shipped
- [ ] Update Services blurbs if pricing or timelines changed
- [ ] Check for broken links (especially demo URLs)

**Performance Check**
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage (`https://heyimfuaad.me`)
- [ ] Verify Core Web Vitals meet thresholds:
  - **LCP** (Largest Contentful Paint): < 2.5s ✅
  - **FID** (First Input Delay): < 100ms ✅
  - **CLS** (Cumulative Layout Shift): < 0.1 ✅

### Monthly

**SEO & Indexing**
- [ ] Submit sitemap after major content changes:
  - Go to [Google Search Console](https://search.google.com/search-console)
  - Navigate to Sitemaps → Add new sitemap: `https://heyimfuaad.me/sitemap.xml`
  - Wait for processing (can take 24-48 hours)

**Search Console Review**
- [ ] Skim [Coverage Report](https://support.google.com/webmasters/answer/7440203) for indexing issues
- [ ] Check Core Web Vitals report for field data trends
- [ ] Review top queries and pages (understand what's driving traffic)

**Analytics Deep Dive**
- [ ] Review Vercel Analytics dashboard
- [ ] Identify top-performing content (blog posts, portfolio projects)
- [ ] Check bounce rates and time-on-page metrics

### Each Release

**Pre-Deployment Checklist**
- [ ] Run `pnpm build` locally to catch build errors
- [ ] Test new features in dev mode (`pnpm dev`)
- [ ] Verify responsive design (mobile, tablet, desktop)

**Post-Deployment Validation**
- [ ] Run [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) audit (all scores > 90)
  - Performance: ≥ 90
  - Accessibility: 100
  - Best Practices: ≥ 90
  - SEO: 100

**Accessibility Check**
- [ ] Test keyboard navigation (Tab, Shift+Tab, Enter, Space)
- [ ] Verify skip links work (`Skip to main content`)
- [ ] Check focus indicators are visible (green outline)
- [ ] Test with screen reader if major changes (VoiceOver on Mac: Cmd+F5)

**Social Media Preview**
- [ ] Verify OG image with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify OG image with [Meta Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check dynamic routes have correct metadata (`/portfolio/[slug]`, `/blog/[slug]`)

**Visual QA**
- [ ] Verify images load correctly (`/opengraph-image`, `/icon`, `/apple-icon`)
- [ ] Check no broken images or 404s
- [ ] Confirm dark theme renders correctly

---

## Quick Commands

### Local Development
```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start
```

### Deployment
```bash
# Commit and push (triggers Vercel auto-deploy)
git add -A
git commit -m "Your commit message"
git push
```

### Testing Routes Locally
```bash
# Test dynamic routes
open http://localhost:3000/portfolio/rizzk-calculator
open http://localhost:3000/blog/building-rizzk

# Test metadata routes
open http://localhost:3000/opengraph-image
open http://localhost:3000/icon
open http://localhost:3000/sitemap.xml
open http://localhost:3000/robots.txt
```

### Performance Debugging
```bash
# Check bundle size
pnpm build
# Look for large chunks in build output

# Analyze dependencies
npx npm-check-updates
```

---

## Content Update Workflow

### Adding a New Blog Post

1. Create MDX file in `content/blog/`:
   ```bash
   touch content/blog/your-slug.mdx
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: "2025-11-05"
   excerpt: "Brief description for SEO"
   category: "essay" | "release-note" | "tutorial"
   tags: ["tag1", "tag2"]
   ---
   ```

3. Write content using MDX (supports markdown + React components)

4. Build and verify:
   ```bash
   pnpm build
   # Check /blog/your-slug is generated
   ```

5. Deploy and submit sitemap (see Monthly rhythm)

### Adding a New Portfolio Project

1. Add project object to `data/projects.ts`:
   ```typescript
   {
     slug: "project-slug",
     title: "Project Name",
     tagline: "One-line description",
     description: "Full description...",
     tech: ["Tech1", "Tech2"],
     links: { live: "...", source: "..." },
     features: ["Feature 1", "Feature 2"],
     challenges: ["Challenge 1"],
     learnings: ["Learning 1"],
     timeline: "X weeks",
     role: "Solo Developer"
   }
   ```

2. Build and verify:
   ```bash
   pnpm build
   # Check /portfolio/project-slug is generated
   ```

3. Deploy and test OG preview

---

## Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

**Current Status**: ✅ All green (as of last check)
- LCP: ~2.0s
- FID: < 50ms
- CLS: 0.0

---

## Accessibility Quick Wins

- ✅ Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)
- ✅ Skip links for keyboard users
- ✅ ARIA labels on interactive elements
- ✅ Focus indicators (green outline)
- ✅ Color contrast ≥ 4.5:1 for normal text
- ✅ Keyboard navigation (no mouse-only interactions)
- ✅ Alt text on all images

---

## Emergency Contacts & Recovery

### Vercel Deployment Issues
- **Dashboard**: https://vercel.com/dashboard
- **Logs**: Check function logs for runtime errors
- **Rollback**: Use Vercel dashboard to instantly rollback to previous deployment

### Domain Issues
- **DNS Provider**: Namecheap (heyimfuaad.me)
- **Nameservers**: Vercel's nameservers (check Vercel domain settings)
- **Propagation Check**: https://dnschecker.org/

### Search Console Issues
- **Verification**: HTML file method (`/public/google0afeb16a6a97c38c.html`)
- **Re-verify**: Upload new verification file if needed
- **Support**: [Search Console Help](https://support.google.com/webmasters/)

### Git/GitHub Issues
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Force push (use with caution)
git push --force

# Restore deleted file
git checkout HEAD -- path/to/file
```

---

## Performance Budget

| Resource Type | Budget | Current |
|---------------|--------|---------|
| Total Page Weight | < 1 MB | ~500 KB ✅ |
| JavaScript Bundle | < 200 KB | ~150 KB ✅ |
| Images | < 500 KB | ~200 KB ✅ |
| Fonts | < 100 KB | ~0 KB ✅ (system fonts) |
| Time to Interactive | < 3.0s | ~2.5s ✅ |

---

## Notes & Reminders

- **Vercel auto-deploys** on every push to `main` branch
- **Sitemap updates** may take 24-48 hours to reflect in Search Console (CDN caching)
- **OG images** are dynamically generated at build time via `/opengraph-image.tsx`
- **Icons** are dynamically generated via `/icon.tsx` and `/apple-icon.tsx`
- **Analytics** are privacy-friendly (Vercel Analytics, no cookies)
- **Environment variables**: Set `NEXT_PUBLIC_SITE_URL=https://heyimfuaad.me` in Vercel

---

**Last Updated**: November 5, 2025
**Next Review**: December 5, 2025
