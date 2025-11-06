# Fuaad Abdullah — Portfolio Website

> A modern, production-ready portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

**Finance Major • Freelance Developer • Amateur Daytrader**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fuaadabdullah/fuaad-portfolio)

## ✨ Features

- 🎨 **Modern Design**: Clean, professional interface with dark mode
- ⚡ **Optimized Performance**: Built with Next.js 15 App Router for optimal speed
- 📱 **Fully Responsive**: Seamless experience across all devices
- ♿ **Accessible**: WCAG 2.1 AA compliant with semantic HTML
- 🔍 **SEO Optimized**: JSON-LD structured data, OG images, sitemap
- 🎯 **Type Safe**: Full TypeScript coverage
- 📊 **Analytics Ready**: Vercel Analytics integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (20+ recommended)
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/fuaadabdullah/fuaad-portfolio.git
cd fuaad-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fuaad-portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog with MDX support
│   ├── portfolio/         # Portfolio projects showcase
│   ├── resume/            # Resume page
│   └── services/          # Services offered
├── components/            # Reusable React components
├── content/               # Markdown content (blog, resume, projects)
│   └── blog/             # Blog posts in MDX
├── data/                  # Static data (projects, etc.)
├── lib/                   # Utility functions and helpers
├── public/                # Static assets (images, PDFs, etc.)
├── scripts/               # Build and maintenance scripts
├── config/                # Configuration files
│   ├── .eslintrc.json    # ESLint configuration
│   ├── postcss.config.js # PostCSS configuration
│   └── tailwind.config.ts # Tailwind CSS configuration
└── docs/                  # Documentation files
    ├── DEPLOYMENT.md      # Deployment guide
    ├── ACCESSIBILITY.md   # Accessibility features
    ├── SEO_VALIDATION.md  # SEO best practices
    └── OPERATIONS.md      # Maintenance guide
```

See [docs/STRUCTURE.md](./docs/STRUCTURE.md) for complete structure documentation.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX for blog posts
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel (recommended)
- **Package Manager**: pnpm

## 📝 Content Management

### Update Resume

Edit `content/resume.md` with your information. The PDF is auto-generated at build time.

### Add Blog Posts

Create a new MDX file in `content/blog/`:

```bash
content/blog/my-new-post.md
```

### Add Projects

Edit `data/projects.ts` to add/update portfolio projects.

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Update Site Metadata

Edit `app/layout.tsx` to update:
- Site title and description
- Open Graph images
- Social media links

## 📦 Build & Deploy

### Local Build

```bash
# Build for production
pnpm build

# Run production server
pnpm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fuaadabdullah/fuaad-portfolio)

Or manually:

```bash
# Test build
./deploy.sh

# Push to GitHub
git push origin main

# Deploy on Vercel (auto-deploys on push)
```

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🧪 Quality Assurance

### Performance Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- High contrast mode

See [docs/ACCESSIBILITY.md](./docs/ACCESSIBILITY.md) for details.

## 🤖 GoblinOS Integration

This portfolio integrates with **GoblinOS** for automated development workflows:

```bash
cd ForgeMonorepo/GoblinOS

# Start dev server via GoblinOS
PORTFOLIO_DIR=/path/to/portfolio bash ../tools/portfolio_env.sh dev

# Run build via GoblinOS
PORTFOLIO_DIR=/path/to/portfolio bash ../tools/portfolio_env.sh build
```

See [docs/GOBLIN_ENHANCEMENT_PLAN.md](./docs/GOBLIN_ENHANCEMENT_PLAN.md) for automation details.

## 📚 Documentation

- [📖 Deployment Guide](./docs/DEPLOYMENT.md)
- [♿ Accessibility Features](./docs/ACCESSIBILITY.md)
- [🔍 SEO Validation](./docs/SEO_VALIDATION.md)
- [🛠️ Operations Guide](./docs/OPERATIONS.md)
- [📁 Project Structure](./docs/STRUCTURE.md)

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome! Feel free to open an issue.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 🔗 Links

- **Live Site**: [https://fuaadabdullah.com](https://fuaadabdullah.com)
- **GitHub**: [@fuaadabdullah](https://github.com/fuaadabdullah)
- **LinkedIn**: [Fuaad Abdullah](https://linkedin.com/in/fuaadabdullah)

---

**Built with ❤️ by Fuaad Abdullah**

