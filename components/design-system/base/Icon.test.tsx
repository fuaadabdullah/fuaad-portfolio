import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    render(<Icon name="Heart" />);
    const icon = screen.getByTestId('heart-icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<Icon name="Star" size="lg" />);
    const icon = document.querySelector('svg');
    expect(icon).toHaveClass('w-6', 'h-6');
  });

  it('handles invalid icon name', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Icon name="InvalidIcon" />);
    expect(consoleWarn).toHaveBeenCalledWith('Icon "InvalidIcon" not found in Lucide icons');
    consoleWarn.mockRestore();
  });
});
