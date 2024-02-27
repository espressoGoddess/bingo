import { createClient } from './supabase/server';

export default async function addFreeSpaceUserTask(
	userId: number,
	freeSpaceUserTask: string,
	taskId: number,
) {
	const supabase = createClient();
	console.log(freeSpaceUserTask, 'description inside route');
	const { data, error: fetchError } = await supabase
		.from('free_space_user_added_tasks')
		.insert({ user_id: userId, description: freeSpaceUserTask, user_task_id: taskId })
		.select();

	if (fetchError) {
		throw fetchError;
	}
	if (!data?.length) {
		throw new Error('issue adding task');
	}

	return freeSpaceUserTask;
}
