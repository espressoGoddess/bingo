'use server';
import getUser from './auth';
import { createClient } from './supabase/server';

export default async function addNewGame(
	name: string,
	tagline: string,
	allowCustomTasks: string,
	secret: string,
	id: number,
) {
	const supabase = createClient();
	const user = await getUser('/create-game');
	const { data, error } = await supabase
		.from('games')
		.update({ name, tagline, allows_custom_tasks: allowCustomTasks, secret })
		.eq('created_by_user_id', user.id)
		.eq('id', id);
	if (error) {
		throw Error(error.message);
	}
	if (data) return { name, tagline, allowCustomTasks };
}
