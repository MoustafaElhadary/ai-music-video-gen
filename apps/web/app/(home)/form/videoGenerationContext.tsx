/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {Button} from '@web/components/ui/button';
import {trpc} from '@web/lib/trpc/client';
import useLocalStorage from '@web/lib/useLocalStorage';
import React, {createContext, useContext, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormValues} from './utils';

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
type GiddyStep = (typeof giddyStepsData)[number];

interface VideoGenerationContextType {
	form: UseFormReturn<FormValues>;

	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

	currentGenerationId: string | null;
	setCurrentGenerationId: React.Dispatch<React.SetStateAction<string | null>>;

	aiSuggestions: string;
	setAiSuggestions: React.Dispatch<React.SetStateAction<string>>;

	uploadedFiles: File[];
	setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;

	handleGeneratePrompt: (id: string) => void;
	isGenerateAIPromptLoading: boolean;

	BottomNavigation: React.FC<{
		disabledBack?: boolean;
		disabledNext?: boolean;
		onBack?: () => void;
		onNext?: () => void;
	}>;
	giddySteps: GiddyStep[];
}

const VideoGenerationContext = createContext<
	VideoGenerationContextType | undefined
>(undefined);

export const useVideoGeneration = (): VideoGenerationContextType => {
	const context = useContext(VideoGenerationContext);
	if (!context) {
		throw new Error(
			'useVideoGeneration must be used within a VideoGenerationProvider',
		);
	}
	return context;
};

export const VideoGenerationProvider: React.FC<{
	children: React.ReactNode;
	form: UseFormReturn<FormValues>;
}> = ({children, form}) => {
	const [giddySteps] = useLocalStorage('giddySteps', giddyStepsData);

	const [currentStep, setCurrentStep] = useState(0);
	const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(
		null,
	);
	const [aiSuggestions, setAiSuggestions] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const generateAIPromptMutation =
		trpc.generationRequests.generateAIPrompt.useMutation({
			onSuccess: (data) => {
				form.setValue('prompt', data.prompt);
				setAiSuggestions(data.suggestions);
			},
			onError: (error) => {
				console.error('Error generating AI prompt:', error);
			},
		});

	const handleGeneratePrompt = (id: string): void => {
		const formValues = form.getValues();
		generateAIPromptMutation.mutate({
			generationId: id,
			senderName: formValues.senderName,
			occasion: formValues.occasion,
			recipientName: formValues.recipientName,
			prompt: formValues.prompt,
		});
	};

	const BottomNavigation = ({
		disabledBack = currentStep === 0,
		disabledNext = currentStep === giddySteps.length - 1,
		onBack,
		onNext,
	}: {
		disabledBack?: boolean;
		disabledNext?: boolean;
		onBack?: () => void;
		onNext?: () => void;
	}): React.ReactNode => (
		<div className="flex justify-between mt-4">
			<Button
				onClick={() => {
					setCurrentStep((prev) => Math.max(prev - 1, 0));
					onBack?.();
				}}
				disabled={disabledBack}
				className="bg-gray-500"
			>
				Back
			</Button>
			<Button
				onClick={() => {
					setCurrentStep((prev: number) =>
						Math.min(prev + 1, giddySteps.length - 1),
					);
					onNext?.();
				}}
				disabled={disabledNext}
				className="bg-blue-700"
			>
				Next
			</Button>
		</div>
	);

	return (
		<VideoGenerationContext.Provider
			value={{
				form,
				currentStep,
				setCurrentStep,
				currentGenerationId,
				setCurrentGenerationId,
				aiSuggestions,
				setAiSuggestions,
				uploadedFiles,
				setUploadedFiles,
				handleGeneratePrompt,
				isGenerateAIPromptLoading: generateAIPromptMutation.isLoading,
				BottomNavigation,
				giddySteps,
			}}
		>
			{children}
		</VideoGenerationContext.Provider>
	);
};
