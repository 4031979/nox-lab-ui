import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj = { args: { label: 'Accept terms and conditions' } };
export const Checked: StoryObj = { args: { label: 'Remember me', defaultChecked: true } };
export const Indeterminate: StoryObj = { args: { label: 'Select all', indeterminate: true } };
export const WithHint: StoryObj = { args: { label: 'Subscribe to newsletter', hint: 'You can unsubscribe at any time.' } };
export const WithError: StoryObj = { args: { label: 'Accept terms', error: 'You must accept the terms to continue.' } };
export const Disabled: StoryObj = { args: { label: 'Disabled option', disabled: true } };

export const Group: StoryObj = {
  render: () => {
    const [vals, setVals] = useState({ a: true, b: false, c: true });
    const toggle = (k: keyof typeof vals) => setVals(v => ({ ...v, [k]: !v[k] }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox label="Email notifications" checked={vals.a} onChange={() => toggle('a')} />
        <Checkbox label="SMS notifications"   checked={vals.b} onChange={() => toggle('b')} />
        <Checkbox label="Push notifications"  checked={vals.c} onChange={() => toggle('c')} />
      </div>
    );
  },
};
