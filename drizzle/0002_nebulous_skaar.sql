ALTER TABLE "clearance_level" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_stats" ALTER COLUMN "updated_at" SET DEFAULT now();