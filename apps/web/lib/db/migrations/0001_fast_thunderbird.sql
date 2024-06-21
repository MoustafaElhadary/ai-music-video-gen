CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_phone_number" text NOT NULL,
	"user_id" text NOT NULL,
	"prompt" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
