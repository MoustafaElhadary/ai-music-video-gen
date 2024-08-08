/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

const videos = [
	{id: 1, title: 'Birthday Bash', creator: 'PartyKing23'},
	{id: 2, title: 'Graduation Day', creator: 'FutureCEO'},
	{id: 3, title: 'Wedding Bliss', creator: 'LovebirdsForever'},
	{id: 4, title: 'Road Trip Memories', creator: 'Wanderlust99'},
	{id: 5, title: 'First Date Vibes', creator: 'RomanceGuru'},
	{id: 6, title: 'Family Reunion', creator: 'ClanGatherer'},
	{id: 7, title: 'Pet Parade', creator: 'FurryFriends'},
	{id: 8, title: 'Sports Highlights', creator: 'MVPlayer'},
];

interface VideoCardProps {
	video: {
		id: number;
		title: string;
		creator: string;
	};
	index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({video, index}) => (
	<div
		className={`flex-shrink-0 w-64 h-96 bg-white rounded-lg shadow-lg overflow-hidden transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'} hover:rotate-0 transition-transform duration-300`}
	>
		<div className="h-3/4 bg-gray-300 flex items-center justify-center">
			<img
				src={`/api/placeholder/256/240`}
				alt={video.title}
				className="w-full h-full object-cover"
				loading="lazy"
			/>
		</div>
		<div className="p-4">
			<h4 className="font-bold text-lg mb-1">{video.title}</h4>
			<p className="text-sm text-gray-600">by {video.creator}</p>
		</div>
	</div>
);

export const VideoShowcase: React.FC = () => (
	<div className="mt-12 overflow-hidden">
		<h3 className="text-2xl font-bold mb-4 text-center bg-[#f7edda] py-2 z-10">
			Giddy Creations
		</h3>
		<div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide pl-8">
			{videos.map((video, index) => (
				<VideoCard key={video.id} video={video} index={index} />
			))}
		</div>
	</div>
);
