import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { randomUUID } from 'crypto';

/**
 * Reference Sources Table
 */
export const referenceStatus = pgEnum('reference_source_enum_status', [
  'uploaded',
  'in_progress',
  'active',
  'inactive',
]);

export const referenceSourceTable = pgTable('reference_source_table', {
  id: uuid('id').primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  status: referenceStatus('status')
    .notNull()
    .$default(() => 'uploaded'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertFlightsScheduleSchema = createInsertSchema(referenceSourceTable);
