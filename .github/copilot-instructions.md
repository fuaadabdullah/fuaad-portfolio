---
description: Portfolio website development with GoblinOS platform integration
applyTo: '**'
---

## Project Overview

This is a **production-ready portfolio website** for Fuaad Abdullah, built with Next.js 15, TypeScript, and Tailwind CSS. It serves a dual purpose:

1. **Primary**: Professional portfolio showcasing projects, resume, and services
2. **Platform**: Real-world testbed for GoblinOS's web application management capabilities

## Current Project State

### ✅ Completed Features

- [x] Modern Next.js 15 App Router architecture
- [x] Responsive design with Tailwind CSS
- [x] SEO optimization (JSON-LD, OG images, sitemap)
- [x] Accessibility compliance (WCAG 2.1 AA)
- [x] Blog with MDX support
- [x] Portfolio projects showcase
- [x] Resume page with PDF generation
- [x] Services page
- [x] Dark mode by default
- [x] Vercel Analytics integration
- [x] Google Search Console setup
- [x] Reorganized file structure (Nov 2025)

### 🎯 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX for blog, Markdown for resume
- **Deployment**: Vercel
- **Package Manager**: pnpm
- **Analytics**: Vercel Analytics

## File Structure (Updated Nov 2025)

```text
fuaad-portfolio/
├── app/                    # Next.js App Router pages
├── components/            # Reusable React components
├── content/               # Markdown/MDX content (blog, resume)
├── data/                  # Static data (projects)
├── lib/                   # Utilities (blog parsing, SEO)
├── public/                # Static assets
├── scripts/               # Build automation
├── config/                # Configuration files (symlinked to root)
│   ├── .eslintrc.json
│   ├── postcss.config.js
│   ├── stylelint.config.cjs
│   └── tailwind.config.ts
└── docs/                  # Documentation
    ├── STRUCTURE.md       # Complete structure guide
    ├── DEPLOYMENT.md      # Deployment guide
    ├── ACCESSIBILITY.md   # A11y documentation
    ├── SEO_VALIDATION.md  # SEO best practices
    └── OPERATIONS.md      # Maintenance guide
```

**📖 See [docs/STRUCTURE.md](../docs/STRUCTURE.md) for complete documentation.**

## Development Guidelines

### Working with This Project

#### Content Updates

- **Blog posts**: Add `.md` files to `content/blog/`
- **Resume**: Edit `content/resume.md`
- **Projects**: Edit `data/projects.ts`
- **Services**: Edit `app/services/page.tsx`

#### Code Changes

- **Pages**: Add/edit in `app/` directory
- **Components**: Add to `components/` directory
- **Utilities**: Add to `lib/` directory
- **Configs**: Edit in `config/` directory (changes reflect via symlinks)

#### Running the Project

```bash
# Development
pnpm dev          # Start dev server at http://localhost:3000

# Build
pnpm build        # Production build
pnpm start        # Serve production build

# Scripts
pnpm generate-resume      # Generate resume PDF
pnpm process-headshot     # Process profile image
pnpm lint                 # Run ESLint
```

### Code Style & Best Practices

1. **TypeScript**: Use strict typing, no `any`
2. **Components**: Functional components with TypeScript
3. **Naming**: PascalCase for components, camelCase for utilities
4. **Imports**: Use `@/` alias for absolute imports
5. **Styling**: Tailwind utilities, avoid inline styles
6. **Accessibility**: Semantic HTML, ARIA labels where needed
7. **Performance**: Use Next.js Image component, lazy load when appropriate

### SEO Requirements

- All pages must have unique metadata
- Use JSON-LD schemas from `lib/seo.ts`
- OG images must be 1200x630px
- Include structured data for Person, WebSite, BlogPosting

### Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for all images
- High contrast ratios (4.5:1 minimum)

## GoblinOS Integration Strategy

### Dual Mission Approach

Every change should consider:

1. **Portfolio Goal**: Does this improve the website?
2. **Platform Goal**: Can GoblinOS automate this for other projects?

### GoblinOS Integration Points

#### ✅ Currently Integrated

- [x] Environment management via `portfolio_env.sh`
- [x] Dev server automation
- [x] Build automation

#### 🚧 Future Integration Opportunities

- [ ] Content deployment automation
- [ ] SEO validation automation
- [ ] Performance monitoring
- [ ] Dependency updates
- [ ] Health checks and smoke tests
- [ ] Multi-site management patterns

### GoblinOS Tools Available

From `ForgeMonorepo/GoblinOS`:

