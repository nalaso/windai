import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          imageUrl: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.imageUrl = user.imageUrl;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.imageUrl = token.imageUrl as string;
      session.user.username = token.username as string;
      return session;
    },
  },
});