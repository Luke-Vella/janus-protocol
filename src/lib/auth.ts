import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";
import { eq, asc } from "drizzle-orm"

const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg", schema }),
    emailAndPassword: { enabled: true, requireEmailVerification: true },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            // not awaited, to avoid slowing the response and leaking timing differences
            void sendEmail({
                to: user.email,
                subject: "Verify your email address",
                html: `<p>Hi ${escapeHtml(user.name)},</p><p>Confirm your email address to finish creating your account:</p><p><a href="${url}">Verify email</a></p><p>If you didn't sign up, you can ignore this email.</p>`,
            }).catch((err) => console.error(err));
        },
    },
    user: {
        additionalFields: {
            surname: { type: "string", required: true },
        },
    },
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					await db
						.insert(schema.userStats)
						.values({ id: crypto.randomUUID(), userId: user.id });

					// The user row is already committed, so never let story setup fail sign-up
					try {
						const [first] = await db
							.select({ id: schema.storyBeat.id })
							.from(schema.storyBeat)
							.innerJoin(schema.story, eq(schema.storyBeat.chapterId, schema.story.id))
							.orderBy(asc(schema.story.chapterNumber), asc(schema.storyBeat.beatNumber))
							.limit(1);

						if (!first) {
							console.error("No story beats seeded; skipping story progress for user", user.id);
							return;
						}

						await db
							.insert(schema.userStoryProgress)
							.values({ userId: user.id, currentBeatId: first.id })
							.onConflictDoNothing();
					} catch (err) {
						console.error("Failed to create story progress for user", user.id, err);
					}
				},
			},
		},
	},
    plugins: [username()],
});