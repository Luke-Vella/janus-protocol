import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
import { sendEmail } from "@/lib/email";

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
    plugins: [username()],
});