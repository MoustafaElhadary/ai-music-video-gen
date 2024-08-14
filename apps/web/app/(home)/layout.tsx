/* eslint-disable @next/next/no-img-element */
'use client';

import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): React.ReactNode {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = (): void => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
				<div
					className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : ''}`}
				>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between py-4">
							<Link
								href="/"
								className="text-3xl font-bold text-blue-700 sm:text-4xl"
								style={{lineHeight: 1, letterSpacing: '-1px'}}
							>
								Get Giddy
							</Link>
							<nav>
								<SignedOut>
									<SignInButton mode="modal">
										<button className="bg-blue-700 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition-colors duration-300 text-sm">
											Sign In
										</button>
									</SignInButton>
								</SignedOut>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</nav>
						</div>
					</div>
				</div>

				{children}
			</div>
		</div>
	);
}
