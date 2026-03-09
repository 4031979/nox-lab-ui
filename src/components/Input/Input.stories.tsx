import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
};

export const WithHint: Story = {
  args: { label: 'Username', placeholder: 'johndoe', hint: 'Must be at least 3 characters.' },
};

export const WithError: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', value: 'not-an-email', error: 'Please enter a valid email address.', readOnly: true },
};

export const WithElements: Story = {
  args: { label: 'Website', leftElement: 'https://', placeholder: 'yoursite.com' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};
