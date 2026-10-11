import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import * as schema from "../schema";
import { clearanceLevelData } from "./data/clearance-levels";
import { npcs } from "./data/npcs";
import { chapters, beats } from "./data/story";

// Don't import "@/db": it throws if DATABASE_URL isn't set yet,
// and ES imports run before loadEnvFile.
if (!process.env.DATABASE_URL) {
  try { process.loadEnvFile(".env.local"); } catch {}
}
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client, { schema, casing: "snake_case" });

async function main() {
  await db.transaction(async (tx) => {
    await tx
      .insert(schema.clearanceLevels)
      .values([...clearanceLevelData])
      .onConflictDoUpdate({
        target: schema.clearanceLevels.level,
        set: { name: sql`excluded.name`, updatedAt: new Date() },
      });
    // await tx.insert(schema.chapters)... same pattern, target: slug
    await tx
      .insert(schema.npc)
      .values([...npcs])
      .onConflictDoUpdate({
        target: schema.npc.key,
        set: { name: sql`excluded.name`, portrait: sql`excluded.portrait`, updatedAt: new Date() },
      });
    await tx
      .insert(schema.story)
      .values([...chapters])
      .onConflictDoUpdate({
        target: schema.story.chapterNumber,
        set: { name: sql`excluded.name`, description: sql`excluded.description`, updatedAt: new Date() },
      });
    // Self-referencing next_beat_id is fine in one statement: FKs are checked at statement end
    await tx
      .insert(schema.storyBeat)
      .values([...beats])
      .onConflictDoUpdate({
        target: schema.storyBeat.key,
        set: {
          chapterId: sql`excluded.chapter_id`,
          beatNumber: sql`excluded.beat_number`,
          text: sql`excluded.text`,
          npcId: sql`excluded.npc_id`,
          talkingToPlayer: sql`excluded.talking_to_player`,
          background: sql`excluded.background`,
          nextBeatId: sql`excluded.next_beat_id`,
          updatedAt: new Date(),
        },
      });
  });
  console.log("Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => client.end());