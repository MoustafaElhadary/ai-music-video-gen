import {auth, currentUser} from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';

export type AuthSession = {
	session: {
		user: {
			id: string;
			name?: string;
			email?: string;
		};
	} | null;
};

export const getUserAuth = async (): Promise<AuthSession> => {
	const {userId} = auth();
	const user = await currentUser();

	if (userId) {
		return {
			session: {
				user: {
					id: userId,
					name: `${user?.firstName} ${user?.lastName}`,
					email: user?.emailAddresses?.[0]?.emailAddress,
				},
			},
		} as AuthSession;
	} else {
		return {session: null};
	}
};

export const checkAuth = (): void => {
	const {userId} = auth();
	if (!userId) redirect('/sign-in');
};
