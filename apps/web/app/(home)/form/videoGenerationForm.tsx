'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@web/components/ui/button';
import {useCallback} from 'react';
import {trpc} from '@web/lib/trpc/client';

import {FileUploader} from '@web/components/FileUploader';
import useLocalStorage from '@web/lib/useLocalStorage';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {FirstStep} from './steps/firstStep';
import {ReviewStep} from './steps/reviewStep';
import {FormSchema, FormValues} from './utils';
import {AIPromptStep} from './steps/aiPromptStep';
import {PhoneNumberStep} from './steps/phoneNumberStep';
import {
	VideoGenerationProvider,
	useVideoGeneration,
} from './videoGenerationContext';
import {toast} from 'sonner';

// Giddy steps data
const giddyStepsData = [
	{
		stepNumber: 1,
		stepId: 'write_prompt',
		icon: '✍️',
		text: 'Describe your dream music video',
	},
	{
		stepNumber: 2,
		stepId: 'ai_prompt',
		icon: '🤖',
		text: 'Review AI-enhanced prompt',
	},
	{
		stepNumber: 3,
		stepId: 'upload_media',
		icon: '📸',
		text: 'Upload photos (optional)',
	},
	{
		stepNumber: 4,
		stepId: 'add_phone',
		icon: '📱',
		text: "Add recipient's phone number",
	},
	{
		stepNumber: 5,
		stepId: 'review_pay',
		icon: '💳',
		text: 'Review and Pay',
	},
];

const VideoGenerationForm = () => {
	const [storedFormData, setStoredFormData] = useLocalStorage<FormValues>(
		'video-generation-form',
		{
			occasion: '',
			recipientName: '',
			prompt: '',
			senderName: '',
			recipientPhoneNumber: '',
		},
	);
	const [giddySteps] = useLocalStorage('giddySteps', giddyStepsData);

	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: storedFormData,
	});

	useEffect(() => {
		const subscription = form.watch((value) =>
			setStoredFormData(value as FormValues),
		);
		return () => subscription.unsubscribe();
	}, [form, setStoredFormData]);

	return (
		<VideoGenerationProvider form={form}>
			<VideoGenerationFormContent giddySteps={giddySteps} />
		</VideoGenerationProvider>
	);
};

const VideoGenerationFormContent = ({
	giddySteps,
}: {
	giddySteps: typeof giddyStepsData;
}) => {
	const {
		currentStep,
		setCurrentStep,
		currentGenerationId,
		uploadedFiles,
		setUploadedFiles,
	} = useVideoGeneration();

	const getStepHeaderText = (step: number) => {
		const headers = [
			'Ready to Get Giddy?',
			'2. Review AI-enhanced Prompt',
			'3. Upload Your Media (optional)',
			"4. Add Recipient's Contact",
			'5. Review and Pay',
		];
		return headers[step] || giddySteps[step]?.text || '';
	};

	const {mutate: uploadFile} = trpc.generationRequests.uploadFile.useMutation({
		onError: (error) => {
			toast.error('Upload failed:' + error.message);
		},
	});

	const {mutate: deleteFile} = trpc.generationRequests.deleteFile.useMutation({
		onError: (error) => {
			toast.error('Deletion failed:' + error.message);
		},
	});

	const handleFileChange = useCallback(
		(files: File[]) => {
			const filesToUpload = files.filter(
				(file) => !uploadedFiles.some((uf) => uf.name === file.name),
			);
			const filesToDelete = uploadedFiles.filter(
				(file) => !files.some((f) => f.name === file.name),
			);

			setUploadedFiles(files);

			if (currentGenerationId) {
				filesToUpload.forEach((file) => {
					uploadFile({generationRequestId: currentGenerationId, file});
				});

				filesToDelete.forEach((file) => {
					deleteFile({
						generationRequestId: currentGenerationId,
						file,
					});
				});
			}
		},
		[
			setUploadedFiles,
			currentGenerationId,
			uploadFile,
			deleteFile,
			uploadedFiles,
		],
	);

	const BottomNavigation = () => (
		<div className="flex justify-between mt-4">
			<Button
				onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
				disabled={currentStep === 0}
				className="bg-gray-500"
			>
				Back
			</Button>
			<Button
				onClick={() =>
					setCurrentStep((prev) => Math.min(prev + 1, giddySteps.length - 1))
				}
				disabled={currentStep === giddySteps.length - 1}
				className="bg-blue-700"
			>
				Next
			</Button>
		</div>
	);

	return (
		<>
			<h2 className="mb-6 text-center text-2xl font-bold">
				The Giddy Magic in 5 Steps
			</h2>
			<ol className="list-none space-y-4 mb-8 text-base">
				{giddySteps.map((step, index) => (
					<li key={index} className="flex items-center">
						<span className="mr-4 text-2xl">{step.icon}</span>
						<span className={index < currentStep ? 'line-through' : ''}>
							{step.stepNumber}. {step.text}
							{index < currentStep && (
								<i className="ml-2 text-green-500"> Done</i>
							)}
						</span>
					</li>
				))}
			</ol>
			<h2 className="mb-6 text-center text-2xl font-bold">
				{getStepHeaderText(currentStep)}
			</h2>

			{currentStep === 0 && <FirstStep />}
			{currentStep === 1 && <AIPromptStep />}
			{currentStep === 2 && (
				<div>
					<p>
						Upload photos of the recipient (optional). These photos will be
						included in the video.
					</p>
					<p className="text-sm text-gray-600 mb-4">
						For best results, upload clear photos showing just the
						recipient&apos;s face.
					</p>
					<FileUploader
						onChange={handleFileChange}
						initialFiles={uploadedFiles}
					/>
				</div>
			)}
			{currentStep === 3 && <PhoneNumberStep />}
			{currentStep === 4 && <ReviewStep />}

			{currentStep > 0 && <BottomNavigation />}
		</>
	);
};

export default VideoGenerationForm;
