'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Component() {
  const { data: session } = useSession();
  const callbackUrl = useSearchParams().get('redirect_to');
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() =>
          signIn('google', {
            callbackUrl: callbackUrl ?? '',
          })
        }
      >
        Sign in
      </button>
    </>
  );
}
