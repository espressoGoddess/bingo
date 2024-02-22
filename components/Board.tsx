import Image from 'next/image';
import centerPhoto from '@/assets/bingo-center.png';
import { UserTask } from '@/utils/types';

export default function Board({ tasks }: { tasks: UserTask[] }) {
	const orderedTasks = tasks.sort((a, b) => a.grid_row - b.grid_row);
	return (
		<div>
			<BoardRow userTasks={orderedTasks.slice(0, 5)} />
			<BoardRow userTasks={orderedTasks.slice(5, 10)} />
			<BoardRow userTasks={orderedTasks.slice(10, 15)} />
			<BoardRow userTasks={orderedTasks.slice(15, 20)} />
			<BoardRow userTasks={orderedTasks.slice(20, 25)} />
		</div>
	);
}

function BoardRow({ userTasks }: { userTasks: UserTask[] }) {
	const orderedTasks = userTasks.sort((a, b) => a.grid_column - b.grid_column);
	const items = orderedTasks.map((task, index) => (
		<article
			className={`w-1/5 h-28 text-sm text-gold text-center border-lightGold border m-0.5 rounded-sm flex items-center ${task.type !== 'center' ? 'p-2' : ''}`}
			key={index}
		>
			{task.type !== 'center' ? task.description : <Image src={centerPhoto} alt="a + e, andrew and erika" />}
		</article>
	));
	return <div className="flex">{items}</div>;
}
