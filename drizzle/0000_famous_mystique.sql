CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(2)
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_categories" (
	"provider_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "provider_categories_provider_id_category_id_pk" PRIMARY KEY("provider_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "provider_countries" (
	"provider_id" uuid NOT NULL,
	"country_id" uuid NOT NULL,
	CONSTRAINT "provider_countries_provider_id_country_id_pk" PRIMARY KEY("provider_id","country_id")
);
--> statement-breakpoint
CREATE TABLE "provider_features" (
	"provider_id" uuid NOT NULL,
	"feature_id" uuid NOT NULL,
	CONSTRAINT "provider_features_provider_id_feature_id_pk" PRIMARY KEY("provider_id","feature_id")
);
--> statement-breakpoint
CREATE TABLE "provider_products" (
	"provider_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	CONSTRAINT "provider_products_provider_id_product_id_pk" PRIMARY KEY("provider_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "provider_sdk_languages" (
	"provider_id" uuid NOT NULL,
	"sdk_language_id" uuid NOT NULL,
	CONSTRAINT "provider_sdk_languages_provider_id_sdk_language_id_pk" PRIMARY KEY("provider_id","sdk_language_id")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"website_url" text NOT NULL,
	"api_style" varchar(100),
	"authentication" varchar(100),
	"sandbox_available" boolean,
	"webhooks_available" boolean,
	"pricing_model" varchar(100),
	"free_tier" varchar(100),
	"documentation_url" text NOT NULL,
	"coverage_summary" text,
	"last_verified" date,
	"source" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sdk_languages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "provider_categories" ADD CONSTRAINT "provider_categories_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_categories" ADD CONSTRAINT "provider_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_countries" ADD CONSTRAINT "provider_countries_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_countries" ADD CONSTRAINT "provider_countries_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_features" ADD CONSTRAINT "provider_features_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_features" ADD CONSTRAINT "provider_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_products" ADD CONSTRAINT "provider_products_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_products" ADD CONSTRAINT "provider_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_sdk_languages" ADD CONSTRAINT "provider_sdk_languages_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_sdk_languages" ADD CONSTRAINT "provider_sdk_languages_sdk_language_id_sdk_languages_id_fk" FOREIGN KEY ("sdk_language_id") REFERENCES "public"."sdk_languages"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "categories_name_unique" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "countries_name_unique" ON "countries" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "features_name_unique" ON "features" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "features_slug_unique" ON "features" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "products_name_unique" ON "products" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_unique" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "provider_categories_category_id_idx" ON "provider_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "provider_countries_country_id_idx" ON "provider_countries" USING btree ("country_id");--> statement-breakpoint
CREATE INDEX "provider_features_feature_id_idx" ON "provider_features" USING btree ("feature_id");--> statement-breakpoint
CREATE INDEX "provider_products_product_id_idx" ON "provider_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "provider_sdk_languages_sdk_language_id_idx" ON "provider_sdk_languages" USING btree ("sdk_language_id");--> statement-breakpoint
CREATE UNIQUE INDEX "providers_name_unique" ON "providers" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "providers_slug_unique" ON "providers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "providers_name_idx" ON "providers" USING btree ("name");--> statement-breakpoint
CREATE INDEX "providers_last_verified_idx" ON "providers" USING btree ("last_verified");--> statement-breakpoint
CREATE UNIQUE INDEX "sdk_languages_name_unique" ON "sdk_languages" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "sdk_languages_slug_unique" ON "sdk_languages" USING btree ("slug");