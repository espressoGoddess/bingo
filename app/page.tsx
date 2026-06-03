import { authOptions } from '@/utils/auth';
import HomeForm from '@/components/HomeForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (!session) redirect('/login');

	return (
		<section className="text-gold mt-28 mx-10 flex flex-col items-center">
			<h1 className="text-5xl text-center my-14">WELCOME TO BINGO</h1>
			<HomeForm />
		</section>
	);
}
