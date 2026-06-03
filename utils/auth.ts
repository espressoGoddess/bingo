import { cache } from 'react';
import { NextAuthOptions, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';
import { User } from './types';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET_ID as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET as string,
};

const fetchUserByEmail = cache(async (email: string, name: string | null | undefined, image: string | null | undefined): Promise<User> => {
	const supabase = createClient();
	const { data: user, error: selectError } = await supabase.from('users').select().eq('email', email);
	if (selectError) throw selectError;
	if (!user?.length) {
		const { data: newUser, error: insertError } = await supabase
			.from('users')
			.insert({ name, email, profile_photo: image })
			.select();
		if (insertError) throw insertError;
		if (!newUser?.length) throw new Error('failed to create new user');
		return newUser[0];
	}
	return user[0];
});

export default async function getUser(redirectTo?: string): Promise<User> {
	const session = await getServerSession(authOptions);
	if (!session) return redirect(`/login?redirect_to=${encodeURIComponent(redirectTo ?? '')}`);
	return fetchUserByEmail(session.user!.email!, session.user?.name, session.user?.image);
}
