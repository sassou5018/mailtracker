import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from './prisma'
import { compare } from './authUtils'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.username || !credentials.password) return null
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })
                if(!user) return null
                const isMatch = await compare(credentials.password, user.password)
                if(!isMatch) return null
                return {
                    id: user.id,
                    name: user.username
                }
            }
        })
    ]
}