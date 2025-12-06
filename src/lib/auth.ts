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
                    // Dynamic import to avoid build issues on client side if referenced
                    const fs = await import('fs');
                    const path = await import('path');

                    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const users = JSON.parse(fileContents);

                    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);

                    if (user) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            planType: user.planType || "FREE",
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
