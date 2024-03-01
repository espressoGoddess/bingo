'use server';
import { revalidatePath } from 'next/cache';
import getUser from './auth';
import { createClient } from './supabase/server';

export default async function addFreeSpaceUserTask(freeSpaceUserTask: string, taskId: number) {
	const user = await getUser();
	const supabase = createClient();
	const { data: userTask } = await supabase
		.from('users_tasks')
		.select()
		.eq('user_id', user.id)
		.eq('id', taskId);
	if (!userTask?.length) {
		throw new Error('Invalid user task ID');
	}
	const { data, error: fetchError } = await supabase
		.from('free_space_user_added_tasks')
		.insert({ user_id: user.id, description: freeSpaceUserTask, user_task_id: taskId })
		.select();

	if (fetchError) {
		throw fetchError;
	}
	if (!data?.length) {
		throw new Error('issue adding task');
	}

	revalidatePath('/g/[gameSecret]/b', 'page');
	return freeSpaceUserTask;
}
