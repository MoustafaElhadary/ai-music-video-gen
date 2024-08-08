import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@web/components/ui/form';
import {Input} from '@web/components/ui/input';
import {Button} from '@web/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@web/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@web/components/ui/command';
import {Check, ChevronsUpDown} from 'lucide-react';
import cn from 'clsx';

const MAX_CHARS = 200;
const PLACEHOLDER_INTERVAL = 3000;

const placeholders = [
	"🎵 Bestie's birthday bash vibes",
	"💖 Parents' anniversary feels",
	"🎓 Grad's epic journey remix",
	'🌟 Crush-worthy confession track',
	'🎉 Squad goals celebration mix',
];

const occasions = [
	'Birthday',
	'Graduation',
	'Wedding',
	'Anniversary',
	'New Job',
	'Retirement',
	'Holiday',
	'Just Because',
];

const FormSchema = z.object({
	occasion: z.string({
		required_error: 'Please select an occasion.',
	}),
});

const GiddyForm: React.FC = () => {
	const [prompt, setPrompt] = useState('');
	const [placeholderIndex, setPlaceholderIndex] = useState(0);
	const [charCount, setCharCount] = useState(0);
	const [recipientName, setRecipientName] = useState('');
	const [occasion, setOccasion] = useState('');
	const [occasionInput, setOccasionInput] = useState('');

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
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
		console.log('Occasion:', occasion);
		// Add your submission logic here
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex space-x-4">
					<div className="flex-1">
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
					<div className="flex-1">
						<FormField
							control={form.control}
							name="occasion"
							render={({field}) => (
								<FormItem className="flex flex-col">
									<FormLabel>Occasion</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														'w-full justify-between',
														!field.value && 'text-muted-foreground',
													)}
												>
													{field.value || 'Select an occasion'}
													<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput
													placeholder="Search occasion..."
													value={occasionInput}
													onValueChange={setOccasionInput}
												/>
												<CommandList>
													<CommandEmpty>
														{occasionInput && (
															<CommandItem
																onSelect={() => {
																	form.setValue('occasion', occasionInput);
																	setOccasion(occasionInput);
																}}
															>
																Create &ldquo;{occasionInput}&rdquo;
															</CommandItem>
														)}
														{!occasionInput && 'No occasion found.'}
													</CommandEmpty>
													<CommandGroup>
														{occasions.map((occ) => (
															<CommandItem
																value={occ}
																key={occ}
																onSelect={() => {
																	form.setValue('occasion', occ);
																	setOccasion(occ);
																}}
															>
																<Check
																	className={cn(
																		'mr-2 h-4 w-4',
																		occ === field.value
																			? 'opacity-100'
																			: 'opacity-0',
																	)}
																/>
																{occ}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
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