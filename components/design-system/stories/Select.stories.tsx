import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';
import { Select } from '../../Select';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
            id: 'select-name',
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
  },
  args: {
    name: 'category',
    label: 'Category',
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithValidation: Story = {
  args: {
    name: 'category',
    label: 'Category',
    options: sampleOptions,
    validation: {
      required: 'Please select a category',
    },
  },
};
