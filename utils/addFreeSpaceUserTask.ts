import { createClient } from './supabase/server';

export default async function addFreeSpaceUserTask(
	userId: number,
	freeSpaceUserTask: string,
	taskId: number,
) {
	const supabase = createClient();
	const { data: userTask } = await supabase
		.from('users_tasks')
		.select()
		.eq('user_id', userId)
		.eq('id', taskId);
	if (!userTask?.length) {
		throw new Error('Invalid user task ID');
	}
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
