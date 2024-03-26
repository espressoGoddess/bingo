import CreateOrEditGame from '@/components/CreateOrEditGame';
import getUser from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: { gameId: string } }) {
	const user = await getUser();
	const supabase = createClient();
	const { data: gameInfo, error } = await supabase
		.from('games')
		.select()
		.eq('id', parseInt(params.gameId))
		.eq('created_by_user_id', user.id);
	if (error) console.error(error);

	if (gameInfo?.length) {
		return (
			<CreateOrEditGame
				game={{
					id: gameInfo[0].id,
					name: gameInfo[0].name,
					tagline: gameInfo[0].tagline,
					secret: gameInfo[0].secret,
					allowCustomTasks: gameInfo[0].allowsCustomTasks,
					createdByUserId: gameInfo[0].created_by_user_id,
				}}
			/>
		);
	}
	return <h1 className="text-3xl text-gold text-center mt-14 mb-3">No game found :(</h1>;
}
