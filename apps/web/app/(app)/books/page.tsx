import BookList from '@web/components/books/BookList';
import NewBookModal from '@web/components/books/BookModal';
import {checkAuth} from '@web/lib/auth/utils';
import {api} from '@web/lib/trpc/api';

export default async function Books(): Promise<JSX.Element> {
	checkAuth();
	const books = await api.books.getAll.query({});

	return (
		<main>
			<div className="flex justify-between">
				<h1 className="font-semibold text-2xl my-2">Books</h1>
				<NewBookModal />
			</div>
			<BookList books={books} />
		</main>
	);
}
