import Board from '@/components/Board';
import ScreenLayout from '@/components/ScreenLayout';
import getUser from '@/utils/auth';
import createBoard from '@/utils/createBoard';
import getUserTasksWithInfo from '@/utils/getUserTasks';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: { gameSecret: string } }) {
	const supabase = createClient();
	const user = await getUser(`/g/${params.gameSecret}/b/`);
	const { data: games } = await supabase
		.from('games')
		.select()
		.eq('secret', decodeURIComponent(params.gameSecret));

	if (!games?.length) {
		return <p>Error: no game</p>;
	}

	const { count } = await supabase
		.from('users_tasks')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user.id);

	if (count) {
		const userTasks = await getUserTasksWithInfo(games[0].id, user.id);
		return (
			<ScreenLayout title={games[0].name}>
				<Board tasks={userTasks} />
			</ScreenLayout>
		);
	}

	const { data: tasks } = await supabase.from('tasks').select().eq('game_id', games[0].id);
	if (!tasks?.length) {
		return <p>Error: missing game tasks</p>;
	}

	const newTasks = createBoard(tasks, user.id);
	const { error } = await supabase.from('users_tasks').insert(
		newTasks.map((task) => ({
			task_id: task.task_id,
			user_id: task.user_id,
			completed: task.completed,
			grid_row: task.grid_row,
			grid_column: task.grid_column,
		})),
	);
	const newUserTasks = await getUserTasksWithInfo(games[0].id, user.id);
	if (error) {
		throw error;
	}
	return (
		<ScreenLayout title={games[0].name}>
			<Board tasks={newUserTasks} />
		</ScreenLayout>
	);
}
