'use client';

import {trpc} from '@web/lib/trpc/client';
import confetti from 'canvas-confetti';
import {useEffect} from 'react';

export default function PaymentSuccessPage(): JSX.Element {
	const {data: userGenerations, isLoading} =
		trpc.generationRequests.getAll.useQuery({});

	useEffect(() => {
		(
			confetti({
				particleCount: 100,
				spread: 70,
				origin: {y: 0.6},
			}) as Promise<void>
		).catch((error) => {
			console.error('Confetti failed:', error);
		});
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Payment Successful!</h1>
			<h2 className="text-2xl font-semibold mb-4">Your Generations</h2>
			{userGenerations && userGenerations.length > 0 ? (
				<ul className="space-y-4">
					{userGenerations.map((generation) => (
						<li key={generation.id} className="border p-4 rounded-lg">
							<p>
								<strong>Occasion:</strong> {generation.occasion}
							</p>
							<p>
								<strong>Recipient:</strong> {generation.recipientName}
							</p>
							<p>
								<strong>Status:</strong> {generation.status}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p>No generations found.</p>
			)}
		</div>
	);
}
