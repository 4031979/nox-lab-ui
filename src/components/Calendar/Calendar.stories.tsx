import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta = { title: 'Inputs/Calendar', tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 9, 15));
    return <Calendar value={date} onChange={setDate} />;
  },
};
