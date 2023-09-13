import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: {label: "email", type: "text", placeholder: "jsmith@example.com"},
                password: {label: "password", type: "password"}
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findUnique({where: {email: credentials.email}})
                console.log("Found user:", user);
                if (user && await bcrypt.compare(credentials.password, user.hash)) {
                    return {id: user.id, username: user.username, email: user.email}
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token
        },
        // async session({session, token}) {
        //     session.userId = token.id
        //     session.user.email = token.email
        //     return session
        // }
        async session({session, token}) {

            const user = token.token.user
            return {session, user}
        },
    }

}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}