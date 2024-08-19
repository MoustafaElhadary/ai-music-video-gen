/* eslint-disable @next/next/no-img-element */
'use client';

import {FlipWords} from '@web/components/ui/flip-words';
import React from 'react';
import {FAQ} from './faq';
import VideoGenerationForm from './form/videoGenerationForm';
import {WhyGetGiddy} from './whyGetGiddy';

const Page: React.FC = () => {
	const occasions = ['birthday', 'funny', 'graduation', 'rap beef'];
	const subjects = ['friend', 'enemy', 'mother', 'brother', 'neighbor'];

	return (
		<div className="mx-auto max-w-7xl pt-safe mt-5">
			<br />
			<span className="max-w-xl text-2xl font-semibold text-blue-700">
				Create an <i>AI-Powered</i>{' '}
				<FlipWords words={occasions} className="font-bold" />
				music video for your
				<FlipWords words={subjects} className="font-bold" />
			</span>
			<div className="mt-8 border-2 border-dashed border-blue-700 p-6 text-blue-700 relative rounded-lg">
				<div className="mx-auto max-w-md">
					<VideoGenerationForm />
					<p className="mt-4 text-center text-lg">
						<span className="line-through font-bold">$37.00</span>{' '}
						<span className="font-bold text-green-600">$14.99</span> for early
						access!
					</p>
					<p className="mt-2 text-center text-sm text-gray-600">
						Limited time offer. Get Giddy now and save!
					</p>
				</div>
			</div>
			<WhyGetGiddy />

			{/* TODO: Add video showcase */}
			{/* <VideoShowcase /> */}

			<FAQ />

			<footer className="mt-12 text-center text-sm text-gray-600">
				<a href="#" className="hover:underline mr-4">
					Privacy Policy
				</a>
				<a href="#" className="hover:underline">
					Terms of Service
				</a>
				<p className="mt-2">&copy; 2024 Giddy. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Page;
