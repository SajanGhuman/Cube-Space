import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import NextAuth, {
  type NextAuthOptions,
  User as NextAuthUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();
const { compare } = bcryptjs;

interface ExtendedUser extends NextAuthUser {
  id: string;
  userId: string;
  name: string;
  gender: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        console.log("User authorized:", {
          id: user.id.toString(),
          userId: user.user_id,
          email: user.email,
          name: user.name,
          gender: user.gender,
        });

        return {
          id: user.id.toString(),
          userId: user.user_id,
          email: user.email,
          name: user.name,
          gender: user.gender,
        } as ExtendedUser;
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback:", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          userId: token.userId as string,
          name: token.name as string,
          gender: token.gender as string,
        },
      };
    },
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });

      if (user) {
        return {
          ...token,
          id: (user as ExtendedUser).id,
          userId: (user as ExtendedUser).userId,
          name: (user as ExtendedUser).name,
          gender: (user as ExtendedUser).gender,
        };
      }
      return token;
    },
  },
};

