import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta = { title: 'Inputs/RangeSlider', tags: ['autodocs'] };
export default meta;

const hist = [0.2,0.3,0.5,0.6,0.8,0.9,1,0.85,0.7,0.5,0.4,0.3,0.55,0.7,0.6,0.4,0.3,0.2,0.15,0.1];

export const WithHistogram: StoryObj = {
  render: () => {
    const [val, setVal] = useState<[number,number]>([450, 925]);
    return (
      <div style={{ width: 400, padding: '40px 20px 20px' }}>
        <RangeSlider min={0} max={1500} value={val} onChange={setVal}
          label="Price Range" prefix="$" histogram={hist}
          onReset={() => setVal([0, 1500])} />
      </div>
    );
  },
};
