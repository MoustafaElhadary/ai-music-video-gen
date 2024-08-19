'use client';
import {RequestStatusSchema} from '@server/prisma/generated/zod';
import type {RequestStatusType} from '@server/prisma/generated/zod';
import {Alert, AlertDescription, AlertTitle} from '@web/components/ui/alert';
import {Button} from '@web/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@web/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@web/components/ui/carousel';
import {Progress} from '@web/components/ui/progress';
import {Skeleton} from '@web/components/ui/skeleton';
import {trpc} from '@web/lib/trpc/client';
import {
	AlertCircle,
	Camera,
	CheckCircle2,
	Music,
	RefreshCw,
	Sparkles,
	Subtitles,
	Upload,
	Video,
} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import React from 'react';

const RequestStatus = RequestStatusSchema.enum;

const statusOrder: RequestStatusType[] = [
	RequestStatus.STARTED,
	RequestStatus.FILLED,
	RequestStatus.PAID,
	RequestStatus.AUDIO_PROCESSING,
	RequestStatus.AUDIO_PROCESSED,
	RequestStatus.SUBTITLE_PROCESSING,
	RequestStatus.SUBTITLE_PROCESSED,
	RequestStatus.IMAGE_PROCESSING,
	RequestStatus.IMAGE_PROCESSED,
	RequestStatus.VIDEO_PROCESSING,
	RequestStatus.VIDEO_PROCESSED,
	RequestStatus.UPLOADING,
	RequestStatus.UPLOADED,
	RequestStatus.COMPLETED,
];

const getStatusIndex = (status: RequestStatusType) =>
	statusOrder.indexOf(status);

const getProgressPercentage = (status: RequestStatusType) => {
	const index = getStatusIndex(status);
	return Math.min(
		Math.max(Math.round((index / (statusOrder.length - 1)) * 100), 0),
		100,
	);
};

const getStatusInfo = (status: RequestStatusType) => {
	switch (status) {
		case RequestStatus.STARTED:
			return {
				icon: <Sparkles className="h-5 w-5" />,
				message: "We're getting started on your video!",
			};
		case RequestStatus.AUDIO_PROCESSING:
			return {
				icon: <Music className="h-5 w-5" />,
				message: 'Creating the perfect soundtrack for your video...',
			};
		case RequestStatus.AUDIO_PROCESSED:
			return {
				icon: <Music className="h-5 w-5" />,
				message: 'Your custom soundtrack is ready!',
			};
		case RequestStatus.SUBTITLE_PROCESSING:
			return {
				icon: <Subtitles className="h-5 w-5" />,
				message: 'Adding captions to your video...',
			};
		case RequestStatus.SUBTITLE_PROCESSED:
			return {
				icon: <Subtitles className="h-5 w-5" />,
				message: 'Captions have been added successfully.',
			};
		case RequestStatus.IMAGE_PROCESSING:
			return {
				icon: <Camera className="h-5 w-5" />,
				message: 'Creating stunning visuals for your video...',
			};
		case RequestStatus.IMAGE_PROCESSED:
			return {
				icon: <Camera className="h-5 w-5" />,
				message: 'Your custom images are ready!',
			};
		case RequestStatus.VIDEO_PROCESSING:
			return {
				icon: <Video className="h-5 w-5" />,
				message: 'Putting all the pieces together...',
			};
		case RequestStatus.VIDEO_PROCESSED:
			return {
				icon: <Video className="h-5 w-5" />,
				message: 'Your video has been assembled!',
			};
		case RequestStatus.UPLOADING:
			return {
				icon: <Upload className="h-5 w-5" />,
				message: 'Uploading your video...',
			};
		case RequestStatus.UPLOADED:
			return {
				icon: <CheckCircle2 className="h-5 w-5" />,
				message: 'Your video has been uploaded successfully!',
			};
		case RequestStatus.COMPLETED:
			return {
				icon: <CheckCircle2 className="h-5 w-5" />,
				message: 'Your video is ready to view!',
			};
		default:
			return {
				icon: <AlertCircle className="h-5 w-5" />,
				message: 'Processing your video...',
			};
	}
};

