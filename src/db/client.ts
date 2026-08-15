import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getDatabaseUrl } from "@/lib/env";

import * as schema from "./schema";

let client: postgres.Sql | undefined;
let database: PostgresJsDatabase<typeof schema> | undefined;

export function getDb(): PostgresJsDatabase<typeof schema> {
  if (!database) {
    client = postgres(getDatabaseUrl(), { max: 1 });
    database = drizzle(client, { schema });
  }

  return database;
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.end();
    client = undefined;
    database = undefined;
  }
}
