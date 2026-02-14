import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex', 'items-center', 'gap-2');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-[var(--color-accent)]');
  });

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-60', 'disabled:cursor-not-allowed');
  });

  it('is focusable by keyboard', () => {
    render(<Button>Click</Button>);
    const button = screen.getByRole('button', { name: /click/i });
    button.focus();
    expect(button).toHaveFocus();
  });
});
