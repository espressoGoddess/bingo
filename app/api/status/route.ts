import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
	const supabase = createClient();
	try {
		const { count, error } = await supabase.from('games').select('*', {
			count: 'exact',
			head: true,
		});
		if (error) {
			console.error('Status check failed:', error);
			return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
		}
		console.log('Status check ok, game count:', count);
		return NextResponse.json({ status: 'ok' });
	} catch (error) {
		console.error('Status check threw:', error);
		return NextResponse.json({ status: 'error' }, { status: 500 });
	}
}
