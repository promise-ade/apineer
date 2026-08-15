import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url().optional(),
  ),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

function parseEnv<T extends z.ZodTypeAny>(
  schema: T,
  source: Record<string, string | undefined>,
): z.infer<T> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment configuration:\n${message}`);
  }

  return result.data;
}

export const serverEnv = parseEnv(serverEnvSchema, {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

export const clientEnv = parseEnv(clientEnvSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export function getSiteUrl(): string {
  return clientEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getDatabaseUrl(): string {
  const databaseUrl = serverEnv.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Set it in .env.local before using the database.",
    );
  }

  return databaseUrl;
}
