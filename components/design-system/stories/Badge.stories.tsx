import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from '../base/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small label used to highlight information. Supports multiple variants: default (subtle), success (accent color), and outline (bordered).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'outline'],
      description: 'Visual style variant',
    },
    className: { control: 'text', description: 'Additional CSS classes for customization' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Badge',
    variant: 'success',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
  },
};

export const WithLongText: Story = {
  args: {
    children: 'Very long badge text that might wrap',
    variant: 'default',
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="flex gap-3 flex-wrap justify-center max-w-md">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="default">React</Badge>
      <Badge variant="success">TypeScript</Badge>
      <Badge variant="outline">Next.js</Badge>
    </div>
  ),
};
