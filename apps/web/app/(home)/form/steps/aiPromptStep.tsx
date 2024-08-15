import {Button} from '@web/components/ui/button';
import {Textarea} from '@web/components/ui/textarea';
import {useVideoGeneration} from '../videoGenerationContext';
import {MAX_CHARS} from '../utils';

export const AIPromptStep = (): React.ReactNode => {
	const {
		aiGeneratedPrompt,
		setAiGeneratedPrompt,
		aiSuggestions,
		isGenerateAIPromptLoading: isLoading,
		handleGeneratePrompt,
	} = useVideoGeneration();

	return (
		<div className="space-y-4">
			<Button onClick={handleGeneratePrompt} disabled={isLoading}>
				{isLoading ? 'Generating...' : 'Generate AI Prompt'}
			</Button>
			<div className="text-sm text-gray-600">
				<p>{aiSuggestions}</p>
			</div>
			<Textarea
				value={aiGeneratedPrompt}
				onChange={(e) => {
					setAiGeneratedPrompt(e.target.value);
				}}
				className="h-32 resize-none"
				maxLength={200}
			/>
			<div className="text-sm text-muted-foreground text-right">
				{aiGeneratedPrompt.length}/{MAX_CHARS}
			</div>
		</div>
	);
};
