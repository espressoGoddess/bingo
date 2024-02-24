import TaskDetails from '@/components/TaskDetails';
import getUser from '@/utils/auth';
import getSingleTaskDetails from '@/utils/getSingleTaskDetails';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: { gameSecret: string; usersTaskId: number } }) {
	const supabase = createClient();
	const user = await getUser(`/g/${params.gameSecret}/b/${params.usersTaskId}`);
	const { data: games } = await supabase
		.from('games')
		.select()
		.eq('secret', decodeURIComponent(params.gameSecret).toUpperCase());

	if (!games?.length) {
		return <p>Error: no game</p>;
	}
	const singleTaskDetails = await getSingleTaskDetails(games[0].id, user.id, params.usersTaskId);
	return <TaskDetails task={singleTaskDetails} gameSecret={params.gameSecret} />;
}
