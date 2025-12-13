# How to Add a Component

This checklist will help you add a new component to the `components/` or `components/design-system/` directories in a consistent, maintainable, and accessible way.

## Component Checklist

- [ ] **Component Implementation**
  - Create your component in `components/` or `components/design-system/base/`.
  - Use TypeScript and follow existing code style.
  - Export the component for use in the app.

- [ ] **Types**
  - Define clear and strict prop types (interfaces or types).
  - Export types if they are useful for consumers.

- [ ] **Storybook Story**
  - Add a story in `components/design-system/stories/` for your component.
  - Demonstrate all major states, variants, and edge cases.
  - Use controls for props where possible.

- [ ] **Tests**
  - Add tests in `components/design-system/base/` (e.g., `Button.test.tsx`).
  - Cover rendering, props, and interaction logic.
  - Test accessibility (see below).

- [ ] **Documentation**
  - Add or update an `.mdx` doc in `components/design-system/docs/`.
  - Document usage, props, and best practices.
  - Include code examples and screenshots if helpful.

- [ ] **Accessibility**
  - Ensure keyboard navigation and focus management.
  - Use semantic HTML and ARIA attributes as needed.
  - Test with screen readers and color contrast tools.
  - Document accessibility features and limitations in the docs.

---

## Example Checklist for `Button`

- [x] `components/design-system/base/Button.tsx` (component)
- [x] `components/design-system/base/Button.test.tsx` (tests)
- [x] `components/design-system/stories/Button.stories.tsx` (storybook)
- [x] `components/design-system/docs/Button.mdx` (docs)
- [x] Accessibility: Focus ring, ARIA, keyboard support

---

**Tip:** Review existing components for patterns and conventions. Consistency is key!
