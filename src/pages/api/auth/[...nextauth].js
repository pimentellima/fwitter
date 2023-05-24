import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
    error: '/error'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials, req) => {
        const res = await axios.post("http://localhost:3000/api/auth/signin", credentials);
        if(res.data) return res.data;
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
