import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import AppleProvider from "next-auth/providers/apple"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID || "",
            clientSecret: process.env.APPLE_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                try {
                    const { prisma } = await import("@/lib/prisma");

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    // Simple string comparison as per existing logic (migrating from json)
                    // In a real app with hashing, use bcrypt.compare(credentials.password, user.password)
                    if (user && user.planType && user.password === credentials.password) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            planType: user.planType || "FREE",
                            resumesGeneratedCount: user.resumesGeneratedCount || 0
                        }
                    }

                    // Fallback for cases where password might not match or user not found
                    if (user && user.password === credentials.password) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            planType: "FREE",
                            resumesGeneratedCount: 0
                        }
                    }

                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string
                (session.user as any).planType = "FREE";
                (session.user as any).resumesGeneratedCount = 0;
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    }
}
