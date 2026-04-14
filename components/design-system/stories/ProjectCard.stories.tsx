import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectCard from '../../ProjectCard';
import { Project } from '../../../data/projects';

const sampleProject: Project = {
  slug: "sample-project",
  title: "Sample Project",
  tagline: "A sample project for demonstration",
  description: "This is a sample project description.",
  results: [
    { label: "conversion lift", value: "18%", sourceLabel: "analytics" },
    { label: "delivery timeline", value: "3 weeks", sourceLabel: "delivery scope" },
    { label: "weekly active users", value: "1.2k", sourceLabel: "product metrics" },
  ],
  tech: ["React", "TypeScript", "Tailwind"],
  links: {
    live: "https://example.com",
    source: "https://github.com/example",
  },
  proofMedia: [
    {
      type: "gif",
      src: "/projects/demos/sample-project.gif",
      width: 1280,
      height: 720,
      alt: "Sample project demo",
      status: "pending",
    },
    {
      type: "image",
      src: "/sample-image.png",
      width: 800,
      height: 600,
      alt: "Sample project image",
      status: "ready",
    },
    {
      type: "image",
      src: "/sample-image-2.png",
      width: 800,
      height: 600,
      alt: "Second sample project image",
      status: "pending",
    },
  ],
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
