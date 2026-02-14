import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Default text</Text>);
    const text = screen.getByText('Default text');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  it('renders as different element', () => {
    render(<Text as="span">Span text</Text>);
    const text = screen.getByText('Span text');
    expect(text.tagName).toBe('SPAN');
  });

  it('applies size classes correctly', () => {
    render(<Text size="lg">Large text</Text>);
    const text = screen.getByText('Large text');
    expect(text).toHaveClass('text-[1.125rem]');
  });

  it('applies variant classes correctly', () => {
    render(<Text variant="muted">Muted text</Text>);
    const text = screen.getByText('Muted text');
    expect(text).toHaveClass('text-[#ffffff80]');
  });
});