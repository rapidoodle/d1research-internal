import LoginForm from '@/app/ui/login-form';

export default function Page() {
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="mx-auto w-100" style={{ maxWidth: '400px' }}>
        <div className="d-flex flex-column gap-3 p-4">
          <div className="d-flex align-items-end bg-primary text-white p-3 rounded">
            <div className="mx-auto" style={{ maxWidth: '150px' }}>
                D1RESAERCH
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
