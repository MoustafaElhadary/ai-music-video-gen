'use client';

import {useForm} from 'react-hook-form';

import {BookCreateInputSchema} from '@server/prisma/generated/zod';
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
import {trpc} from '@web/lib/trpc/client';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {Book} from './BookList';
import {z} from 'zod';

const BookForm = ({
	book,
	closeModal,
}: {
	book?: Book;
	closeModal?: () => void;
}): JSX.Element => {
	const editing = !!book?.id;

	const router = useRouter();
	const utils = trpc.useUtils();

	const form = useForm<z.infer<typeof BookCreateInputSchema>>({
		defaultValues: book ?? {
			name: '',
			author: '',
			rating: 0,
		},
	});

	const onSuccess = async (
		action: 'create' | 'update' | 'delete',
		data?: {error?: string},
	): Promise<void> => {
		if (data?.error) {
			toast.error(data.error);
			return;
		}

		await utils.books.getAll.invalidate();
		router.refresh();
		if (closeModal) closeModal();
		toast.success(`Book ${action}d!`);
	};

	const onError = (
		action: 'create' | 'update' | 'delete',
		data: {error: string},
	): void => {
		console.error(data, action);
		toast.error(data.error);
	};

	const {mutate: createBook, isLoading: isCreating} =
		trpc.books.create.useMutation({
			onSuccess: () => onSuccess('create'),
			onError: (err) => onError('create', {error: err.message}),
		});

	const {mutate: updateBook, isLoading: isUpdating} =
		trpc.books.update.useMutation({
			onSuccess: () => onSuccess('update'),
			onError: (err) => onError('update', {error: err.message}),
		});

	const {mutate: deleteBook, isLoading: isDeleting} =
		trpc.books.delete.useMutation({
			onSuccess: () => onSuccess('delete'),
			onError: (err) => onError('delete', {error: err.message}),
		});

	const handleSubmit = (
		values: z.infer<typeof BookCreateInputSchema>,
	): void => {
		if (editing) {
			updateBook({where: {id: book.id}, data: values});
		} else {
			createBook({
				...values,
				rating: parseInt(values?.rating?.toString() ?? '', 0),
			});
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={() => form.handleSubmit(handleSubmit)}
				className={'space-y-8'}
			>
				<FormField
					control={form.control}
					name="author"
					render={({field}) => (
						<FormItem>
							<FormLabel>Url</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="rating"
					render={({field}) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<Input {...field} value={field.value?.toString() || ''} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="mr-1"
					disabled={isCreating || isUpdating}
				>
					{editing
						? `Sav${isUpdating ? 'ing...' : 'e'}`
						: `Creat${isCreating ? 'ing...' : 'e'}`}
				</Button>
				{editing ? (
					<Button
						type="button"
						variant={'destructive'}
						onClick={() => deleteBook({where: {id: book.id}})}
					>
						Delet{isDeleting ? 'ing...' : 'e'}
					</Button>
				) : null}
			</form>
		</Form>
	);
};

export default BookForm;
