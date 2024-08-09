/* eslint-disable react/no-unescaped-entities */
'use client';
import {useUser} from '@clerk/nextjs';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@web/components/ui/button';
import {useCallback, useState} from 'react';

import {FileUploader} from '@web/components/FileUploader';
import useLocalStorage from '@web/lib/useLocalStorage';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {FirstStep} from './steps/firstStep';
import {FormSchema, FormValues} from './utils';

// Giddy steps data
const giddyStepsData = [
	{
		stepNumber: 1,
		stepId: 'write_prompt',
		icon: '✍️',
		text: 'Write a creative prompt describing your dream music video',
	},
	{
		stepNumber: 2,
		stepId: 'upload_media',
		icon: '📸',
		text: 'Upload your favorite photos or video clips',
	},
	{
		stepNumber: 3,
		stepId: 'ai_magic',
		icon: '🤖',
		text: 'Let our AI work its magic to create your unique music video',
	},
	{
		stepNumber: 4,
		stepId: 'add_phone',
		icon: '📱',
		text: "Add the recipient's phone number",
	},
	{
		stepNumber: 5,
		stepId: 'share_creation',
		icon: '🚀',
		text: 'Share your Giddy creation instantly!',
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
			senderPhoneNumber: '',
		},
	);
	const [giddySteps] = useLocalStorage('giddySteps', giddyStepsData);
	const [currentStep, setCurrentStep] = useState(0);
	const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(
		null,
	);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

	const occasions = [
		'Birthday',
		'Graduation',
		'Wedding',
		'Anniversary',
		'New Job',
		'Retirement',
		'Holiday',
		'Just Because',
	];

	const getStepHeaderText = (step: number) => {
		const headers = [
			'Ready to Get Giddy?',
			'2. Upload Your Media (optional)',
			'3. AI Magic in Progress',
			"4. Add Recipient's Contact",
			'5. Share Your Creation',
		];
		return headers[step] || giddySteps[step]?.text || '';
	};

	const handleFileChange = useCallback(
		(files: File[]) => {
			setUploadedFiles(files);
		},
		[setUploadedFiles],
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

			{currentStep === 0 && (
				<FirstStep
					form={form}
					occasions={occasions.map((_occasion) => ({
						value: _occasion,
						label: _occasion,
					}))}
					currentGenerationId={currentGenerationId}
					setCurrentGenerationId={setCurrentGenerationId}
					setCurrentStep={setCurrentStep}
				/>
			)}

			{currentStep === 1 && (
				<div>
					<p>Upload your favorite photos or video clips here.</p>
					<FileUploader
						onChange={handleFileChange}
						initialFiles={uploadedFiles}
					/>
				</div>
			)}

			{currentStep > 0 && (
				<div className="flex justify-between mt-4">
					<Button
						onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
						disabled={currentStep === 0}
					>
						Back
					</Button>
					<Button
						onClick={() =>
							setCurrentStep((prev) =>
								Math.min(prev + 1, giddySteps.length - 1),
							)
						}
						disabled={currentStep === giddySteps.length - 1}
					>
						Next
					</Button>
				</div>
			)}
		</>
	);
};

export default VideoGenerationForm;
