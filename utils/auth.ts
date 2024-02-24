import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { User } from './types';

export default async function getUser(redirectTo?: string): Promise<User> {
	const session = await getServerSession(authOptions);
	if (!session) return redirect(`/login?redirect_to=${encodeURIComponent(redirectTo ?? '')}`);
	const supabase = createClient();

	const { data: user } = await supabase.from('users').select().eq('email', session.user?.email);
	if (!user?.length) {
		const { data: newUser, error } = await supabase
			.from('users')
			.insert({ name: session.user?.name, email: session.user?.email, profile_photo: session.user?.image })
			.select();
		if (!newUser) throw new Error('failed to create new user');
		return newUser[0];
	}
	return user[0];
}
//if error tell user to retry?
