import Image from 'next/image';
import Board from './Board';
import { useEffect, useState } from 'react';
import footerPhoto from '@/assets/footer-flowers.png';
import { EnrichedUserTask, Task, UserTask } from '@/utils/types';
import createBoard from '@/utils/createBoard';

export default function PrintableGame({ tasks }: { tasks: Task[] }) {
	const [taskCache, setTasks] = useState<UserTask[] | undefined>();
	useEffect(() => {
		setTasks(createBoard(tasks, 2));
	}, [tasks]);
	return (
		<section
			className="border border-gold border-dotted mx-auto mb-14 print:mb-0 pb-16 px-16 hide-border-print flex flex-col justify-around"
			style={{ width: 723 }}
		>
			<header className="text-gold text-center mt-16">
				<h1 className="text-7xl">VEGAS, BABY!</h1>
				<div className="flex justify-center items-center h-16  mt-2 mb-14">
					<div className="w-8 bg-gold h-0.5 mr-2"></div>
					<h2 className="text-xl">A game of luck and chance</h2>
					<div className="w-8 bg-gold h-0.5 ml-2"></div>
				</div>
			</header>
			<Board tasks={(taskCache as any[]) ?? []} printPreview />
			<footer className="flex w-full justify-center items-center pt-14">
				<Image alt="poppy flowers outlined in gold" height={89} width={250} src={footerPhoto} />
			</footer>
		</section>
	);
}

// function mockEnrichTasks(userTasks: UserTask[], gameId: number): EnrichedUserTask[] {
// 	return userTasks.map(uT => ({
// 		...uT,
// 		task_id: uT.id,
// 			user_id: 0,
// 			completed: false,
// 			game_id: gameId,
// 			id: 0,
// 			description: uT
// 			completed_at: null,
// 	}))
// }