const StatusStep: React.FC<{
	label: RequestStatusType;
	isActive: boolean;
	isCompleted: boolean;
}> = ({label, isActive, isCompleted}) => {
	const {icon} = getStatusInfo(label);
	return (
		<div
			className={`flex flex-col items-center ${isActive ? 'text-green-500 font-semibold' : 'text-gray-500'}`}
		>
			<div
				className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : isActive ? 'bg-green-500' : 'bg-gray-300'}`}
			>
				{React.cloneElement(icon, {
					className: `h-5 w-5 ${isCompleted || isActive ? 'text-white' : 'text-gray-500'}`,
				})}
			</div>
			<span className="mt-1 text-xs text-center">{label}</span>
		</div>
	);
};

export default function PaymentSuccessPage(): JSX.Element {
	const searchParams = useSearchParams();
	const generationId = searchParams.get('generationRequestId') ?? '';

	const {data: generationRequest, isLoading: isLoadingRequest} =
		trpc.generationRequests.getOne.useQuery(
			{where: {id: generationId}},
			{enabled: !!generationId},
		);

	if (isLoadingRequest) {
		return <GenerationRequestSkeleton />;
	}

	if (!generationRequest) {
		return <NoGenerationRequestFound />;
	}

	const progress = getProgressPercentage(generationRequest.status);
	const {icon, message} = getStatusInfo(generationRequest.status);

	return (
		<div className="min-h-screen p-4">
			<div className="max-w-3xl mx-auto space-y-6">
				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-blue-700">
							Payment Successful!
						</CardTitle>
						<CardDescription className="text-gray-600">
							Your AI-generated video is{' '}
							{generationRequest.status.toLowerCase()}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<Alert className="bg-green-50 border-green-200">
							<AlertTitle className="flex items-center text-green-700">
								{React.cloneElement(icon, {className: 'text-green-500 mr-2'})}
								<span>{generationRequest.status}</span>
							</AlertTitle>
							<AlertDescription className="text-green-600">
								{generationRequest.status !== 'COMPLETED' && message}
							</AlertDescription>
						</Alert>

						{getStatusIndex(generationRequest.status) >=
							getStatusIndex('IMAGE_PROCESSED') &&
						getStatusIndex(generationRequest.status) <
							getStatusIndex('VIDEO_PROCESSED') ? (
							<Card className="w-4/5 mx-auto">
								<CardContent className="p-4">
									<Carousel>
										<CarouselContent>
											{generationRequest.videoImages.map((image, index) => (
												<CarouselItem key={index}>
													<img
														src={image.photoId}
														alt={`Generated image ${index + 1}`}
														className="w-full h-auto rounded-lg"
													/>
												</CarouselItem>
											))}
										</CarouselContent>
										<CarouselPrevious />
										<CarouselNext />
									</Carousel>
								</CardContent>
							</Card>
						) : generationRequest.status === 'COMPLETED' &&
						  generationRequest.finalVideoPath ? (
							<div className="w-4/5 mx-auto">
								<video controls className="w-full rounded-lg shadow-md">
									<source
										src={generationRequest.finalVideoPath}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							</div>
						) : null}

						<div className="w-4/5 mx-auto space-y-2">
							<div className="flex justify-between text-sm font-medium">
								<span>Progress</span>
								<span>{progress}%</span>
							</div>
							<Progress value={progress} className="h-2 bg-gray-200">
								<div
									className="h-full bg-green-500 transition-all"
									style={{width: `${progress}%`}}
								/>
							</Progress>
						</div>

						<div className="flex justify-between items-center">
							{[
								RequestStatus.STARTED,
								RequestStatus.AUDIO_PROCESSED,
								RequestStatus.SUBTITLE_PROCESSED,
								RequestStatus.IMAGE_PROCESSED,
								RequestStatus.VIDEO_PROCESSED,
								RequestStatus.COMPLETED,
							].map((step) => (
								<StatusStep
									key={step}
									label={step}
									isActive={generationRequest.status === step}
									isCompleted={
										getStatusIndex(generationRequest.status) >
										getStatusIndex(step)
									}
								/>
							))}
						</div>

						<div className="bg-white p-4 rounded-lg shadow">
							<h3 className="text-lg font-semibold mb-2 text-blue-700">
								Video Details
							</h3>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="font-semibold text-gray-700">Occasion</p>
									<p className="text-gray-600">{generationRequest.occasion}</p>
								</div>
								<div>
									<p className="font-semibold text-gray-700">Recipient</p>
									<p className="text-gray-600">
										{generationRequest.recipientName}
									</p>
								</div>
								<div>
									<p className="font-semibold text-gray-700">Sender</p>
									<p className="text-gray-600">
										{generationRequest.senderName}
									</p>
								</div>
								<div>
									<p className="font-semibold text-gray-700">Created At</p>
									<p className="text-gray-600">
										{new Date(generationRequest.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
							<div className="mt-4">
								<p className="font-semibold text-gray-700">Prompt</p>
								<p className="text-gray-600">{generationRequest.prompt}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<PreviousGenerations />
			</div>
		</div>
	);
}

const GenerationRequestSkeleton: React.FC = () => (
	<div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 p-4">
		<div className="max-w-3xl mx-auto space-y-6">
			<Card className="shadow-lg">
				<CardHeader className="text-center">
					<Skeleton className="h-8 w-3/4 mx-auto" />
					<Skeleton className="h-4 w-1/2 mx-auto mt-2" />
				</CardHeader>
				<CardContent className="space-y-6">
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-40 w-4/5 mx-auto" />
					<Skeleton className="h-4 w-full" />
					<div className="flex justify-between">
						{[...Array(6)].map((_, i) => (
							<Skeleton key={i} className="h-12 w-12 rounded-full" />
						))}
					</div>
					<Skeleton className="h-40 w-full" />
				</CardContent>
			</Card>
		</div>
	</div>
);

const NoGenerationRequestFound: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 p-4">
			<div className="max-w-3xl mx-auto space-y-6">
				<Card className="shadow-lg">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-blue-700">
							No Generation Request Found
						</CardTitle>
						<CardDescription className="text-gray-600">
							We couldn&apos;t find the generation request you&apos;re looking
							for.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-center mb-4">
							Don&apos;t worry! You can start a new video generation or check
							your previous generations below.
						</p>
						<div className="flex justify-center">
							<Button>Start New Generation</Button>
						</div>
					</CardContent>
				</Card>

				<PreviousGenerations />
			</div>
		</div>
	);
};

const PreviousGenerations: React.FC = () => {
	const {data: userGenerations, isLoading: isLoadingGenerations} =
		trpc.generationRequests.getAll.useQuery({
			include: {
				videoImages: true,
			},
		});

	if (isLoadingGenerations) {
		return <GenerationRequestSkeleton />;
	}

	return (
		<Card className="shadow-lg">
			<CardHeader>
				<CardTitle className="text-xl font-bold text-blue-700">
					Previous Generations
				</CardTitle>
			</CardHeader>
			<CardContent>
				{userGenerations && userGenerations.length > 0 ? (
					<ul className="divide-y divide-gray-200">
						{userGenerations.map((generation) => (
							<li
								key={generation.id}
								className="py-3 flex justify-between items-center"
							>
								<div>
									<p className="font-semibold text-gray-700">
										{generation.occasion}
									</p>
									<p className="text-xs text-gray-500">
										{new Date(generation.createdAt).toLocaleDateString()}
									</p>
								</div>
								<div className="flex items-center">
									<span
										className={`px-2 py-1 rounded-full text-xs font-semibold mr-2
                  ${
										generation.status === 'COMPLETED'
											? 'bg-green-100 text-green-800'
											: generation.status === 'FAILED'
												? 'bg-red-100 text-red-800'
												: 'bg-blue-100 text-blue-800'
									}`}
									>
										{generation.status}
									</span>
									{generation.status === 'FAILED' && (
										<Button
											variant="outline"
											size="icon"
											onClick={() => console.log(`Regenerate ${generation.id}`)}
											title="Regenerate"
										>
											<RefreshCw className="h-4 w-4" />
										</Button>
									)}
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-500">
						No previous generations found.
					</p>
				)}
			</CardContent>
		</Card>
	);
};
