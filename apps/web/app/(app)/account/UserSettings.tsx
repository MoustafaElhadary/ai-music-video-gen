'use client';
import UpdateNameCard from './UpdateNameCard';
import UpdateEmailCard from './UpdateEmailCard';
import {AuthSession} from '@web/lib/auth/utils';

export default function UserSettings({
	session,
}: {
	session: AuthSession['session'];
}): JSX.Element {
	return (
		<>
			<UpdateNameCard name={session?.user.name ?? ''} />
			<UpdateEmailCard email={session?.user.email ?? ''} />
		</>
	);
}
