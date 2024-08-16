import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@web/components/ui/form';
import {Skeleton} from '@web/components/ui/skeleton';
import {Textarea} from '@web/components/ui/textarea';
import {MAX_CHARS} from '../utils';
import {useVideoGeneration} from '../videoGenerationContext';
import {trpc} from '@web/lib/trpc/client';
import {toast} from 'sonner';

export const AIPromptStep = (): React.ReactNode => {
	const {mutate: updateGenerationRequest} =
		trpc.generationRequests.update.useMutation({
			onError: (err) => toast.error(JSON.stringify(err)),
		});

	const {
		form,
		aiSuggestions,
		isGenerateAIPromptLoading: isLoading,
		BottomNavigation,
		currentGenerationId,
	} = useVideoGeneration();

	const onNext = (): void => {
		if (!currentGenerationId) return;
		updateGenerationRequest({
			where: {id: currentGenerationId},
			data: {
				prompt: form.getValues('prompt'),
			},
		});
	};

	return (
		<Form {...form}>
			<div className="space-y-4">
				<div className="text-sm text-gray-600">
					<p className="font-semibold">How you can improve your prompt</p>
					<p>{aiSuggestions}</p>
				</div>
				{isLoading ? (
					<div className="space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<p className="text-sm text-muted-foreground">
							Our AI is cooking up the perfect prompt...
						</p>
					</div>
				) : (
					<FormField
						control={form.control}
						name="prompt"
						render={({field}) => (
							<FormItem>
								<FormControl>
									<Textarea
										{...field}
										className="h-32 resize-none"
										maxLength={MAX_CHARS}
									/>
								</FormControl>
								<div className="text-sm text-muted-foreground text-right">
									{field.value.length}/{MAX_CHARS}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
			</div>
			<BottomNavigation onNext={onNext} />
		</Form>
	);
};
