import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import * as schema from "../schema";
import { clearanceLevelData } from "./data/clearance-levels";

// Don't import "@/db": it throws if DATABASE_URL isn't set yet,
// and ES imports run before loadEnvFile.
if (!process.env.DATABASE_URL) {
  try { process.loadEnvFile(".env.local"); } catch {}
}
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const client = postgres(url, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

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
  });
  console.log("Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => client.end());