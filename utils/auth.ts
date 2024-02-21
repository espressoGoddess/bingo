import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export default async function getUser() {
	const session = await getServerSession(authOptions);
	if (!session) return redirect('/login');
	console.log(session);
	const supabase = createClient();

	const { data: user } = await supabase.from('users').select().eq('email', session.user?.email);
	if (!user?.length) {
		console.log('no user yet');
		const { data: newUser, error } = await supabase
			.from('users')
			.insert({ name: session.user?.name, email: session.user?.email, profile_photo: session.user?.image })
			.select();
		console.log(newUser);
		if (!newUser) throw new Error('failed to create new user');
		return newUser[0];
	}
	return user[0];
}
//if error tell user to retry?
