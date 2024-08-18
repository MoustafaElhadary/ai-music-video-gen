/* eslint-disable react/no-unescaped-entities */

'use client';
import {Button} from '@web/components/ui/button';
import {Combobox} from '@web/components/ui/combobox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@web/components/ui/form';
import {Input} from '@web/components/ui/input';
import {Textarea} from '@web/components/ui/textarea';
import {useVideoGeneration} from '../videoGenerationContext';

import {useClerk, useUser} from '@clerk/nextjs';
import {trpc} from '@web/lib/trpc/client';
import {toast} from 'sonner';
import {MAX_CHARS} from '../utils';
import type {FormValues} from '../utils';

export const FirstStep = (): JSX.Element => {
	const {
		form,
		setCurrentGenerationId,
		setCurrentStep,
		currentGenerationId,
		handleGeneratePrompt,
	} = useVideoGeneration();
	const {isLoaded, isSignedIn} = useUser();
	const {openSignIn} = useClerk();

	const {mutate: createGenerationRequest, isLoading: isCreating} =
		// @ts-expect-error TODO: will fix
		trpc.generationRequests.create.useMutation({
			onSuccess: (data) => {
				setCurrentGenerationId(data.id);
				handleGeneratePrompt(data.id);
				setCurrentStep(1);
			},
			onError: (err) => toast.error(JSON.stringify(err)),
		});

	const {mutate: updateGenerationRequest, isLoading: isUpdating} =
		trpc.generationRequests.update.useMutation({
			onSuccess: () => {
				setCurrentStep(1);
			},
			onError: (err) => toast.error(JSON.stringify(err)),
		});

	const handleSubmit = (values: FormValues): void => {
		if (!isLoaded || !isSignedIn) {
			toast.error(
				'Please sign in or create an account to create a Giddy video',
			);
			openSignIn();
			return;
		}

		if (currentGenerationId) {
			updateGenerationRequest({
				where: {id: currentGenerationId},
				data: values,
			});
		} else {
			createGenerationRequest(values);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					void form.handleSubmit(handleSubmit)(e);
				}}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="senderName"
					render={({field}) => (
						<FormItem>
							<FormLabel>Your Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="occasion"
					render={({field}) => (
						<FormItem>
							<FormLabel>Occasion</FormLabel>
							<FormControl>
								<Combobox
									selected={field.value || ''}
									options={[
										'Birthday',
										'Graduation',
										'Wedding',
										'Anniversary',
										'New Job',
										'Retirement',
										'Holiday',
										'Just Because',
									].map((_occasion) => ({
										value: _occasion,
										label: _occasion,
									}))}
									placeholder="Select an occasion"
									mode="single"
									{...field}
									onChange={(value) => field.onChange(value as string)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="recipientName"
					render={({field}) => (
						<FormItem>
							<FormLabel>Recipient's First Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="prompt"
					render={({field}) => (
						<FormItem>
							<FormLabel>What should the song be about?</FormLabel>
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

				<Button
					type="submit"
					className="w-full bg-blue-700"
					disabled={isCreating || isUpdating}
				>
					{isCreating || isUpdating
						? 'Processing...'
						: currentGenerationId
							? 'Update My Giddy Video! 🎬'
							: 'Create My Giddy Video! 🎬'}
				</Button>
			</form>
		</Form>
	);
};
