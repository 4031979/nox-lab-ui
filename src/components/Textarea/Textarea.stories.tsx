import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj = { args: { label: 'Message', placeholder: 'Type your message here...' } };
export const WithHint: StoryObj = { args: { label: 'Bio', placeholder: 'Tell us about yourself...', hint: 'Max 280 characters.', maxLength: 280, showCount: true } };
export const WithError: StoryObj = { args: { label: 'Description', defaultValue: 'Too short', error: 'Description must be at least 20 characters.' } };
export const Disabled: StoryObj = { args: { label: 'Notes', defaultValue: 'Read-only content.', disabled: true } };
export const FullWidth: StoryObj = { args: { label: 'Feedback', placeholder: 'Write your feedback...', fullWidth: true, showCount: true, maxLength: 500 } };
