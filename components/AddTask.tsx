'use client';
import { useState } from 'react';

export default function AddTask() {
	const [description, setDescription] = useState('');
	const [photoRequired, setPhotoRequired] = useState(false);

	const addTask = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: insert task into DB
	};

	return (
		<article className="text-gold m-8 flex border rounded-md border-gold">
			<form onSubmit={addTask}>
				<h2 className="text-2xl my-3 mx-8">Add Task</h2>
				<label className="flex flex-col items-start text-xl m-8">
					Description
					<textarea
						className="text-l border rounded-sm border-lightGold invalid:border-red-500 p-3 mt-3"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</label>
				<label className="text-xl m-8">
					{' '}
					Photo required
					<input
						type="checkbox"
						className="ml-3"
						checked={photoRequired}
						onChange={(e) => setPhotoRequired((prev) => !prev)}
					/>
				</label>
				<div className="flex justify-end">
					<button className="border bg-lightGold text-l py-2 px-8 m-3 mt-6 ml-8 rounded-sm border-lightGold bg-opacity-40">
						Add
					</button>
				</div>
				{/*on click => upsert game and add task to DB*/}
			</form>
		</article>
	);
}
