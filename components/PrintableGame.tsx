import Board from './Board';
import { useEffect, useState } from 'react';
import { Task, UserTask } from '@/utils/types';
import createBoard from '@/utils/createBoard';

export default function PrintableGame({
	tasks,
	title,
	subtitle,
}: {
	tasks: Task[];
	title: string;
	subtitle: string;
}) {
	const [taskCache, setTasks] = useState<UserTask[] | undefined>();
	useEffect(() => {
		setTasks(createBoard(tasks, 2));
	}, [tasks]);
	return (
		<section
			className="border border-gold border-dotted mx-auto mb-14 print:mb-0 pb-16 px-16 hide-border-print flex flex-col justify-around"
			style={{ width: 723 }}
		>
			<header className="text-gold text-center mt-10">
				<h1 className="text-5xl">{title?.toUpperCase()}</h1>
				<div className="flex justify-center items-center h-16  mt-2 mb-14">
					<div className="w-8 bg-gold h-0.5 mr-2"></div>
					<h2 className="text-xl">{subtitle}</h2>
					<div className="w-8 bg-gold h-0.5 ml-2"></div>
				</div>
			</header>
			<Board tasks={(taskCache as any[]) ?? []} printPreview />
		</section>
	);
}
