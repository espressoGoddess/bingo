'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const { data: session } = useSession();
  const callbackUrl = useSearchParams().get('redirect_to');
  return (
    <section className="text-gold mt-28 mx-10 flex flex-col items-center">
      <h1 className="text-5xl text-center"> WELCOME TO BINGO</h1>
      {session ? (
        <>
          <p className="my-16 text-2xl">Please go to the link with your game's secret code</p>
          {session.user ? <h2 className="text-xl">Signed in as {session.user?.name}</h2> : null}
          <button
            className="border bg-lightGold text-2xl py-2 px-14 mt-8 rounded-sm border-lightGold bg-opacity-40"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl my-24">You are not signed in</h2>
          <button
            className="border bg-lightGold text-2xl py-2 px-14 rounded-sm border-lightGold bg-opacity-20"
            onClick={() =>
              signIn('google', {
                callbackUrl: callbackUrl ?? '',
              })
            }
          >
            Sign in
          </button>
        </>
      )}
    </section>
  );
}
