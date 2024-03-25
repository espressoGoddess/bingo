'use server';
import getUser from './auth';
import { createClient } from './supabase/server';

export default async function addNewGame(
	name: string,
	tagline: string,
	allowCustomTasks: string,
	secret: string,
) {
	const supabase = createClient();
	const user = await getUser('/create-game');
	const { data, error } = await supabase
		.from('games')
		.insert({ name, tagline, allows_custom_tasks: allowCustomTasks, created_by_user_id: user.id, secret });
	if (error) {
		throw Error(error.message);
	}
	if (data) return { name, tagline, allowCustomTasks };
}
