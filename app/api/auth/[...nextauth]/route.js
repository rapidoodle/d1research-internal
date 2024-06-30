import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { authenticate } from '@/app/lib/clinked/auth';
import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    redirect: '/dashboard',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Check if credentials are provided
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        try {
          // Query the user from the database
          const response = await sql`
            SELECT * FROM users WHERE email=${credentials.email}`;
          const user = response.rows[0];

          // Check if the user exists
          if (!user) {
            throw new Error('User not found');
          }

          // Compare the provided password with the stored hashed password
          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );

          if (passwordCorrect) {

            //if the password is correct, call the clinked api authentication
            const clinkAuthResponse = await authenticate();

            if (!clinkAuthResponse.access_token || !clinkAuthResponse.refresh_token) {
              throw new Error('Failed to retrieve tokens from Clinked');
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              access_token: user.access_token,
              refresh_token: user.refresh_token,
            };
          } else {
            throw new Error('Invalid password');
          }
        } catch (error) {
          throw new Error('Authorization error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
