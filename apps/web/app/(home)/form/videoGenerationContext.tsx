import React, {createContext, useContext, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormValues} from './utils';
import {trpc} from '@web/lib/trpc/client';

interface VideoGenerationContextType {
	form: UseFormReturn<FormValues>;

	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;

	currentGenerationId: string | null;
	setCurrentGenerationId: React.Dispatch<React.SetStateAction<string | null>>;

	aiGeneratedPrompt: string;
	setAiGeneratedPrompt: React.Dispatch<React.SetStateAction<string>>;

	aiSuggestions: string;
	setAiSuggestions: React.Dispatch<React.SetStateAction<string>>;

	uploadedFiles: File[];
	setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;

	handleGeneratePrompt: () => void;
	isGenerateAIPromptLoading: boolean;
}

const VideoGenerationContext = createContext<
	VideoGenerationContextType | undefined
>(undefined);

export const useVideoGeneration = () => {
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
	const [currentStep, setCurrentStep] = useState(0);
	const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(
		null,
	);
	const [aiGeneratedPrompt, setAiGeneratedPrompt] = useState('');
	const [aiSuggestions, setAiSuggestions] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

	const formValues = form.getValues();

	const generateAIPromptMutation =
		trpc.generationRequests.generateAIPrompt.useMutation({
			onSuccess: (data) => {
				setAiGeneratedPrompt(data.prompt);
				setAiSuggestions(data.suggestions);
			},
			onError: (error) => {
				console.error('Error generating AI prompt:', error);
			},
		});

	const handleGeneratePrompt = () => {
		generateAIPromptMutation.mutate({
			senderName: formValues.senderName,
			occasion: formValues.occasion,
			recipientName: formValues.recipientName,
			userPrompt: formValues.prompt,
		});
	};

	return (
		<VideoGenerationContext.Provider
			value={{
				form,
				currentStep,
				setCurrentStep,
				currentGenerationId,
				setCurrentGenerationId,
				aiGeneratedPrompt,
				setAiGeneratedPrompt,
				aiSuggestions,
				setAiSuggestions,
				uploadedFiles,
				setUploadedFiles,
				handleGeneratePrompt,
				isGenerateAIPromptLoading: generateAIPromptMutation.isLoading,
			}}
		>
			{children}
		</VideoGenerationContext.Provider>
	);
};
