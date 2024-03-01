import React from 'react';
import Image from 'next/image';
import footerPhoto from '@/assets/footer-flowers.png';

export default function ScreenLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<section className="text-gold mx-6">
			<h1 className="text-4xl my-10">{title.toUpperCase() + '!'}</h1>
			{children}
			<footer className="flex w-full justify-center items-center pt-8">
				<Image alt="poppy flowers outlined in gold" height={89} width={250} src={footerPhoto} />
			</footer>
		</section>
	);
}
