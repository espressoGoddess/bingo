'use server';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export default async function checkForGame(gameSecret: string) {
	const supabase = createClient();
	const { data: game } = await supabase
		.from('games')
		.select()
		.eq('secret', decodeURIComponent(gameSecret).toUpperCase());

	if (game?.length) {
		return redirect(`/g/${gameSecret}`);
	}
	return { title: 'GAME NOT FOUND', subtitle: 'Try a different secret' };
}
