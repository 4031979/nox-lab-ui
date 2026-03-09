import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCard, SkeletonRow } from './Skeleton';

const meta: Meta = { title: 'Data Display/Skeleton', tags: ['autodocs'] };
export default meta;

export const Variants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: 300 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width="100%" height={80} />
      <Skeleton variant="rounded" width="100%" height={36} />
    </div>
  ),
};

export const MultilineText: StoryObj = {
  render: () => (
    <div style={{ width: 320 }}>
      <Skeleton variant="text" lines={4} />
    </div>
  ),
};

export const CardPreset: StoryObj = {
  render: () => <SkeletonCard />,
};

export const ListPreset: StoryObj = {
  render: () => (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--color-gray-200)' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
          <SkeletonRow />
        </div>
      ))}
    </div>
  ),
};
