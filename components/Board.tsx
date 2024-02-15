import Image from 'next/image';
import { Task } from './PrintableGame';
import centerPhoto from '@/assets/bingo-center.png';

export default function Board({ tasks }: { tasks: Task[] }) {
	return (
		<div>
			<BoardRow tasks={tasks.slice(0, 5)} />
			<BoardRow tasks={tasks.slice(5, 10)} />
			<BoardRow center tasks={tasks.slice(10, 14)} />
			<BoardRow tasks={tasks.slice(14, 19)} />
			<BoardRow tasks={tasks.slice(19, 24)} />
		</div>
	);
}

function BoardRow({ tasks, center }: { tasks: Task[]; center?: boolean }) {
	tasks = !center ? tasks : [...tasks.slice(0, 2), { type: 'centerImage' }, ...tasks.slice(2, 4)];
	const items = tasks.map((task, index) => (
		<article
			className={`w-1/5 h-28 text-sm text-gold text-center border-lightGold border m-0.5 rounded-sm flex items-center ${task.type === 'string' ? 'p-2' : ''}`}
			key={index}
		>
			{task.type === 'string' ? task.task : <Image src={centerPhoto} alt="a + e, andrew and erika" />}
		</article>
	));
	return <div className="flex">{items}</div>;
}
