'use client';
import { EnrichedUserTask } from '@/utils/types';
import Image from 'next/image';
import centerPhoto from '@/assets/bingo-center.png';
import { useRouter } from 'next/navigation';
import chip from '@/assets/chip.png';
import updateCompletedStatusOfTask from '@/utils/updateCompletedStatusOfTask';

export default function BoardRow({ userTasks }: { userTasks: EnrichedUserTask[] }) {
	const router = useRouter();
	const handleClick = async (task: EnrichedUserTask) => {
		if (task.type !== 'center') {
			router.push(`b/${task.id}`);
		} else {
			try {
				await updateCompletedStatusOfTask(true, task.id, new Date());
				router.refresh();
			} catch (error) {
				console.error('Error updating task:', error);
			}
		}
	};
	const orderedTasks = userTasks.sort((a, b) => a.grid_column - b.grid_column);
	const items = orderedTasks.map((task) => (
		<article
			className={`w-1/5 h-28 relative text-sm text-gold text-center border-lightGold border m-0.5 rounded-sm flex items-center ${task.type !== 'center' ? 'p-2' : ''}`}
			key={task.task_id}
			onClick={() => handleClick(task)}
		>
			<TaskContents task={task} />
		</article>
	));
	return <div className="flex">{items}</div>;
}

function TaskContents({ task }: { task: EnrichedUserTask }) {
	return (
		<>
			{task.completed ? (
				<Image className="absolute top-5 left-0 opacity-40" alt="poker chip" src={chip} />
			) : null}
			{task.type !== 'center' ? (
				<span className="text-ellipsis overflow-hidden">{task.description}</span>
			) : (
				<Image src={centerPhoto} alt="a + e, andrew and erika" />
			)}
		</>
	);
}
