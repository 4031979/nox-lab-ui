import type { Meta, StoryObj } from '@storybook/react';
import { VenueCard } from './VenueCard';

const meta: Meta<typeof VenueCard> = { title: 'Data Display/VenueCard', component: VenueCard, tags: ['autodocs'] };
export default meta;

export const Default: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <VenueCard
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80"
        name="Delux Hotel Reception"
        description="Hosting luxurious events for any occasion"
        rating={4.9} reviewCount={5} price={110} bookmarked />
      <VenueCard
        image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80"
        name="Seaside Castle"
        description="Perfect venue for celebrations"
        rating={4.7} reviewCount={5} price={95} />
    </div>
  ),
};
