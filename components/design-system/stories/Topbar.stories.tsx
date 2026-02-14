import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Topbar from '../../Topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Components/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-one-main',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {};
