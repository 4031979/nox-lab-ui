import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta = { title: 'Layout/Accordion', tags: ['autodocs'] };
export default meta;

const items = [
  { value: 'a', title: 'What is a design system?', body: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.' },
  { value: 'b', title: 'Why use a component library?', body: 'Component libraries ensure consistency, speed up development, and make it easier to maintain a cohesive visual language across products.' },
  { value: 'c', title: 'How does dark mode work?', body: 'Dark mode is implemented via CSS custom properties. Switching the data-theme attribute on the root element swaps all color tokens globally.' },
];

export const Default: StoryObj = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion defaultValue="a">
        {items.map(i => (
          <AccordionItem key={i.value} value={i.value} title={i.title}>{i.body}</AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: StoryObj = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion type="multiple" defaultValue={['a', 'c']}>
        {items.map(i => (
          <AccordionItem key={i.value} value={i.value} title={i.title}>{i.body}</AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Bordered: StoryObj = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion bordered>
        {items.map(i => (
          <AccordionItem key={i.value} value={i.value} title={i.title}>{i.body}</AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
