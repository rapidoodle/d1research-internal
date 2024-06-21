import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';

async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const authOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log('credentials: ', credentials)
        if (!email || !password) {
          console.log('Invalid credentials. No password or email provided.');
          return null;
        }

        const user = await getUser(email);
        if (!user) {
          console.log('Invalid credentials. User not found.');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return user;
        } else {
          console.log('Invalid credentials. Passwords do not match.');
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);

export const { signIn, signOut } = NextAuth(authOptions);