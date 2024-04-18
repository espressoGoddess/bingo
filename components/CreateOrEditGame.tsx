'use client';
import addNewGame from '@/utils/addNewGame';
import { Game } from '@/utils/types';
import updateGame from '@/utils/updateGame';
import { useState } from 'react';

export default function CreateOrEditGame({ game }: { game?: Game }) {
	const [name, setName] = useState<string | undefined>(game?.name ?? '');
	const [tagline, setTagline] = useState<string | undefined>(game?.tagline ?? '');
	const [numberOfCustomTasks, setNumberOfCustomTasks] = useState<number>(0);
	const [gameSecret, setGameSecret] = useState<string | undefined>(game?.secret ?? '');
	const [newGame] = useState<boolean>(!game);

	const addOrChangeGame = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name && tagline && gameSecret) {
			try {
				if (newGame) {
					await addNewGame(
						name,
						tagline,
						numberOfCustomTasks ? true : false,
						numberOfCustomTasks,
						gameSecret.toUpperCase(),
						'inactive',
					);
				} else {
					if (game)
						await updateGame(
							name,
							tagline,
							numberOfCustomTasks ? true : false,
							numberOfCustomTasks,
							gameSecret.toUpperCase(),
							game?.id,
							'inactive',
						);
				}
			} catch {
				console.error('error creating game');
			}
		}
	};

	return (
		<section className="text-gold m-8 flex flex-col items-center">
			<h1 className="text-5xl text-center mt-5 mb-3">{newGame ? 'Create' : 'Edit'} Game</h1>
			<form>
				<label className="flex flex-col items-start text-xl m-8">
					Title
					<input
						required
						className="text-l border rounded-sm border-lightGold invalid:border-red-500 p-3 mt-3"
						placeholder="Enter game title"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					Subtitle
					<input
						required
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						placeholder="Enter game subtitle"
						value={tagline}
						onChange={(e) => setTagline(e.target.value)}
					/>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					Number of custom tasks
					<input
						required
						type="number"
						placeholder="0"
						value={numberOfCustomTasks}
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						onChange={(e) => setNumberOfCustomTasks(parseInt(e.target.value))}
					></input>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					Secret code
					<input
						required
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						placeholder="Enter game secret code"
						value={gameSecret}
						onChange={(e) => setGameSecret(e.target.value)}
					/>
				</label>
				<button
					onClick={(e) => addOrChangeGame(e)}
					className="border bg-lightGold text-2xl py-2 px-14 m-3 ml-8 rounded-sm border-lightGold bg-opacity-40"
				>
					{newGame ? 'Create' : 'Update'} Game
				</button>
			</form>
		</section>
	);
}
