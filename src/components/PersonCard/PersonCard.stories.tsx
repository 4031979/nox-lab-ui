import type { Meta, StoryObj } from '@storybook/react';
import { PersonCard } from './PersonCard';

const meta: Meta<typeof PersonCard> = { title: 'Data Display/PersonCard', component: PersonCard, tags: ['autodocs'] };
export default meta;

export const GuestList: StoryObj = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--color-gray-200)' }}>
      <PersonCard name="Mary Johnson"  tags={[{ emoji: '🤙', label: 'Brings a +1' }, { emoji: '🌿', label: 'Vegan' }]} />
      <PersonCard name="Carol Collins" tags={[{ emoji: '🌿', label: 'Vegan' }, { emoji: '🚬', label: 'Smoker' }]} />
      <PersonCard name="Jerry Kyles"   tags={[{ emoji: '🤙', label: 'Brings a +1' }, { emoji: '❤️', label: 'BFF' }]} />
      <PersonCard name="Mark Newton"   subtitle="New to the group" action={{ label: '👋 New to the group', onClick: () => {} }} />
    </div>
  ),
};
