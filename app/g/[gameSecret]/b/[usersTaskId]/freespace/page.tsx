import getUser from '@/utils/auth';
import { createClient } from '@/utils/supabase/server';

export default async function Page({ params }: { params: { gameSecret: string; usersTaskId: number } }) {
	const supabase = createClient();
	const user = await getUser(`/g/${params.gameSecret}/b/${params.usersTaskId}/freeSpace`);
	return <p>freespace</p>;
}
