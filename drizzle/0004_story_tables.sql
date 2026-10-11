CREATE TABLE "npc" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"portrait" text,
	"status" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story" (
	"id" text PRIMARY KEY NOT NULL,
	"chapter_number" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_beat" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"chapter_id" text NOT NULL,
	"beat_number" integer NOT NULL,
	"text" text NOT NULL,
	"npc_id" text,
	"background" text,
	"next_beat_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_choice" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"beat_id" text NOT NULL,
	"text" text NOT NULL,
	"next_beat_id" text
);
--> statement-breakpoint
CREATE TABLE "user_story_choice" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"beat_id" text NOT NULL,
	"choice_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_story_progress" (
	"user_id" text PRIMARY KEY NOT NULL,
	"current_beat_id" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "story_beat" ADD CONSTRAINT "story_beat_chapter_id_story_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."story"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_beat" ADD CONSTRAINT "story_beat_npc_id_npc_id_fk" FOREIGN KEY ("npc_id") REFERENCES "public"."npc"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_beat" ADD CONSTRAINT "story_beat_next_beat_id_story_beat_id_fk" FOREIGN KEY ("next_beat_id") REFERENCES "public"."story_beat"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_choice" ADD CONSTRAINT "story_choice_beat_id_story_beat_id_fk" FOREIGN KEY ("beat_id") REFERENCES "public"."story_beat"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_choice" ADD CONSTRAINT "story_choice_next_beat_id_story_beat_id_fk" FOREIGN KEY ("next_beat_id") REFERENCES "public"."story_beat"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_story_choice" ADD CONSTRAINT "user_story_choice_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_story_choice" ADD CONSTRAINT "user_story_choice_beat_id_story_beat_id_fk" FOREIGN KEY ("beat_id") REFERENCES "public"."story_beat"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_story_choice" ADD CONSTRAINT "user_story_choice_choice_id_story_choice_id_fk" FOREIGN KEY ("choice_id") REFERENCES "public"."story_choice"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_story_progress" ADD CONSTRAINT "user_story_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_story_progress" ADD CONSTRAINT "user_story_progress_current_beat_id_story_beat_id_fk" FOREIGN KEY ("current_beat_id") REFERENCES "public"."story_beat"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "npc_key_idx" ON "npc" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "story_chapter_number_idx" ON "story" USING btree ("chapter_number");--> statement-breakpoint
CREATE UNIQUE INDEX "story_beat_key_idx" ON "story_beat" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "story_beat_chapter_beat_idx" ON "story_beat" USING btree ("chapter_id","beat_number");--> statement-breakpoint
CREATE INDEX "story_beat_npcId_idx" ON "story_beat" USING btree ("npc_id");--> statement-breakpoint
CREATE UNIQUE INDEX "story_choice_key_idx" ON "story_choice" USING btree ("key");--> statement-breakpoint
CREATE INDEX "story_choice_beatId_idx" ON "story_choice" USING btree ("beat_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_story_choice_user_beat_idx" ON "user_story_choice" USING btree ("user_id","beat_id");--> statement-breakpoint
CREATE INDEX "user_story_choice_choiceId_idx" ON "user_story_choice" USING btree ("choice_id");--> statement-breakpoint
CREATE INDEX "user_story_progress_beatId_idx" ON "user_story_progress" USING btree ("current_beat_id");