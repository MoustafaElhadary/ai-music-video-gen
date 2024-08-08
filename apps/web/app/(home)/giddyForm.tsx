import {zodResolver} from '@hookform/resolvers/zod';
import {Combobox, ComboboxOption} from '@web/components/ui/combobox';
import {Form} from '@web/components/ui/form';
import {Input} from '@web/components/ui/input';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const MAX_CHARS = 200;
const PLACEHOLDER_INTERVAL = 3000;

const placeholders = [
	"🎵 Bestie's birthday bash vibes",
	"💖 Parents' anniversary feels",
	"🎓 Grad's epic journey remix",
	'🌟 Crush-worthy confession track',
	'🎉 Squad goals celebration mix',
];

const FormSchema = z.object({
	occasion: z.string().optional(),
});

const GiddyForm: React.FC = () => {
	const [prompt, setPrompt] = useState('');
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const [charCount, setCharCount] = useState(0);
	const [recipientName, setRecipientName] = useState('');

	const [occasion, setOccasion] = useState<string | undefined>(undefined);
	const [occasions, setOccasions] = useState<ComboboxOption[]>([
		{value: 'Birthday', label: 'Birthday'},
		{value: 'Graduation', label: 'Graduation'},
		{value: 'Wedding', label: 'Wedding'},
		{value: 'Anniversary', label: 'Anniversary'},
		{value: 'New Job', label: 'New Job'},
		{value: 'Retirement', label: 'Retirement'},
		{value: 'Holiday', label: 'Holiday'},
		{value: 'Just Because', label: 'Just Because'},
	]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			occasion: undefined,
		},
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
		}, PLACEHOLDER_INTERVAL);
		return () => clearInterval(intervalId);
	}, []);

	const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value;
		if (input.length <= MAX_CHARS) {
			setPrompt(input);
			setCharCount(input.length);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitted prompt:', prompt);
		console.log('Recipient Name:', recipientName);

		// Add your submission logic here
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex space-x-4">
					<div className="flex-1">
						<Combobox
							mode="single"
							options={occasions}
							placeholder="Select occasion..."
							selected={occasion || ''}
							onChange={(value) => {
								setOccasion(value as string);
								form.setValue('occasion', value as string);
							}}
							onCreate={(value) => {
								const newOption = {value, label: value};
								setOccasions([...occasions, newOption]);
								setOccasion(value);
								form.setValue('occasion', value);
							}}
						/>
						<label
							htmlFor="recipientName"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Recipient&apos;s First Name
						</label>
						<Input
							type="text"
							id="recipientName"
							value={recipientName}
							onChange={(e) => setRecipientName(e.target.value)}
							className="w-full"
							required
						/>
					</div>
				</div>
				<div className="relative">
					<label
						htmlFor="prompt"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						What should the song be about?
					</label>
					<textarea
						id="prompt"
						placeholder={placeholders[placeholderIndex]}
						value={prompt}
						onChange={handlePromptChange}
						className="w-full h-32 rounded-lg border border-blue-700 bg-white px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none text-base resize-none"
						required
					/>
					<div className="absolute bottom-2 right-2 text-sm text-gray-500">
						{charCount}/{MAX_CHARS}
					</div>
				</div>
				<button
					type="submit"
					className="w-full rounded-lg bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-600 text-lg transition-all duration-300 transform hover:scale-105"
				>
					Create My Giddy Video! 🎬
				</button>
			</form>
		</Form>
	);
};

export default GiddyForm;
