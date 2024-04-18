'use server';
import getUser from './auth';
import { createClient } from './supabase/server';

export default async function addNewGame(
	name: string,
	tagline: string,
	allowsCustomTasks: boolean,
	numberOfCustomTasks: number,
	secret: string,
	gameStatus: string,
) {
	console.log(numberOfCustomTasks);
	const supabase = createClient();
	const user = await getUser('/create-game');
	const { data, error } = await supabase.from('games').insert({
		name,
		tagline,
		allows_custom_tasks: allowsCustomTasks,
		number_of_custom_tasks: numberOfCustomTasks,
		created_by_user_id: user.id,
		secret,
		game_status: gameStatus,
	});
	if (error) {
		throw Error(error.message);
	}
	if (data) return { name, tagline, numberOfCustomTasks };
}
