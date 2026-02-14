import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heading, HeadingProps } from '../base/Heading';

const meta: Meta<HeadingProps> = {
  title: 'Design System/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'heading-order',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Heading Text',
  },
};

export default meta;
type Story = StoryObj<HeadingProps>;

export const H1: Story = {
  args: {
    level: 1,
    size: '3xl',
    weight: 'bold',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    size: '2xl',
    weight: 'semibold',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    size: 'xl',
    weight: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    weight: 'normal',
  },
};
