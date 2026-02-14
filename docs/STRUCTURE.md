# Project Structure Documentation

This document provides a comprehensive overview of the portfolio website's file organization and architecture.

## 📁 Directory Structure

```
fuaad-portfolio/
├── .github/                      # GitHub specific files
│   └── copilot-instructions.md   # AI assistant instructions
│
├── app/                          # Next.js App Router (Pages & Layouts)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── robots.ts                # Robots.txt generator
│   ├── sitemap.ts               # Sitemap generator
│   ├── opengraph-image.tsx      # OG image generator
│   ├── twitter-image.tsx        # Twitter card image
│   ├── icon.tsx                 # Favicon generator
│   ├── apple-icon.tsx           # Apple touch icon
│   │
│   ├── about/                   # About page
│   │   └── page.tsx
│   │
│   ├── blog/                    # Blog section
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/             # Dynamic blog post routes
│   │       └── page.tsx
│   │
│   ├── portfolio/               # Portfolio projects
│   │   ├── page.tsx            # Projects listing
│   │   └── [slug]/             # Dynamic project routes
│   │       └── page.tsx
│   │
│   ├── resume/                  # Resume page
│   │   └── page.tsx
│   │
│   └── services/                # Services page
│       └── page.tsx
│
├── components/                   # Reusable React Components
│   ├── Badge.tsx                # Badge component for tags
│   ├── BlogCTA.tsx              # Call-to-action for blog
│   ├── Button.tsx               # Button component
│   ├── Card.tsx                 # Card component
│   ├── Footer.tsx               # Site footer
│   ├── JsonLd.tsx               # JSON-LD schema component
│   ├── LinkedInBadge.tsx        # LinkedIn profile badge
│   ├── Navbar.tsx               # Navigation bar
│   ├── ProjectCard.tsx          # Project showcase card
│   └── ServiceCard.tsx          # Service offering card
│
├── content/                      # Content Files (Markdown/MDX)
│   ├── resume.md                # Resume content
│   ├── README.md                # Content directory guide
│   └── blog/                    # Blog posts
│       └── *.md                 # Individual blog posts
│
├── data/                        # Static Data
│   └── projects.ts              # Portfolio projects data
│
├── lib/                         # Utility Functions & Helpers
│   ├── blog.ts                  # Blog utilities (MDX parsing)
│   └── seo.ts                   # SEO utilities (JSON-LD schemas)
│
├── public/                      # Static Assets
│   ├── Fuaad_Abdullah_Resume.pdf # Resume PDF
│   ├── robots.txt               # Robots file
│   ├── google*.html             # Google Search Console verification
│   └── images/                  # Images and assets
│
├── scripts/                     # Build & Automation Scripts
│   ├── capture-rizzk-screenshot.js  # Screenshot automation
│   ├── generate-resume-pdf.js       # Resume PDF generation
│   └── process-headshot.js          # Image processing
│
├── config/                      # Configuration Files
│   ├── .eslintrc.json          # ESLint configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── stylelint.config.cjs    # Stylelint configuration
│   └── tailwind.config.ts      # Tailwind CSS configuration
│
├── docs/                        # Documentation
│   ├── STRUCTURE.md            # This file
│   ├── DEPLOYMENT.md           # Deployment guide
│   ├── ACCESSIBILITY.md        # Accessibility documentation
│   ├── SEO_VALIDATION.md       # SEO best practices
│   ├── OPERATIONS.md           # Operations & maintenance
│   ├── GOBLIN_ENHANCEMENT_PLAN.md  # GoblinOS integration
│   ├── OG_IMAGES_ENHANCEMENT.md    # OG image optimization
│   └── SEARCH_CONSOLE_SETUP.md     # Search Console setup
│
├── types/                       # TypeScript Type Definitions
│   └── global.d.ts             # Global type declarations
│
├── .env.local.example          # Environment variables template
├── .gitignore                  # Git ignore rules
├── deploy.sh                   # Deployment script
├── mdx-components.tsx          # MDX component overrides
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & scripts
├── pnpm-lock.yaml              # pnpm lock file
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project overview
```

## 🎯 Key Directories Explained

### `/app` - Next.js App Router

The heart of the application using Next.js 15's App Router pattern:

- **`layout.tsx`**: Root layout with global metadata, fonts, and providers
- **`page.tsx`**: Home page component
- **`globals.css`**: Global CSS styles and Tailwind directives
- **Route folders**: Each folder represents a route (e.g., `/about`, `/blog`)
- **Dynamic routes**: `[slug]` folders for dynamic content (blog posts, projects)

### `/components` - React Components

Reusable UI components following atomic design principles:

- **UI Components**: Badge, Button, Card
- **Layout Components**: Navbar, Footer
- **Feature Components**: ProjectCard, ServiceCard, BlogCTA
- **Utility Components**: JsonLd for structured data

### `/content` - Markdown Content

Content files in Markdown/MDX format:

- **`resume.md`**: Resume content (converted to PDF at build time)
- **`blog/`**: Blog posts with frontmatter metadata
- Allows content updates without code changes

### `/data` - Static Data

TypeScript files containing structured data:

- **`projects.ts`**: Portfolio projects with metadata
- Type-safe data that can be imported throughout the app

