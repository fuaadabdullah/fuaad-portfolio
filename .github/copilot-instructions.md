---
description: Portfolio website development with GoblinOS platform integration
applyTo: '**'
---

## Project Dual Mission

This portfolio website serves **two critical objectives**:

1. **Primary Goal**: Build a production-ready portfolio website for Fuaad Abdullah
2. **Platform Goal**: Develop and enhance GoblinOS's ability to platform websites and applications

### GoblinOS Integration Strategy

Throughout ALL phases of portfolio development, we will:

- **Use GoblinOS tooling** for development, deployment, and maintenance tasks
- **Document integration patterns** that can be reused for future web applications
- **Enhance GoblinOS plugins** to better support Next.js and web application workflows
- **Create reusable automation** for common web development tasks
- **Test GoblinOS's platform capabilities** in a real-world production scenario

## Development Philosophy

### Always Consider Both Objectives

When implementing features or making decisions:
1. ✅ **Does this work for the portfolio?** (immediate goal)
2. ✅ **Can GoblinOS automate/platform this?** (platform enhancement goal)
3. ✅ **Is this pattern reusable for other projects?** (scalability)

### GoblinOS Enhancement Opportunities

Look for opportunities to enhance GoblinOS in these areas:

#### 1. Web Application Lifecycle Management
- Project scaffolding and initialization
- Dependency management and updates
- Build and deployment automation
- Health checks and smoke testing for web apps

#### 2. Development Workflow Automation
- Hot reload and dev server management
- Asset optimization (images, fonts, etc.)
- SEO and metadata validation
- Performance monitoring

#### 3. Content Management
- Markdown to component generation
- Static asset management
- Resume and portfolio data synchronization

#### 4. Deployment and Platform Integration
- Integration with hosting platforms (Vercel, Azure Static Web Apps, etc.)
- CI/CD pipeline generation
- Environment configuration management
- Domain and DNS management

#### 5. Quality Assurance
- Accessibility testing automation
- Performance benchmarking
- SEO validation
- Link checking and content validation

## Portfolio Project Context

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Content**: Markdown-based (resume, projects)
- **SEO**: Next.js Metadata API, JSON-LD structured data

### Key Features to Implement
- Responsive portfolio page with project showcases
- Resume page with downloadable PDF
- Services page
- SEO optimization with OG images
- Performance optimization
- Accessibility compliance

## GoblinOS Integration Checkpoints

For each major feature or phase:

### 1. **Before Implementation**
- Can GoblinOS scaffold this automatically?
- What configuration files need to be managed?
- Are there reusable patterns we can extract?

### 2. **During Implementation**
- Document manual steps that could be automated
- Identify repetitive tasks for goblin automation
- Test GoblinOS workspace-health checks

### 3. **After Implementation**
- Create GoblinOS plugin/enhancement if pattern is reusable
- Update GoblinOS documentation with new capabilities
- Add to GoblinOS test suite if applicable

## Best Practices

### Code Organization
- Keep portfolio code clean and well-documented
- Extract reusable patterns into shared utilities
- Document GoblinOS integration points clearly

### GoblinOS Plugin Development
- When creating new GoblinOS features, follow existing plugin patterns
- Test in the portfolio context before generalizing
- Document new capabilities in GoblinOS README

### Documentation Requirements
- Document both portfolio features AND GoblinOS enhancements
- Keep a log of automation opportunities discovered
- Create runbooks for common tasks

## Success Criteria

### Portfolio Success
- ✅ Production-ready website deployed
- ✅ SEO optimized and performant
- ✅ Accessible and responsive
- ✅ Easy to update content

### GoblinOS Platform Success
- ✅ Can scaffold similar web projects automatically
- ✅ Can manage full development lifecycle
- ✅ Can deploy and maintain web applications
- ✅ Reusable patterns documented and tested
- ✅ New plugins/enhancements integrated into GoblinOS

## Active Integration Points

Track how we're using GoblinOS for this project:

- [ ] Project initialization and scaffolding
- [ ] Dependency management via workspace-health
- [ ] Development server management
- [ ] Build automation
- [ ] Asset optimization
- [ ] SEO validation
- [ ] Deployment automation
- [ ] Health monitoring

## Notes for AI Assistant

- Always consider BOTH objectives when proposing solutions
- Suggest GoblinOS enhancements when you identify automation opportunities
- Flag manual/repetitive tasks as candidates for goblin automation
- Reference GoblinOS plugin architecture when relevant
- Think about scalability: "How would GoblinOS platform 10 similar sites?"
