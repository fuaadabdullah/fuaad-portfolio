import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../Input';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'text' },
  },
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValidation: Story = {
  args: {
    name: 'email',
    label: 'Email',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Invalid email address',
      },
    },
  },
};
