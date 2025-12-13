import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge, BadgeProps } from '../base/Badge';

const meta: Meta<BadgeProps> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'outline'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};