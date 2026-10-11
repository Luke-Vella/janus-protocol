DROP INDEX "clearance_level_level_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "clearance_level_level_idx" ON "clearance_level" USING btree ("level");