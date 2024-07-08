import LoginForm from '@/app/ui/login-form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if(session) {
    redirect('/');
  }
  
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="mx-auto w-100" style={{ maxWidth: '400px' }}>
        <div className="d-flex flex-column gap-3 p-4">
          <div className="d-flex align-items-end bg-success text-white p-3 rounded">
            <div className="mx-auto" style={{ maxWidth: '150px' }}>
                D1 RESEARCH
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
