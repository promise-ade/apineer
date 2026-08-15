import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/apineer"
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  strict: true,
  verbose: true,
});
