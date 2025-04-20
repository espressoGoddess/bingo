import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createClient();
	try {
		const { count, error } = await supabase.from('games').select('*', {
			count: 'exact',
			head: true,
		});
		console.log(count, error);
	} catch {}
	return NextResponse.json({ status: 'ok' });
}
