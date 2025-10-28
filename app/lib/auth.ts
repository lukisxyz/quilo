import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [twoFactor(), passkey()],
});
