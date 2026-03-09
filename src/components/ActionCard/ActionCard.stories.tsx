import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';

const meta: Meta<typeof ActionCard> = { title: 'Data Display/ActionCard', component: ActionCard, tags: ['autodocs'] };
export default meta;

export const Default: StoryObj<typeof ActionCard> = {
  args: {
    eyebrow: 'Next step:',
    title: 'Send out invitations',
    primaryAction: { label: 'Send out', onClick: () => {} },
    secondaryAction: { label: 'Skip', onClick: () => {} },
    variant: 'dark',
  },
  render: args => <div style={{ width: 280 }}><ActionCard {...args} /></div>,
};
