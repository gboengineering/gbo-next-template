CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid(),
	"role" text,
	"username" text,
	"email" text,
	"password" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
