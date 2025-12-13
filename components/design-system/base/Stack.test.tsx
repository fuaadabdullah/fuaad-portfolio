import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders with default props', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const stack = screen.getByText('Item 1').parentElement;
    expect(stack).toHaveClass('flex', 'flex-col', 'items-stretch', 'justify-start');
  });

  it('applies direction classes correctly', () => {
    render(
      <Stack direction="row">
        <div>Item</div>
      </Stack>
    );
    const stack = screen.getByText('Item').parentElement;
    expect(stack).toHaveClass('flex-row');
  });

  it('applies gap classes correctly', () => {
    render(
      <Stack gap="lg">
        <div>Item</div>
      </Stack>
    );
    const stack = screen.getByText('Item').parentElement;
    expect(stack).toHaveClass('gap-[1.5rem]');
  });

  it('handles wrap prop', () => {
    render(
      <Stack wrap>
        <div>Item</div>
      </Stack>
    );
    const stack = screen.getByText('Item').parentElement;
    expect(stack).toHaveClass('flex-wrap');
  });
});