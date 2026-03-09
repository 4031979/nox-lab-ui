import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = { title: 'Navigation/Stepper', component: Stepper, tags: ['autodocs'] };
export default meta;

export const Default: StoryObj<typeof Stepper> = {
  args: {
    steps: [
      { id: '1', label: 'Find and book main venue', date: 'Sept 16', status: 'complete' },
      { id: '2', label: 'Complete seating chart', date: 'Sept 17', status: 'complete' },
      { id: '3', label: 'Decide on decor', date: 'Sept 16', status: 'current' },
      { id: '4', label: 'Send invitations', date: 'Oct 1', status: 'upcoming' },
      { id: '5', label: 'Confirm catering', date: 'Oct 5', status: 'upcoming' },
    ],
  },
  render: args => <div style={{ width: 700 }}><Stepper {...args} /></div>,
};
