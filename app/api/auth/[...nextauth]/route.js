import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectMongoDB } from "@/utils/connectDB";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email }).maxTimeMS(15000);
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      if (profile.email) {
        try {
          await connectMongoDB();

          const userExists = await User.findOne({ email: profile.email }).maxTimeMS(15000);

          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }

          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      }
    },
  },
});

export {handler as GET, handler as POST};
