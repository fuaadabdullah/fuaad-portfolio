import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectCard from '../../ProjectCard';
import { Project } from '../../../data/projects';

const sampleProject: Project = {
  slug: "sample-project",
  title: "Sample Project",
  tagline: "A sample project for demonstration",
  description: "This is a sample project description.",
  tech: ["React", "TypeScript", "Tailwind"],
  links: {
    live: "https://example.com",
    source: "https://github.com/example",
  },
  image: {
    src: "/sample-image.png",
    width: 800,
    height: 600,
    alt: "Sample project image",
  },
};

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'image-alt',
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
      options: ['default', 'compact', 'featured'],
    },
  },
  args: {
    project: sampleProject,
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
  },
};
