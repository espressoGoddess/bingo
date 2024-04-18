'use server';
import getUser from './auth';
import { createClient } from './supabase/server';

export default async function addNewGame(
	name: string,
	tagline: string,
	allowsCustomTasks: boolean,
	numberOfCustomTasks: number,
	secret: string,
	id: number,
	gameStatus: string,
) {
	const supabase = createClient();
	const user = await getUser('/create-game');
	const { data, error } = await supabase
		.from('games')
		.update({
			name,
			tagline,
			allows_custom_tasks: allowsCustomTasks,
			number_of_Custom_tasks: numberOfCustomTasks,
			secret,
			game_status: gameStatus,
		})
		.eq('created_by_user_id', user.id)
		.eq('id', id);
	if (error) {
		throw Error(error.message);
	}
	if (data) return { name, tagline, numberOfCustomTasks };
}
