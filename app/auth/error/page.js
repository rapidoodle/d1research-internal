'use client';

import { useRouter } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();
//   const { error } = router.query;

  return (
    <div>
      <h1>Authentication Error</h1>
      {JSON.stringify(router)}
      {/* <p>{error}</p> */}
    </div>
  );
}
