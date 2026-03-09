import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta = { title: 'Form/Radio', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = { render: () => <Radio label="Option A" name="demo" /> };

export const Group: StoryObj = {
  render: () => {
    const [val, setVal] = useState('monthly');
    return (
      <RadioGroup
        name="plan"
        label="Billing cycle"
        value={val}
        onChange={setVal}
        options={[
          { value: 'monthly', label: 'Monthly', hint: '$12/month' },
          { value: 'yearly',  label: 'Yearly',  hint: '$99/year — save 31%' },
          { value: 'lifetime',label: 'Lifetime', hint: '$299 one-time' },
        ]}
      />
    );
  },
};

export const Horizontal: StoryObj = {
  render: () => {
    const [val, setVal] = useState('sm');
    return (
      <RadioGroup
        name="size"
        label="Size"
        value={val}
        onChange={setVal}
        orientation="horizontal"
        options={[
          { value: 'sm', label: 'S' },
          { value: 'md', label: 'M' },
          { value: 'lg', label: 'L' },
          { value: 'xl', label: 'XL', disabled: true },
        ]}
      />
    );
  },
};
