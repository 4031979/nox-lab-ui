import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './EventCard';

const meta: Meta<typeof EventCard> = { title: 'Data Display/EventCard', component: EventCard, tags: ['autodocs'] };
export default meta;

export const Default: StoryObj<typeof EventCard> = {
  args: {
    icon: '🏆',
    title: 'Planning Committee Stand-up',
    description: "Let's discuss progress by department and plan activities for the next week.",
    attendees: [
      { name: 'Alice R' }, { name: 'Bob M' }, { name: 'Sara C' }, { name: 'Luca F' }, { name: 'Marco B' },
    ],
    attendeeStatus: 'Attending',
    date: 'Oct 5',
    time: '11:00 AM',
  },
  render: args => <div style={{ width: 380 }}><EventCard {...args} /></div>,
};
