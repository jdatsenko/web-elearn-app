import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    pages:{
        signIn: '/auth/login',
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            name: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.name  || !credentials?.password){
                return null
            }
            const existingUser = await prisma.user.findUnique({
                where:{
                    name: credentials.name
                },
            });
            console.log("EXISTING USER", existingUser)
            if(!existingUser){
                return null;
            }

            const passwordMatch = await compare(credentials.password, existingUser.password || '');

            if(!passwordMatch){
                return null;
            }

            return {
                id: existingUser.id,
                name: existingUser.name!,
                email: existingUser.email!,
                topicsCompleted: existingUser.topicsCompleted,
                role: existingUser.role,
            }
            }
        })
    ],
    callbacks: {
        async jwt({token, user, trigger, session}) {
            console.log("TOKEN", token);
            console.log("USER", user);
            if (trigger === 'update' && session.topicsCompleted) {
                token.topicsCompleted = session.topicsCompleted;
            }
            if(user){
                return{
                    ...token,
                    name: user.name,
                    id: user.id,
                    topicsCompleted: user.topicsCompleted,
                    role: user.role,
                }
            }
            return token;
        },
        async session({session, token}) {
            if (token.name) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        ...token,
                    }
                };
            } else {
                return session;
            }
        },
    }
}    