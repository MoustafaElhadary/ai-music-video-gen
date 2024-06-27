import {Analytics} from '@vercel/analytics/react';
import type {Metadata} from 'next';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

export const metadata: Metadata = {
	title: 'suno api',
	description: 'Use API to call the music generation ai of suno.ai',
	keywords: ['suno', 'suno api', 'suno.ai', 'api', 'music', 'generation', 'ai'],
	creator: '@gcui.ai',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`overflow-y-scroll`}>
				<Header />
				<main className="flex flex-col items-center m-auto w-full">
					{children}
				</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
