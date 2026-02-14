import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button, ButtonProps } from '../base/Button';

const meta: Meta<ButtonProps> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    onClick: fn(),
    children: 'Click me',
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
