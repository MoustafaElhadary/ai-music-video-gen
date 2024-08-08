'use client';

const giddySteps = [
	{
		icon: '✍️',
		text: 'Write a creative prompt describing your dream music video',
	},
	{icon: '📸', text: 'Upload your favorite photos or video clips'},
	{
		icon: '🤖',
		text: 'Let our AI work its magic to create your unique music video',
	},
	{icon: '📱', text: "Add the recipient's phone number"},
	{icon: '🚀', text: 'Share your Giddy creation instantly!'},
];

export const GiddySteps = () => {
	return (
		<>
			<h2 className="mb-6 text-center text-2xl font-bold">
				The Giddy Magic in 5 Steps
			</h2>
			<ol className="list-none space-y-4 mb-8 text-base">
				{giddySteps.map((step, index) => (
					<li key={index} className="flex items-center">
						<span className="mr-4 text-2xl">{step.icon}</span>
						<span>
							{index + 1}. {step.text}
						</span>
					</li>
				))}
			</ol>
		</>
	);
};
