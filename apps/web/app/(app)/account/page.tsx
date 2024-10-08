import UserSettings from './UserSettings';
import {checkAuth, getUserAuth} from '@web/lib/auth/utils';

export default async function Account(): Promise<JSX.Element> {
	checkAuth();
	const {session} = await getUserAuth();

	return (
		<main>
			<h1 className="text-2xl font-semibold my-4">Account</h1>
			<div className="space-y-4">
				<UserSettings session={session} />
			</div>
		</main>
	);
}
