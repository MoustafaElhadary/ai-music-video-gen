import {ClerkProvider} from '@clerk/nextjs';
import {ThemeProvider} from '@web/components/ThemeProvider';
import TrpcProvider from '@web/lib/trpc/Provider';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {cookies} from 'next/headers';
import './globals.css';
import {Toaster} from 'sonner';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'Get Giddy',
	description: 'Create AI-Powered music videos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.ReactNode {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
				/>
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					disableTransitionOnChange
				>
					<ClerkProvider>
						<TrpcProvider cookies={cookies().toString()}>
							{children}
						</TrpcProvider>
					</ClerkProvider>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
