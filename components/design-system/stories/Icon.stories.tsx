import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon, IconProps } from '../base/Icon';

const meta: Meta<IconProps> = {
  title: 'Design System/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-hidden-focus',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['Heart', 'Star', 'User', 'Home', 'Settings'], // Sample options
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    name: 'Heart',
  },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Heart: Story = {
  args: {
    name: 'Heart',
  },
};

export const Star: Story = {
  args: {
    name: 'Star',
  },
};

export const Small: Story = {
  args: {
    name: 'User',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'Home',
    size: 'xl',
  },
};
