import {Button} from '@web/components/ui/button';
import {Textarea} from '@web/components/ui/textarea';
import {useVideoGeneration} from '../videoGenerationContext';
import {MAX_CHARS} from '../utils';

export const AIPromptStep = () => {
	const {
		aiGeneratedPrompt,
		setAiGeneratedPrompt,
		aiSuggestions,
		isGenerateAIPromptLoading: isLoading,
		setCurrentStep,
		handleGeneratePrompt,
	} = useVideoGeneration();

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">AI-Enhanced Prompt</h3>
			<Button onClick={handleGeneratePrompt} disabled={isLoading}>
				{isLoading ? 'Generating...' : 'Generate AI Prompt'}
			</Button>
			{aiGeneratedPrompt && (
				<>
					<Textarea
						value={aiGeneratedPrompt}
						onChange={(e) => setAiGeneratedPrompt(e.target.value)}
						className="h-32 resize-none"
						maxLength={200}
					/>
					<div className="text-sm text-muted-foreground text-right">
						{aiGeneratedPrompt.length}/{MAX_CHARS}
					</div>
					<div className="text-sm text-gray-600">
						<h4 className="font-semibold">AI Suggestions:</h4>
						<p>{aiSuggestions}</p>
					</div>
				</>
			)}
			<Button onClick={() => setCurrentStep(2)} disabled={!aiGeneratedPrompt}>
				Next
			</Button>
		</div>
	);
};
