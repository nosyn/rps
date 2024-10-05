import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { randomUUID } from 'crypto';

/**
 * Reference Sources Table
 */
export const referenceSourceTable = pgTable('reference_source_table', {
  id: uuid('id').primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertFlightsScheduleSchema = createInsertSchema(referenceSourceTable);
