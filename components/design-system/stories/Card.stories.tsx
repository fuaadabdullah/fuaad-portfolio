import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Card from '../../Card';
import { Text } from '../base/Text';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-complementary-is-top-level',
            enabled: false,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'featured'],
    },
  },
  args: {
    children: <Text>Card content</Text>,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    children: <Text size="sm">Compact card</Text>,
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
    children: <Text>Featured card with enhanced styling</Text>,
  },
};
