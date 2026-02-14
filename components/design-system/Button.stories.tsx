import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './base/Button';

const meta: Meta<typeof Button> = { title: 'Design System/Button', component: Button };
export default meta;

export const Primary: StoryObj<typeof Button> = { args: { children: 'Primary', variant: 'primary' } };
export const Ghost: StoryObj<typeof Button> = { args: { children: 'Ghost', variant: 'ghost' } };
