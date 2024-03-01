'use client';
import addFreeSpaceUserTask from '@/utils/addFreeSpaceUserTask';
import formatDate from '@/utils/formatDate';
import { EnrichedUserTask } from '@/utils/types';
import updateCompletedStatusOfTask from '@/utils/updateCompletedStatusOfTask';
import Link from 'next/link';
import { useState } from 'react';

export default function TaskDetails({ task, gameSecret }: { task: EnrichedUserTask; gameSecret: string }) {
	const [taskCache, setTaskCache] = useState(task);
	const [freeSpaceTask, setFreeSpaceTask] = useState('');

	const addFreeSpaceTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await addFreeSpaceUserTask(freeSpaceTask, taskCache.id);
			setTaskCache({ ...taskCache, description: freeSpaceTask });
		} catch (error) {
			console.error('Error adding task:', error);
		}
	};

	const updateStatus = async () => {
		//is loading? return early
		try {
			const completedDate = taskCache.completed ? null : new Date();

			const response = await updateCompletedStatusOfTask(!taskCache.completed, task.id, completedDate);
			setTaskCache({
				...taskCache,
				...response,
			});
		} catch (error) {
			console.error('Error updating task:', error);
		}
	};
	return (
		<section className="text-gold mt-28 mx-8">
			{!taskCache.description ? (
				<form onSubmit={(e) => addFreeSpaceTask(e)} className="flex flex-col items-center justify-center">
					<textarea
						required
						className="text-2xl border rounded-sm border-lightGold p-3 h-"
						placeholder="Add Your Task"
						value={freeSpaceTask}
						onChange={(e) => setFreeSpaceTask(e.target.value)}
					></textarea>
					{/* disable if loading?*/}
					<button className="w-28 border text-center leading-4 bg-lightGold text-l py-2 px-8 rounded-sm border-lightGold bg-opacity-40 my-5">
						Save
					</button>
				</form>
			) : (
				<section className="m-8">
					<h1 className="text-5xl">{taskCache.description.toUpperCase()}.</h1>
					<div className="flex flex-col items-center">
						<p
							className={`flex items-center justify-center mt-14 ${taskCache.completed_at ? 'w-full' : 'w-1/2'}`}
						>
							Completed:{' '}
							{taskCache.completed_at ? (
								formatDate(taskCache.completed_at)
							) : (
								<span className="w-10 ml-3 border border-gold"></span>
							)}
						</p>
						<Link
							className="w-48 border text-center leading-4 bg-lightGold text-l py-2 px-12 rounded-sm border-lightGold bg-opacity-20 my-5"
							href="/"
						>
							Upload Photo
						</Link>
						<p
							className="w-48 border text-center leading-4 bg-lightGold text-l py-2 px-12 rounded-sm border-lightGold bg-opacity-20 mb-5"
							onClick={updateStatus}
						>
							{!taskCache.completed ? 'Mark Completed' : 'Mark Incomplete'}
						</p>
					</div>
				</section>
			)}
			<div className="flex justify-center">
				<Link
					className="w-40 border text-center leading-4 bg-lightGold text-l py-4 px-12 rounded-sm border-lightGold bg-opacity-40"
					href={`/g/${gameSecret}/b`}
				>
					Cancel
				</Link>
			</div>
		</section>
	);
}
