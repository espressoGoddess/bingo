import getUser from '@/utils/auth';

export default async function GameLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { gameSecret: string };
}) {
	await getUser(`/g/${params.gameSecret}`);
	return <>{children}</>;
}
