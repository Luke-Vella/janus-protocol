import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  try { process.loadEnvFile(".env.local"); } catch {}
}
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
if (process.env.NODE_ENV === "production") throw new Error("Refusing to purge users in production");

const client = postgres(url, { prepare: false, max: 1 });

async function main() {
  // Every user-owned table has ON DELETE CASCADE to "user"; verification has no FK so it's cleared separately
  await client.begin(async (tx) => {
    await tx`delete from "user"`;
    await tx`delete from verification`;
  });
  console.log(`Purged users (and sessions, accounts, stats, story progress/choices) on ${new URL(url!).host}`);
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => client.end());
