CREATE TABLE "room" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "story_beat" ADD COLUMN "room_id" text;--> statement-breakpoint
ALTER TABLE "user_stats" ADD COLUMN "current_room_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX "room_name_idx" ON "room" USING btree ("name");--> statement-breakpoint
ALTER TABLE "story_beat" ADD CONSTRAINT "story_beat_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_current_room_id_room_id_fk" FOREIGN KEY ("current_room_id") REFERENCES "public"."room"("id") ON DELETE set null ON UPDATE no action;