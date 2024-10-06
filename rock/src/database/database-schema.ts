import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { randomUUID } from 'crypto';

/**
 * Reference Sources Table
 */
export const referenceSourceStatus = pgEnum('reference_source_enum_status', [
  'uploaded',
  'in_progress',
  'active',
  'inactive',
]);

export const referenceSource = pgTable('reference_source', {
  id: uuid('id').primaryKey().$defaultFn(randomUUID),
  name: text('name').notNull(),
  status: referenceSourceStatus('status')
    .notNull()
    .$default(() => 'uploaded'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertReferenceSourceSchema = createInsertSchema(referenceSource);

export const databaseSchema = {
  referenceSource,
};
