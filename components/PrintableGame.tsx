import Image from 'next/image';
import Board from './Board';
import { useEffect, useState } from 'react';
import footerPhoto from '@/assets/footer-flowers.png';

export type Task = {
	type: string;
	task?: string;
};

export default function PrintableGame({ tasks }: { tasks: Task[] }) {
	const [taskCache, setTasks] = useState(tasks);
	useEffect(() => {
		setTasks(shuffle(tasks));
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
			<Board tasks={taskCache} />
			<footer className="flex w-full justify-center items-center pt-14">
				<Image alt="poppy flowers outlined in gold" height={89} width={250} src={footerPhoto} />
			</footer>
		</section>
	);
}

function shuffle(a: any[]) {
	const b = [...a];
	var j, x, i;
	for (i = b.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = b[i];
		b[i] = b[j];
		b[j] = x;
	}
	return b;
}
