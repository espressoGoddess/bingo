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
	id: number;
};

export type EnrichedUserTask = UserTask & {
	description: string;
	type: string;
	game_id: number;
};

export type User = {
	email: string;
	profile_photo: string;
	name: string;
	id: number;
};

export type SingleTaskDetails = {
	description: string;
	completed: boolean;
	grid_row: number;
	grid_column: number;
	completed_at?: Date;
	id: number;
};
