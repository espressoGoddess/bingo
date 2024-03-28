'use client';
import checkForGame from '@/utils/checkForGame';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import react, { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [gameSecret, setGameSecret] = useState<string>('');
  const [gameNotFoundMessage, setMessage] = useState({ title: '', subtitle: '' });
  const router = useRouter();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!session?.user) router.push('/login');
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [session?.user]);

  const goToGame = async (e: react.FormEvent) => {
    e.preventDefault();
    const message = await checkForGame(gameSecret);
    setMessage(message);
  };

  return (
    <section className="text-gold mt-28 mx-10 flex flex-col items-center">
      <h1 className="text-5xl text-center my-14"> WELCOME TO BINGO</h1>
      {session?.user ? (
        <>
          <form className="flex flex-col items-center justify-center">
            {/*@TODO - properly encode (think about spaces)*/}
            <label className="flex flex-col items-start text-xl">
              Game Secret:
              <input
                required
                className="text-l border rounded-sm border-lightGold p-3"
                placeholder="Enter your game secret"
                value={gameSecret}
                onChange={(e) => setGameSecret(e.target.value)}
              />
            </label>
            {gameNotFoundMessage?.title ? (
              <p className="text-red-500 text-xl">
                {gameNotFoundMessage.title}
                <span className="block">{gameNotFoundMessage.subtitle}</span>
              </p>
            ) : null}
            <button
              onClick={(e) => goToGame(e)}
              className="border bg-lightGold text-2xl py-2 px-14 mt-8 rounded-sm border-lightGold bg-opacity-40"
            >
              Go to Game
            </button>
          </form>
          <button
            className="border bg-lightGold text-xl py-2 px-8 mt-8 rounded-sm border-lightGold bg-opacity-20"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        'Loading...'
      )}
    </section>
  );
}
