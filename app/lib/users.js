import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getLoggedUser() {
  const session = await getServerSession(authOptions);

  return session.user;
}