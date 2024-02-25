'use client';
import { SingleTaskDetails } from '@/utils/types';
import Link from 'next/link';
import { useState } from 'react';

export default function TaskDetails({ task, gameSecret }: { task: SingleTaskDetails; gameSecret: string }) {
	const [taskCache, setTaskCache] = useState(task);
	const updateStatus = async () => {
		try {
			const response = await fetch('/api/updateTaskStatus', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: task.id, newCompletedStatus: !taskCache.completed }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const responseData = await response.json();
			setTaskCache(responseData.updatedTask);
		} catch (error) {
			console.error('Error updating task:', error);
		}
	};

	return (
		<section className="text-gold mt-28 mx-8">
			<h1 className="text-5xl">{taskCache.description?.toUpperCase()}.</h1>
			<div className="flex flex-col items-center">
				<p className="flex items-center w-1/2 mt-14">
					Completed:{' '}
					{taskCache.completed ? (
						taskCache.completed_at?.toISOString()
					) : (
						<span className="w-10 ml-3 border border-gold"></span>
					)}
				</p>
				<Link href="/">Upload Photo</Link>
				<p onClick={updateStatus}>{!taskCache.completed ? 'Mark Complete' : 'Mark Incomplete'}</p>
				<Link href={`/g/${gameSecret}/b`}>Cancel</Link>
			</div>
		</section>
	);
}
