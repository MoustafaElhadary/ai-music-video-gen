/* eslint-disable react/no-unescaped-entities */
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {trpc} from '@web/lib/trpc/client';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {Button} from '@web/components/ui/button';
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
import {Combobox} from '@web/components/ui/combobox';

const MAX_CHARS = 200;

const FormSchema = z.object({
	occasion: z.string().min(1, 'Occasion is required'),
	recipientName: z.string().min(1, "Recipient's name is required"),
	prompt: z
		.string()
		.min(1, 'Prompt is required')
		.max(MAX_CHARS, `Prompt must be ${MAX_CHARS} characters or less`),
});

type FormValues = z.infer<typeof FormSchema>;

const GiddyForm = () => {
	const router = useRouter();
	const utils = trpc.useUtils();

	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			occasion: '',
			recipientName: '',
			prompt: '',
		},
	});

	const onSuccess = async (data?: {error?: string}) => {
		if (data?.error) {
			toast.error(data.error);
			return;
		}

		await utils.generationRequests.getAll.invalidate();
		router.refresh();
		toast.success('Giddy video created successfully!');
	};

	const onError = (data: {error: string}) => {
		toast.error(data.error);
	};

	const {mutate: createGenerationRequest, isLoading: isCreating} =
		trpc.generationRequests.create.useMutation({
			onSuccess: () => onSuccess(),
			onError: (err) => onError({error: err.message}),
		});

	const handleSubmit = (values: FormValues) => {
		createGenerationRequest(values);
	};

	const occasions = [
		{value: 'Birthday', label: 'Birthday'},
		{value: 'Graduation', label: 'Graduation'},
		{value: 'Wedding', label: 'Wedding'},
		{value: 'Anniversary', label: 'Anniversary'},
		{value: 'New Job', label: 'New Job'},
		{value: 'Retirement', label: 'Retirement'},
		{value: 'Holiday', label: 'Holiday'},
		{value: 'Just Because', label: 'Just Because'},
	];

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="occasion"
					render={({field}) => (
						<FormItem>
							<FormLabel>Occasion</FormLabel>
							<FormControl>
								<Combobox
									selected={field.value}
									options={occasions}
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
					disabled={isCreating}
				>
					{isCreating ? 'Creating...' : 'Create My Giddy Video! 🎬'}
				</Button>
			</form>
		</Form>
	);
};

export default GiddyForm;
