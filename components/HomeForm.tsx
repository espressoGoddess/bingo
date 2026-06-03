'use client';
import checkForGame from '@/utils/checkForGame';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function HomeForm() {
	const [gameSecret, setGameSecret] = useState('');
	const [gameNotFoundMessage, setMessage] = useState({ title: '', subtitle: '' });

	useEffect(() => {
		const timerId = setTimeout(() => {
			toast.success('Try password `coffee-secret-123`', { duration: 30_000 });
		}, 500);
		return () => clearTimeout(timerId);
	}, []);

	const goToGame = async (e: React.FormEvent) => {
		e.preventDefault();
		const message = await checkForGame(gameSecret);
		setMessage(message);
	};

	return (
		<>
			<form className="flex flex-col items-center justify-center" onSubmit={goToGame}>
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
					type="submit"
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
			<Toaster position="top-right" />
		</>
	);
}
