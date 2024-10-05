import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { z } from 'zod';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { UserNav } from '../../components/user-nav';
import { taskSchema } from './data/schema';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), 'app/(dashboard)/references/data/tasks.json'));

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <main className="h-full flex-1 flex-col space-y-6 flex p-4">
      <p className="text-muted-foreground">Here&apos;s a list of your references!</p>
      <DataTable data={tasks} columns={columns} />
    </main>
  );
}
