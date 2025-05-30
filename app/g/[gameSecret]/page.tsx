import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Page({ params }: { params: { gameSecret: string } }) {
	const supabase = createClient();
	const { data: game } = await supabase
		.from('games')
		.select()
		.eq('secret', decodeURIComponent(params.gameSecret));

	if (game?.length) {
		return (
			<section className="text-gold text-l mt-28 mx-8">
				<h1>
					Welcome to <br />
					<span className="text-5xl">{game[0].name.toUpperCase() + '!'}</span>
				</h1>
				<p className="my-28">
					A game of <br />
					<span className="text-5xl">{game[0].tagline.toUpperCase()}</span>
				</p>
				<div className="w-full flex justify-center">
					<Link
						className="border bg-lightGold text-5xl py-2 px-20 rounded-md border-lightGold bg-opacity-20"
						href={`/g/${params.gameSecret}/b`}
					>
						Start
					</Link>
				</div>
			</section>
		);
	}
	return (
		<section className="text-gold text-l mt-28 mx-8">
			<h1 className="text-3xl">GAME NOT FOUND</h1>
			<p className="text-center">Try a different secret</p>
		</section>
	);
}
