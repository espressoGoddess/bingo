'use client';
import { EnrichedUserTask } from '@/utils/types';
import Image from 'next/image';
import centerPhoto from '@/assets/bingo-center.png';
import { useRouter } from 'next/navigation';

export default function BoardRow({ userTasks }: { userTasks: EnrichedUserTask[] }) {
	const router = useRouter();
	const orderedTasks = userTasks.sort((a, b) => a.grid_column - b.grid_column);
	const handleClick = (task: EnrichedUserTask) => {
		if (task.type !== 'center') {
			if (task.type === 'empty') {
				router.push(`b/${task.id}/freespace`);
				return;
			}
			router.push(`b/${task.id}`);
		}
	};
	const items = orderedTasks.map((task) => (
		<article
			className={`w-1/5 h-28 text-sm text-gold text-center border-lightGold border m-0.5 rounded-sm flex items-center ${task.type !== 'center' ? 'p-2' : ''}`}
			key={task.task_id}
			onClick={() => handleClick(task)}
		>
			{task.type !== 'center' ? task.description : <Image src={centerPhoto} alt="a + e, andrew and erika" />}
		</article>
	));
	return <div className="flex">{items}</div>;
}
