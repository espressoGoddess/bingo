import { EnrichedUserTask } from '@/utils/types';
import BoardRow from './BoardRow';

export default function Board({ tasks }: { tasks: EnrichedUserTask[] }) {
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
