export type Task = {
	type: string;
	description: string;
	game_id: number;
	id: number;
};

export type UserTask = {
	task_id: number;
	user_id: number;
	completed: boolean;
	grid_row: number;
	grid_column: number;
	description: string;
	type: string;
};
