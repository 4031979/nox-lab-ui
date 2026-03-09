import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj = { args: { label: 'Enable notifications' } };
export const Checked: StoryObj = { args: { label: 'Dark mode', defaultChecked: true } };
export const Small: StoryObj = { args: { label: 'Small switch', size: 'sm', defaultChecked: true } };
export const LabelLeft: StoryObj = { args: { label: 'Airplane mode', labelPlacement: 'left' } };
export const WithHint: StoryObj = { args: { label: 'Marketing emails', hint: 'Receive occasional product updates.' } };

export const Group: StoryObj = {
  render: () => {
    const [state, setState] = useState({ email: true, sms: false, push: true });
    const toggle = (k: keyof typeof state) => setState(s => ({ ...s, [k]: !s[k] }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch label="Email notifications" checked={state.email} onChange={() => toggle('email')} />
        <Switch label="SMS notifications"   checked={state.sms}   onChange={() => toggle('sms')} />
        <Switch label="Push notifications"  checked={state.push}  onChange={() => toggle('push')} />
      </div>
    );
  },
};
