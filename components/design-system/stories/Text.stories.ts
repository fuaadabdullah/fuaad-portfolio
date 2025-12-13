import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text, TextProps } from '../base/Text';

const meta: Meta<TextProps> = {
  title: 'Design System/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    variant: {
      control: { type: 'select' },
      options: ['body', 'muted', 'accent'],
    },
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Sample text content',
  },
};

export default meta;
type Story = StoryObj<TextProps>;

export const Body: Story = {
  args: {
    variant: 'body',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    weight: 'medium',
  },
};

export const AsSpan: Story = {
  args: {
    as: 'span',
  },
};