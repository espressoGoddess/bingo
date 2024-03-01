'use client';
import { EnrichedUserTask } from '@/utils/types';
import Image from 'next/image';
import centerPhoto from '@/assets/bingo-center.png';
import { useRouter } from 'next/navigation';
import chip from '@/assets/chip.png';
import updateCompletedStatusOfTask from '@/utils/updateCompletedStatusOfTask';
import styles from './BoardRow.module.css';

export default function BoardRow({
	userTasks,
	printPreview,
}: {
	userTasks: EnrichedUserTask[];
	printPreview?: boolean;
}) {
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
	const height = printPreview ? 'screen:h-28' : 'screen:h-24';
	const orderedTasks = userTasks.sort((a, b) => a.grid_column - b.grid_column);
	const items = orderedTasks.map((task) => (
		<article
			className={`w-1/5 print:h-28 ${height} relative overflow-hidden flex items-center justify-center text-center m-0.5 ${task.type !== 'center' ? 'p-2' : ''} text-sm text-gold border border-lightGold rounded-sm ${task.type !== 'center' ? styles.taskBorders : ''}`}
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
				<span className="text-ellipsis overflow-hidden hyphens-auto">{task.description}</span>
			) : (
				<Image src={centerPhoto} alt="a + e, andrew and erika" />
			)}
		</>
	);
}
