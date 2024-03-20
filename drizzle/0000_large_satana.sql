CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text,
	"username" text,
	"email" text,
	"password" text,
	"ip_address" "inet",
	"source" varchar(20) DEFAULT 'website',
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
