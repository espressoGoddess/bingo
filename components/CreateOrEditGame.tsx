'use client';
import addNewGame from '@/utils/addNewGame';
import { Game } from '@/utils/types';
import updateGame from '@/utils/updateGame';
import { useState } from 'react';

export default function CreateOrEditGame({ game }: { game?: Game }) {
	const [name, setName] = useState<string | undefined>(game?.name ?? '');
	const [tagline, setTagline] = useState<string | undefined>(game?.tagline ?? '');
	const [allowCustomTasks, setAllowCustomTasks] = useState<string>(defaultAllowCustom(game));
	const [gameSecret, setGameSecret] = useState<string | undefined>(game?.secret ?? '');
	const [newGame] = useState<boolean>(!game);

	const addOrChangeGame = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name && tagline && allowCustomTasks && gameSecret) {
			try {
				if (newGame) {
					await addNewGame(name, tagline, allowCustomTasks, gameSecret.toUpperCase());
				} else {
					if (game) await updateGame(name, tagline, allowCustomTasks, gameSecret.toUpperCase(), game?.id);
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
					What is the name of your game?
					<input
						required
						className="text-l border rounded-sm border-lightGold invalid:border-red-500 p-3 mt-3"
						placeholder="Enter game name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					What is your game's tagline?
					<br />
					<span className="text-lg pl-2">A game of...</span>
					<input
						required
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						placeholder="Enter game tagline"
						value={tagline}
						onChange={(e) => setTagline(e.target.value)}
					/>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					Do you want players to add their own tasks?
					<select
						required
						value={allowCustomTasks}
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						onChange={(e) => setAllowCustomTasks(e.target.value)}
					>
						<option value="" disabled></option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</label>
				<label className="flex flex-col items-start text-xl m-8">
					What code do users need to access your game?
					<input
						required
						className="text-l border rounded-sm border-lightGold focus:invalid:border-red-500 invalid:border-red-500 p-3 mt-3"
						placeholder="Secret code"
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

const defaultAllowCustom = (game?: Game) => {
	if (!game) return '';
	return game?.allowCustomTasks === true ? '1' : '0';
};
