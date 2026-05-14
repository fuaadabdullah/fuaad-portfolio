import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ServiceCard from '../../ServiceCard';

type Service = { slug: string; title: string; price: string; description: string };

const sampleService: Service = {
  slug: "ux-polish",
  title: "UX/UI Polish Sprint",
  price: "$450",
  description: "One-week polish pass for an existing app to tighten spacing, typography, accessibility, and overall trust.",
};

const meta: Meta<typeof ServiceCard> = {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Service offering card displaying title, description, and pricing. Part of the services portfolio showcase.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    service: {
      description: 'Service object with slug, title, price, and description',
    },
  },
  args: {
    service: sampleService,
  },
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {};

export const WebsiteLaunch: Story = {
  args: {
    service: {
      slug: "portfolio-sites",
      title: "Website Launch Package",
      price: "$950",
      description: "Seven-page launch-ready website with SEO setup, responsive design, and modern tech stack. Perfect for portfolios, freelancers, and service businesses.",
    },
  },
};

export const MVPBootstrap: Story = {
  args: {
    service: {
      slug: "mvp-bootstrap",
      title: "MVP Bootstrap Sprint",
      price: "$1,200",
      description: "Two-week sprint to go from idea to deployed MVP. Scope negotiation, tech stack selection, and core feature shipping included.",
    },
  },
};

export const WithLongTitle: Story = {
  args: {
    service: {
      slug: "custom",
      title: "Custom Web App Development with Advanced Features and Integrations",
      price: "$2,500+",
      description: "Bespoke application development tailored to your specific business needs and workflows.",
    },
  },
};

export const Multiple: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <ServiceCard
        service={{
          slug: "ux-polish",
          title: "UX/UI Polish Sprint",
          price: "$450",
          description: "One-week polish pass for an existing app to tighten spacing, typography, accessibility, and overall trust.",
        }}
      />
      <ServiceCard
        service={{
          slug: "portfolio-sites",
          title: "Website Launch Package",
          price: "$950",
          description: "Seven-page launch-ready website with SEO setup, responsive design, and modern tech stack.",
        }}
      />
      <ServiceCard
        service={{
          slug: "mvp-bootstrap",
          title: "MVP Bootstrap Sprint",
          price: "$1,200",
          description: "Two-week sprint to go from idea to deployed MVP with core features and deployment included.",
        }}
      />
    </div>
  ),
};
