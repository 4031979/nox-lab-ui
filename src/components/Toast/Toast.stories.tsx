import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
};
export default meta;

const ToastDemo = () => {
  const { addToast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button onClick={() => addToast('Operation completed.', { type: 'success' })}>Success</Button>
      <Button variant="secondary" onClick={() => addToast('Something might be wrong.', { type: 'warning' })}>Warning</Button>
      <Button variant="danger" onClick={() => addToast('An error occurred.', { type: 'danger' })}>Danger</Button>
      <Button variant="ghost" onClick={() => addToast('Here is some info.')}>Info</Button>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
