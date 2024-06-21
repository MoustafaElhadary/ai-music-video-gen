CREATE TABLE IF NOT EXISTS "songs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"name" text NOT NULL,
	"is_public" boolean NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
