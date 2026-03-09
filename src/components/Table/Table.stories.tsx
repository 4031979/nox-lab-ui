import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

const meta: Meta = { title: 'Data Display/Table', tags: ['autodocs'] };
export default meta;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
}

const data: User[] = [
  { id: '1', name: 'Davide Gomiero',  email: 'davide@example.com',  role: 'Admin',  status: 'active'   },
  { id: '2', name: 'Alice Rossi',     email: 'alice@example.com',   role: 'Editor', status: 'active'   },
  { id: '3', name: 'Marco Bianchi',   email: 'marco@example.com',   role: 'Viewer', status: 'inactive' },
  { id: '4', name: 'Sara Conti',      email: 'sara@example.com',    role: 'Editor', status: 'pending'  },
  { id: '5', name: 'Luca Ferretti',   email: 'luca@example.com',    role: 'Viewer', status: 'active'   },
];

const statusVariant = { active: 'success', inactive: 'default', pending: 'warning' } as const;

const columns = [
  { key: 'name',   header: 'Name',   sortable: true,  accessor: (r: User) => <strong style={{color:'var(--color-gray-900)'}}>{r.name}</strong> },
  { key: 'email',  header: 'Email',  sortable: true,  accessor: (r: User) => r.email },
  { key: 'role',   header: 'Role',   sortable: false, accessor: (r: User) => r.role },
  { key: 'status', header: 'Status', sortable: true,  accessor: (r: User) => (
    <Badge variant={statusVariant[r.status]} dot>{r.status}</Badge>
  )},
];

export const Default: StoryObj = {
  render: () => (
    <Table columns={columns} data={data} keyExtractor={r => r.id} bordered />
  ),
};

export const Selectable: StoryObj = {
  render: () => (
    <Table columns={columns} data={data} keyExtractor={r => r.id} selectable bordered />
  ),
};

export const Striped: StoryObj = {
  render: () => (
    <Table columns={columns} data={data} keyExtractor={r => r.id} striped bordered />
  ),
};

export const Loading: StoryObj = {
  render: () => (
    <Table columns={columns} data={[]} keyExtractor={r => r.id} loading bordered />
  ),
};

export const Empty: StoryObj = {
  render: () => (
    <Table columns={columns} data={[]} keyExtractor={r => r.id} bordered emptyMessage="No users found." />
  ),
};
