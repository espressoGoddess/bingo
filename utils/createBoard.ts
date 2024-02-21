//fn that takes a list of tasks, returns an array of user tasks, then use the Board component to render
//filter to remove center
//shuffle remaining
//loop thru and assign grid row and column
//when get to row 2 column 2, skip

import { Task } from './types';

//add center with fixedd lovation
export default function createBoard(tasks: Task[], userId: number) {
	//verify length of items (in case theres too many)
	const center = tasks
		.filter((task) => task.type === 'center')
		.map((task) => ({
			task_id: task.id,
			user_id: userId,
			completed: false,
			grid_row: 2,
			grid_column: 2,
			description: task.description,
			type: task.type,
		}));
	const remaining = shuffle(tasks.filter((task) => task.type !== 'center'));
	let row = 0;
	let col = 0;
	const userTasks = [...center];
	for (let i = 0; i < remaining.length; i++) {
		userTasks.push({
			task_id: remaining[i].id,
			user_id: userId,
			completed: false,
			grid_row: row,
			grid_column: col,
			description: remaining[i].description,
			type: remaining[i].type,
		});
		col++;
		if (col > 4) {
			col = 0;
			row++;
		}
		if (col === 2 && row === 2) col++;
	}
	return userTasks;
}

function shuffle(a: Task[]) {
	const b = [...a];
	var j, x, i;
	for (i = b.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = b[i];
		b[i] = b[j];
		b[j] = x;
	}
	return b;
}

//from('userTasks').select('*, tasks:task_id (*)')
