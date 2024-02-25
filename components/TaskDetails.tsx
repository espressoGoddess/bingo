'use client';
import parseDate from '@/utils/ParseDate';
import { SingleTaskDetails } from '@/utils/types';
import Link from 'next/link';
import { useState } from 'react';

export default function TaskDetails({ task, gameSecret }: { task: SingleTaskDetails; gameSecret: string }) {
	const [taskCache, setTaskCache] = useState(task);

	const updateStatus = async () => {
		try {
			const completedDate = taskCache.completed ? null : new Date();

			const response = await fetch('/api/updateTaskStatus', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: task.id,
					newCompletedStatus: !taskCache.completed,
					completedAt: completedDate,
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const responseData = await response.json();
			const completedAt = responseData.updatedTask.completed_at
				? parseDate(responseData.updatedTask.completed_at)
				: null;
			setTaskCache({ ...responseData.updatedTask, completed_at: completedAt });
		} catch (error) {
			console.error('Error updating task:', error);
		}
	};

	return (
		<section className="text-gold mt-28 mx-8">
			<h1 className="text-5xl">{taskCache.description?.toUpperCase()}.</h1>
			<div className="flex flex-col items-center">
				<p
					className={`flex items-center justify-center mt-14 ${taskCache.completed_at ? 'w-full' : 'w-1/2'}`}
				>
					Completed:{' '}
					{taskCache.completed_at ? (
						taskCache.completed_at
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
