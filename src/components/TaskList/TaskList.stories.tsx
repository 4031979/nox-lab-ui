import type { Meta, StoryObj } from '@storybook/react';
import { TaskList } from './TaskList';

const meta: Meta<typeof TaskList> = { title: 'Data Display/TaskList', component: TaskList, tags: ['autodocs'] };
export default meta;

export const Default: StoryObj<typeof TaskList> = {
  args: {
    assignedTasks: [
      { id: '1', label: 'Contact vendors' },
      { id: '2', label: 'Decorate venue' },
      { id: '3', label: 'Select playlist' },
      { id: '4', label: 'Find catering' },
    ],
    completedTasks: [
      { id: '5', label: 'Select event theme' },
      { id: '6', label: 'Send out invites' },
      { id: '7', label: 'Find a DJ' },
    ],
  },
  render: args => <div style={{ width: 280 }}><TaskList {...args} /></div>,
};
