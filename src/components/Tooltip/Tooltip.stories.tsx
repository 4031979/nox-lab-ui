import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ padding: '60px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};
