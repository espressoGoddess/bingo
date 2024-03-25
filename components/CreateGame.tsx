'use client';
import { useState } from 'react';

export default function CreateGame() {
	const [name, setName] = useState<string | undefined>('');
	const [tagline, setTagline] = useState<string | undefined>('');
	const [allowCustomTasks, setAllowCustomTasks] = useState<string>('');

	const createGame = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && tagline && allowCustomTasks) {
			console.log('meow');
		}
	};

	return (
		<section className="text-gold m-8 flex flex-col items-center">
			<h1 className="text-5xl text-center mt-14 mb-3"> Create a Game</h1>
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
					<input
						required
						className="text-l border rounded-sm border-lightGold invalid:border-red-500 p-3 mt-3"
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
						className="text-l border rounded-sm border-lightGold invalid:border-red-500 p-3 mt-3"
						onChange={(e) => setAllowCustomTasks(e.target.value)}
					>
						<option value="" disabled></option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</label>
				<button
					onClick={(e) => createGame(e)}
					className="border bg-lightGold text-2xl py-2 px-14 m-3 ml-8 rounded-sm border-lightGold bg-opacity-40"
				>
					Create Game
				</button>
			</form>
		</section>
	);
}
