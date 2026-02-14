import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders with default props', () => {
    render(<Heading>Default Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Default Heading');
  });

  it('renders correct heading level', () => {
    render(<Heading level={2}>H2 Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<Heading size="lg">Large Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-[1.125rem]');
  });

  it('applies weight classes correctly', () => {
    render(<Heading weight="bold">Bold Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('font-bold');
  });
});