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

			<div className="flex justify-center w-72 h-full">
				<video className="h-full w-full rounded-lg" controls autoPlay>
					<source
						src="https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-18T00%3A53%3A28.104Z"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				{/* <Player
					component={GeneratedVideo}
					inputProps={{data: testVideoData}}
					durationInFrames={30 * 60 * 2}
					fps={30}
					compositionHeight={1920}
					compositionWidth={1080}
					style={{
						// Can't use tailwind class for width since player's default styles take presedence over tailwind's,
						// but not over inline styles
						width: '100%',
					}}
					controls
					autoPlay
					loop
				/> */}
			</div>
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
