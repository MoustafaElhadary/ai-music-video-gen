/* eslint-disable @next/next/no-img-element */
'use client';

import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';
import {FlipWords} from '@web/components/ui/flip-words';
import React, {useRef} from 'react';
import {FAQ} from './faq';
import GiddyForm from './giddyForm';
import {GiddySteps} from './giddySteps';
import {VideoShowcase} from './videoShowcase';
import {WhyGetGiddy} from './whyGetGiddy';

const Page: React.FC = () => {
	const textboxRef = useRef<HTMLHeadingElement>(null);

	const scrollToTextbox = () => {
		textboxRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	const occasions = ['birthday', 'funny', 'graduation', 'rap beef'];
	const subjects = ['friend', 'enemy', 'mother', 'brother', 'neighbor'];

	return (
		<div className="min-h-screen bg-[#f7edda] font-sans">
			<div
				className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-[length:270px_270px] bg-[0_0]"
				style={{
					backgroundImage: `url('https://cdn.prod.website-files.com/668724b7cc0fdf949c8c31f5/668727607bb532875ab4695f_Frame%201.png')`,
					backgroundPosition: ' 0 0',
					backgroundSize: '270px',
				}}
			>
				<nav className="absolute top-0 right-0 m-4 z-10">
					<SignedOut>
						<SignInButton mode="modal">
							<button className="bg-blue-700 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors duration-300">
								Sign In
							</button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</nav>
				<div className="mx-auto max-w-7xl">
					<h1
						className="mb-2 text-6xl font-bold text-blue-700 sm:text-7xl md:text-8xl lg:text-9xl"
						style={{lineHeight: 1, letterSpacing: '-3px'}}
					>
						Get Giddy
					</h1>
					<br />
					<span className="max-w-xl text-2xl font-semibold text-blue-700">
						AI-Powered <FlipWords words={occasions} className="font-bold" />
						music video for your
						<FlipWords words={subjects} className="font-bold" /> 🎁✨
					</span>
					<div className="mt-8 border-2 border-dashed border-blue-700 p-6 text-blue-700 relative rounded-lg">
						<button
							className="absolute -top-4 right-4 rounded-full bg-blue-700 px-6 py-3 text-xs text-white font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
							onClick={scrollToTextbox}
						>
							GIDDY UP!
						</button>
						<p className="mx-auto mb-8 max-w-2xl text-center text-lg">
							Giddy&apos;s got your back! We&apos;re the AI wizards turning your
							wildest ideas into mind-blowing music videos. Perfect for
							surprising your squad, serenading your crush, or just flexing your
							creative muscles. 🚀🎶
						</p>
						<div className="mx-auto max-w-md">
							<GiddySteps />
							<h2
								className="mb-6 text-center text-2xl font-bold"
								ref={textboxRef}
							>
								Ready to Get Giddy?
							</h2>
							<GiddyForm />
							<p className="mt-4 text-center text-lg">
								<span className="line-through font-bold">$37.00</span>{' '}
								<span className="font-bold text-green-600">$19.99</span> for
								early access!
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
			</div>
		</div>
	);
};

export default Page;