### `/lib` - Utilities & Helpers

Utility functions and helper modules:

- **`blog.ts`**: MDX parsing, frontmatter extraction
- **`seo.ts`**: JSON-LD schema generation for SEO

### `/public` - Static Assets

Files served directly from the root:

- **PDFs**: Resume and downloadable documents
- **Images**: Photos, screenshots, OG images
- **Verification files**: Google Search Console, etc.

### `/scripts` - Automation

Node.js scripts for build-time tasks:

- **`generate-resume-pdf.js`**: Convert markdown resume to PDF
- **`process-headshot.js`**: Optimize profile images
- **`capture-rizzk-screenshot.js`**: Generate project screenshots

### `/config` - Configuration

All configuration files organized in one place:

- **ESLint**: Code linting rules
- **PostCSS**: CSS processing
- **Tailwind**: Utility-first CSS framework config
- **Stylelint**: CSS linting (optional)

> **Note**: Config files are symlinked to the root for tool compatibility

### `/docs` - Documentation

Comprehensive project documentation:

- **Technical guides**: Deployment, operations
- **Best practices**: SEO, accessibility
- **Enhancement plans**: GoblinOS integration, OG images

## 🔄 Data Flow

### Content → Page Flow

```
content/blog/my-post.md
    ↓ (parsed by lib/blog.ts)
app/blog/[slug]/page.tsx
    ↓ (rendered)
HTML Page
```

### Data → Component Flow

```
data/projects.ts
    ↓ (imported)
app/portfolio/page.tsx
    ↓ (maps to)
components/ProjectCard.tsx
    ↓ (rendered)
Project Grid
```

## 🎨 Styling Architecture

### Global Styles

- **`app/globals.css`**: CSS custom properties, reset, base styles
- Uses Tailwind CSS for utility-first styling
- Dark mode by default with `dark` class

### Component Styles

- Tailwind utility classes directly in components
- Custom components in `components/` directory
- Consistent design system via Tailwind config

## 🚀 Build Process

### Development

```bash
pnpm dev
# → Next.js dev server with hot reload
# → http://localhost:3000
```

### Production Build

```bash
pnpm build
# 1. TypeScript compilation
# 2. Next.js optimized build
# 3. Static generation where possible
# 4. Image optimization
# 5. CSS minification
```

### Scripts Execution

Build-time scripts run automatically:

- Resume PDF generation
- OG image creation
- Sitemap generation

## 📝 File Naming Conventions

### Pages (App Router)

- `page.tsx` - Route entry point
- `layout.tsx` - Layout for route segment
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 UI

### Components

- PascalCase: `ProjectCard.tsx`
- Descriptive names: `LinkedInBadge.tsx`

### Content

- Kebab-case: `my-blog-post.md`
- Lowercase with hyphens

### Utilities

- camelCase: `blog.ts`, `seo.ts`

## 🔧 Configuration Files

### Root Level Configs

- **`next.config.ts`**: Next.js framework config
- **`tsconfig.json`**: TypeScript compiler options
- **`package.json`**: Dependencies and scripts

### Config Directory

- **`.eslintrc.json`**: Linting rules
- **`postcss.config.js`**: CSS processing
- **`tailwind.config.ts`**: Design system
- **`stylelint.config.cjs`**: CSS linting

## 🔐 Environment Variables

- **`.env.local`**: Local development (gitignored)
- **`.env.local.example`**: Template for setup
- **Vercel**: Production env vars set in dashboard

Required variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📦 Dependencies

### Production

- `next`: Framework
- `react` & `react-dom`: UI library
- `@mdx-js/*`: Markdown/JSX content
- `tailwindcss`: Styling
- `framer-motion`: Animations
- `lucide-react`: Icons

### Development

- `typescript`: Type safety
- `eslint`: Code quality
- `@types/*`: Type definitions

## 🎯 Best Practices

### Adding New Pages

1. Create folder in `app/`
2. Add `page.tsx`
3. Define metadata
4. Update navigation in `components/Navbar.tsx`

### Adding Blog Posts

1. Create `.md` file in `content/blog/`
2. Add frontmatter (title, date, description)
3. Write content in Markdown/MDX
4. File will auto-appear in blog listing

### Adding Projects

1. Add entry to `data/projects.ts`
2. Include image in `public/`
3. Project auto-appears in portfolio

### Updating Content

- Resume: Edit `content/resume.md`
- Services: Edit `app/services/page.tsx`
- About: Edit `app/about/page.tsx`

## 🔄 Migration Notes

### Recent Reorganization (Nov 2025)

**Changes made**:

1. ✅ Moved all documentation to `docs/`
2. ✅ Consolidated `portfolio/` into `content/`
3. ✅ Organized configs into `config/` directory
4. ✅ Created symlinks for config compatibility
5. ✅ Updated README with new structure

**Benefits**:

- 📁 Clearer organization
- 📚 Centralized documentation
- ⚙️ Grouped configuration files
- 🎯 Easier to navigate for new contributors

## 🤝 Contributing

When adding files:

- Follow existing naming conventions
- Place files in appropriate directories
- Update this document if adding new patterns
- Add TypeScript types for data structures

## 📚 Additional Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated**: November 6, 2025  
**Maintained by**: Fuaad Abdullah
