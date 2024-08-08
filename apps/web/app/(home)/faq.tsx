'use client';

import {ChevronDown, ChevronUp} from 'lucide-react';
import React, {useState} from 'react';
const faqs = [
	{
		question: 'How does Giddy work?',
		answer:
			'Giddy uses AI to turn your text prompts, photos, and video clips into unique music videos. Describe your idea, upload your media, and our AI will create a custom video for you!',
	},
	{
		question: 'Can I edit the videos Giddy creates?',
		answer:
			"While Giddy doesn't offer direct editing, you can refine your results by adjusting your prompt and trying different combinations of photos and video clips.",
	},
	{
		question: 'How long does it take to create a video?',
		answer:
			"Most videos are ready within 5-10 minutes, but complex requests might take up to 30 minutes. We'll keep you updated on the progress!",
	},
	{
		question: 'Is there a limit to how many videos I can create?',
		answer:
			"With our current early access offer, you can create up to 10 videos per month. We'll be introducing different plans soon with varying video limits!",
	},
];

export const FAQ: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	return (
		<div className="mt-12">
			<h3 className="text-2xl font-bold mb-4 text-center">
				Frequently Asked Questions
			</h3>
			<div className="space-y-4">
				{faqs.map((faq, index) => (
					<div
						key={index}
						className="border border-blue-700 rounded-lg overflow-hidden"
					>
						<button
							className="w-full px-4 py-2 text-left font-bold flex justify-between items-center bg-blue-100 hover:bg-blue-200 transition-colors duration-300"
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
						>
							{faq.question}
							{openIndex === index ? (
								<ChevronUp size={20} />
							) : (
								<ChevronDown size={20} />
							)}
						</button>
						{openIndex === index && (
							<div className="px-4 py-2 bg-white">
								<p>{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
