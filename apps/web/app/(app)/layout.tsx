import {checkAuth} from '@web/lib/auth/utils';
import {Toaster} from '@web/components/ui/sonner';
import Navbar from '@web/components/Navbar';
import Sidebar from '@web/components/Sidebar';
import {ClerkProvider} from '@clerk/nextjs';
import TrpcProvider from '@web/lib/trpc/Provider';
import {cookies} from 'next/headers';
export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await checkAuth();
	return (
		<main>
			<ClerkProvider>
				<TrpcProvider cookies={cookies().toString()}>
					<div className="flex h-screen">
						<Sidebar />
						<main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
							<Navbar />
							{children}
						</main>
					</div>
				</TrpcProvider>
			</ClerkProvider>

			<Toaster richColors />
		</main>
	);
}
