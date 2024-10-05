import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DB_CONNECTION_STRING } from './lib/constants';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_CONNECTION_STRING,
  },
  schema: './lib/drizzle/schema.ts',
  out: './drizzle',
});
