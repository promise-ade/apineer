-- Lock down Supabase PostgREST access for Apineer public tables.
-- Apineer runtime uses server-side DATABASE_URL (postgres role with BYPASSRLS).
-- No RLS policies are added for anon or authenticated.

ALTER TABLE "public"."providers" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."features" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."countries" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."sdk_languages" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."provider_categories" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."provider_products" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."provider_features" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."provider_countries" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
ALTER TABLE "public"."provider_sdk_languages" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."providers" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."categories" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."products" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."features" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."countries" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."sdk_languages" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."provider_categories" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."provider_products" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."provider_features" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."provider_countries" FROM "anon", "authenticated";
--> statement-breakpoint
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE "public"."provider_sdk_languages" FROM "anon", "authenticated";
