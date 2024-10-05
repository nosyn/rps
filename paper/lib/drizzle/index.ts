import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DB_CONNECTION_STRING } from "../constants";
import * as schema from "./schema";

const client = postgres(DB_CONNECTION_STRING);

export const db = drizzle(client, {
  schema,
});
