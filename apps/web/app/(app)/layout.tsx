import Navbar from '@web/components/Navbar';
import Sidebar from '@web/components/Sidebar';
import {checkAuth} from '@web/lib/auth/utils';
export default function AppLayout({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
	checkAuth();
	return (
		<main>
			<div className="flex h-screen">
				<Sidebar />
				<main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
					<Navbar />
					{children}
				</main>
			</div>
		</main>
	);
}
