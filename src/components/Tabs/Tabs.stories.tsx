import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta = { title: 'Layout/Tabs', tags: ['autodocs'] };
export default meta;

export const Line: StoryObj = {
  render: () => (
    <Tabs defaultValue="overview" variant="line">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><p style={{color:'var(--color-gray-500)'}}>Overview content goes here.</p></TabsContent>
      <TabsContent value="analytics"><p style={{color:'var(--color-gray-500)'}}>Analytics content goes here.</p></TabsContent>
      <TabsContent value="settings"><p style={{color:'var(--color-gray-500)'}}>Settings content goes here.</p></TabsContent>
    </Tabs>
  ),
};

export const Pill: StoryObj = {
  render: () => (
    <Tabs defaultValue="month" variant="pill">
      <TabsList>
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
      <TabsContent value="day"><p style={{color:'var(--color-gray-500)'}}>Daily view.</p></TabsContent>
      <TabsContent value="week"><p style={{color:'var(--color-gray-500)'}}>Weekly view.</p></TabsContent>
      <TabsContent value="month"><p style={{color:'var(--color-gray-500)'}}>Monthly view.</p></TabsContent>
      <TabsContent value="year"><p style={{color:'var(--color-gray-500)'}}>Yearly view.</p></TabsContent>
    </Tabs>
  ),
};

export const WithBadges: StoryObj = {
  render: () => (
    <Tabs defaultValue="inbox" variant="line">
      <TabsList>
        <TabsTrigger value="inbox" badge={12}>Inbox</TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="drafts" badge={3}>Drafts</TabsTrigger>
        <TabsTrigger value="trash">Trash</TabsTrigger>
      </TabsList>
      <TabsContent value="inbox"><p style={{color:'var(--color-gray-500)'}}>12 unread messages.</p></TabsContent>
      <TabsContent value="sent"><p style={{color:'var(--color-gray-500)'}}>Sent messages.</p></TabsContent>
      <TabsContent value="drafts"><p style={{color:'var(--color-gray-500)'}}>3 drafts saved.</p></TabsContent>
      <TabsContent value="trash"><p style={{color:'var(--color-gray-500)'}}>Trash is empty.</p></TabsContent>
    </Tabs>
  ),
};
