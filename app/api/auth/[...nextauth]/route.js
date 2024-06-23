import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { sql } from '@vercel/postgres';

console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

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
            console.error('User not found');
            throw new Error('User not found');
          }

          // Compare the provided password with the stored hashed password
          const passwordCorrect = await compare(
            credentials.password,
            user.password
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
            };
          } else {
            console.error('Invalid password');
            throw new Error('Invalid password');
          }
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
