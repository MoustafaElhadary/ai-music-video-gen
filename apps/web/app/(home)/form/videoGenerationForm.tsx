'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {trpc} from '@web/lib/trpc/client';
import {useCallback} from 'react';

import {MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB} from '@server/core/constants';
import {FileUploader} from '@web/components/FileUploader';
import useLocalStorage from '@web/lib/useLocalStorage';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {AIPromptStep} from './steps/aiPromptStep';
import {FirstStep} from './steps/firstStep';
import {PhoneNumberStep} from './steps/phoneNumberStep';
import {ReviewStep} from './steps/reviewStep';
import {FormSchema} from './utils';
import type {FormValues} from './utils';
import {
	VideoGenerationProvider,
	useVideoGeneration,
} from './videoGenerationContext';

// Giddy steps data

const VideoGenerationForm = (): React.ReactNode => {
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
			<VideoGenerationFormContent />
		</VideoGenerationProvider>
	);
};

const VideoGenerationFormContent = (): React.ReactNode => {
	const {
		currentStep,
		giddySteps,
		currentGenerationId,
		uploadedFiles,
		setUploadedFiles,
		BottomNavigation,
	} = useVideoGeneration();

	const getStepHeaderText = (step: number): string => {
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
			if (error.message.includes('exceeds the maximum size')) {
				toast.error(error.message);
			} else {
				toast.error('Upload failed:' + error.message);
			}
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
					if (file.size <= MAX_FILE_SIZE_BYTES) {
						const reader = new FileReader();
						reader.onload = (e): void => {
							const base64 = e.target?.result?.toString().split(',')[1];
							if (base64) {
								uploadFile({
									generationRequestId: currentGenerationId,
									file: {
										name: file.name,
										type: file.type,
										size: file.size,
										base64,
									},
								});
							}
						};
						reader.readAsDataURL(file);
					} else {
						toast.error(
							`File "${file.name}" exceeds the maximum size of ${MAX_FILE_SIZE_MB} MB`,
						);
					}
				});

				filesToDelete.forEach((file) => {
					deleteFile({
						generationRequestId: currentGenerationId,
						file: {
							name: file.name,
							type: file.type,
							size: file.size,
							base64: '', // We don't need the base64 for deletion
						},
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
				<>
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
					<BottomNavigation />
				</>
			)}
			{currentStep === 3 && <PhoneNumberStep />}
			{currentStep === 4 && <ReviewStep />}
		</>
	);
};

export default VideoGenerationForm;
