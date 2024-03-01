import { EnrichedUserTask } from '@/utils/types';
import BoardRow from './BoardRow';

export default function Board({
	tasks,
	printPreview,
}: {
	tasks: EnrichedUserTask[];
	printPreview?: boolean;
}) {
	const orderedTasks = tasks.sort((a, b) => a.grid_row - b.grid_row);
	return (
		<div>
			<BoardRow userTasks={orderedTasks.slice(0, 5)} printPreview={printPreview} />
			<BoardRow userTasks={orderedTasks.slice(5, 10)} printPreview={printPreview} />
			<BoardRow userTasks={orderedTasks.slice(10, 15)} printPreview={printPreview} />
			<BoardRow userTasks={orderedTasks.slice(15, 20)} printPreview={printPreview} />
			<BoardRow userTasks={orderedTasks.slice(20, 25)} printPreview={printPreview} />
		</div>
	);
}
