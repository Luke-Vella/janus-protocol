import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, integer, type AnyPgColumn } from "drizzle-orm/pg-core";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  surname: text().notNull(),
  username: text().unique(),
  displayUsername: text(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text().primaryKey(),
    expiresAt: timestamp().notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    password: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userStats = pgTable(
	"user_stats",
	{
		id: text().primaryKey(),
		userId: text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		health: integer().notNull().default(100),
		stress: integer().notNull().default(0),
		stamina: integer().notNull().default(100),
		clearanceLevel: integer().notNull().default(1),
		currentRoomId: text().references(() => room.id, { onDelete: "set null" }),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [index("user_stats_userId_idx").on(table.userId)],
);

export const clearanceLevels = pgTable(
	"clearance_level",
	{
		id: text().primaryKey(),
		level: integer().notNull(),
		name: text().notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [uniqueIndex("clearance_level_level_idx").on(table.level)],
);

export const npc = pgTable(
	"npc",
	{
		id: text().primaryKey(),
		key: text().notNull(),
		name: text().notNull(),
		portrait: text(),
		status: text(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [uniqueIndex("npc_key_idx").on(table.key)],
);

export const story = pgTable(
	"story",
	{
		id: text().primaryKey(),
		chapterNumber: integer().notNull(),
		name: text().notNull(),
		description: text(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [uniqueIndex("story_chapter_number_idx").on(table.chapterNumber)],
);

export const storyBeat = pgTable(
	"story_beat",
	{
		id: text().primaryKey(),
		key: text().notNull(),
		chapterId: text()
			.notNull()
			.references(() => story.id, { onDelete: "restrict" }),
		beatNumber: integer().notNull(),
		text: text().notNull(),
		npcId: text().references(() => npc.id, { onDelete: "set null" }),
		roomId: text().references(() => room.id, { onDelete: "set null" }),
		talkingToPlayer: boolean().notNull().default(false),
		background: text(),
		nextBeatId: text().references((): AnyPgColumn => storyBeat.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [
		uniqueIndex("story_beat_key_idx").on(table.key),
		uniqueIndex("story_beat_chapter_beat_idx").on(table.chapterId, table.beatNumber),
		index("story_beat_npcId_idx").on(table.npcId),
	],
);

export const storyChoice = pgTable(
	"story_choice",
	{
		id: text().primaryKey(),
		key: text().notNull(),
		beatId: text()
			.notNull()
			.references(() => storyBeat.id, { onDelete: "restrict" }),
		text: text().notNull(),
		nextBeatId: text().references(() => storyBeat.id, {
			onDelete: "set null",
		}),
	},
	(table) => [
		uniqueIndex("story_choice_key_idx").on(table.key),
		index("story_choice_beatId_idx").on(table.beatId),
	],
);

export const userStoryProgress = pgTable(
	"user_story_progress",
	{
		userId: text()
			.primaryKey()
			.references(() => user.id, { onDelete: "cascade" }),
		currentChapterId: text()
			.notNull()
			.default("chapter-1")
			.references(() => story.id, { onDelete: "restrict" }),
		currentBeatId: text()
			.notNull()
			.references(() => storyBeat.id, { onDelete: "restrict" }),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [index("user_story_progress_beatId_idx").on(table.currentBeatId)],
);

export const userStoryChoice = pgTable(
	"user_story_choice",
	{
		id: text().primaryKey(),
		userId: text()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		beatId: text()
			.notNull()
			.references(() => storyBeat.id, { onDelete: "restrict" }),
		choiceId: text()
			.notNull()
			.references(() => storyChoice.id, { onDelete: "restrict" }),
		createdAt: timestamp().defaultNow().notNull(),
	},
	(table) => [
		uniqueIndex("user_story_choice_user_beat_idx").on(table.userId, table.beatId),
		index("user_story_choice_choiceId_idx").on(table.choiceId),
	],
);

export const room = pgTable(
	"room",
	{
		id: text().primaryKey(),
		key: text().notNull(),
		name: text().notNull(),
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.defaultNow()
			.notNull(),
	},
	(table) => [uniqueIndex("room_name_idx").on(table.name)],
);
