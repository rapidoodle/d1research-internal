'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(prevState, formData) {

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export async function signOutAttempt() {
    try {
      await signOut('signout');
    } catch (error) {
      throw error;
    }
  }