CREATE TABLE "clearance_level" (
	"id" text PRIMARY KEY NOT NULL,
	"level" integer NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"health" integer DEFAULT 100 NOT NULL,
	"stress" integer DEFAULT 0 NOT NULL,
	"stamina" integer DEFAULT 100 NOT NULL,
	"clearance_level" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clearance_level_level_idx" ON "clearance_level" USING btree ("level");--> statement-breakpoint
CREATE INDEX "user_stats_userId_idx" ON "user_stats" USING btree ("user_id");