```bash
# Start development server
PORTFOLIO_DIR=/path/to/portfolio bash ../tools/portfolio_env.sh dev

# Run production build
PORTFOLIO_DIR=/path/to/portfolio bash ../tools/portfolio_env.sh build
```

**See**: `ForgeMonorepo/GoblinOS/goblins.yaml` for full tool registry

## AI Assistant Instructions

### When Working on This Project

1. **Read Documentation First**
   - Check `docs/STRUCTURE.md` for file organization
   - Review relevant docs in `docs/` before making changes

2. **Maintain Both Goals**
   - Implement portfolio features effectively
   - Document patterns that GoblinOS could automate

3. **Quality Standards**
   - Test builds with `pnpm build` before committing
   - Verify accessibility with Lighthouse
   - Check SEO with validation tools

4. **File Organization**
   - Keep files in appropriate directories
   - Update documentation when adding new patterns
   - Follow existing naming conventions

### Common Tasks

#### Adding a New Page

```bash
# 1. Create page in app/
app/new-page/page.tsx

# 2. Add metadata
export const metadata = { title: "...", description: "..." }

# 3. Update navigation
components/Navbar.tsx
```

#### Adding a Blog Post

```bash
# 1. Create MDX file
content/blog/my-post.md

# 2. Add frontmatter
---
title: "Post Title"
date: "2025-11-06"
description: "Post description"
---

# 3. Content auto-appears in /blog
```

#### Updating Configuration

```bash
# Edit files in config/ directory
config/tailwind.config.ts
config/.eslintrc.json

# Changes reflect automatically via symlinks
```

### GoblinOS Enhancement Suggestions

When you identify repetitive tasks or automation opportunities:

1. **Document the pattern** in relevant docs
2. **Note the manual steps** that could be automated
3. **Suggest GoblinOS enhancement** for future implementation
4. **Add to** `docs/GOBLIN_ENHANCEMENT_PLAN.md`

### Performance & Quality Checks

Before marking work complete:

- [ ] `pnpm build` succeeds without errors
- [ ] `pnpm lint` passes
- [ ] All pages have proper metadata
- [ ] Images are optimized
- [ ] Accessibility verified
- [ ] Mobile responsive
- [ ] Dark mode works

## Project Status Tracking

### Active Integration Points

- [x] Project initialization and scaffolding
- [x] Dependency management via workspace-health
- [x] Development server management
- [x] Build automation
- [ ] Asset optimization automation
- [ ] SEO validation automation
- [ ] Deployment automation
- [ ] Health monitoring automation

### Success Criteria

#### Portfolio Success ✅

- [x] Production-ready website deployed
- [x] SEO optimized and performant
- [x] Accessible and responsive
- [x] Easy to update content

#### GoblinOS Platform Success 🚧

- [x] Can manage development lifecycle
- [ ] Can scaffold similar projects
- [ ] Can automate full deployment
- [ ] Reusable patterns documented
- [ ] New plugins integrated into GoblinOS

## Important Notes

### For AI Assistants

- **Always check current state**: Review git status before making changes
- **Consider both objectives**: Portfolio quality + GoblinOS automation
- **Document patterns**: Keep `docs/` up to date
- **Test thoroughly**: Run builds and checks
- **Think scalable**: "How would GoblinOS manage 10 similar sites?"

### For Future Development

- **Content is king**: Easy content updates are priority
- **Performance matters**: Lighthouse scores 90+
- **Accessibility is required**: WCAG 2.1 AA compliance
- **SEO is essential**: Proper metadata and structured data
- **Automation is valuable**: Document automation opportunities

## Quick Reference

### Important Files

- **Main config**: `next.config.ts`, `tsconfig.json`
- **Styles**: `app/globals.css`, `config/tailwind.config.ts`
- **SEO**: `lib/seo.ts`, `app/layout.tsx`
- **Content**: `content/`, `data/projects.ts`

### Documentation

- **Structure**: `docs/STRUCTURE.md`
- **Deployment**: `docs/DEPLOYMENT.md`
- **Accessibility**: `docs/ACCESSIBILITY.md`
- **SEO**: `docs/SEO_VALIDATION.md`
- **Operations**: `docs/OPERATIONS.md`

### External Links

- **Live Site**: https://fuaadabdullah.com
- **GitHub**: https://github.com/fuaadabdullah/fuaad-portfolio
- **Vercel**: Auto-deploys from main branch

---

**Last Updated**: November 6, 2025  
**Project Status**: Production-ready, actively maintained  
**AI Assistant**: Follow these guidelines for all portfolio work

