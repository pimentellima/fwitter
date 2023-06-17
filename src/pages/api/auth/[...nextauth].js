import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        token.name = session.name;
        token.imageUrl = session.imageUrl;
      }
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.imageUrl = user.imageUrl;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials, req) => {
        const res = await axios.post(
          process.env.NEXTAUTH_URL + "/api/auth/signin",
          credentials
        );
        if (res.data) return res.data;
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
