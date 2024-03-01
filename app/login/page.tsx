import Login from '@/components/Login';
import { Suspense } from 'react';
export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
