import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
};
export default meta;

const roles = [
  { value: 'admin',   label: 'Admin' },
  { value: 'editor',  label: 'Editor' },
  { value: 'viewer',  label: 'Viewer' },
  { value: 'guest',   label: 'Guest', disabled: true },
];

export const Default: StoryObj = {
  render: () => {
    const [val, setVal] = useState('');
    return <Select label="Role" options={roles} value={val} onChange={setVal} />;
  },
};

export const WithHint: StoryObj = {
  render: () => {
    const [val, setVal] = useState('editor');
    return <Select label="Role" hint="Controls what the user can access." options={roles} value={val} onChange={setVal} />;
  },
};

export const WithError: StoryObj = {
  render: () => (
    <Select label="Role" error="Please select a role." options={roles} />
  ),
};

export const WithGroups: StoryObj = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Select
        label="Country"
        value={val}
        onChange={setVal}
        options={[
          { group: 'Europe', options: [
            { value: 'it', label: 'Italy' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
          ]},
          { group: 'Americas', options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
          ]},
        ]}
      />
    );
  },
};
