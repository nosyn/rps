import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

/**
 * Airports Table
 */
export const airportsTable = pgTable('references', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
export const insertAirportsSchema = createInsertSchema(airportsTable);
