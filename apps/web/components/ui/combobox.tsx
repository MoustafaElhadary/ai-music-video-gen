'use client';

import * as React from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';
import {cn} from '@web/lib/utils';
import {Button} from '@web/components/ui/button';
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@web/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@web/components/ui/popover';
import {ScrollArea} from './scroll-area';

export type ComboboxOption = {
	value: string;
	label: string;
};

type Mode = 'single' | 'multiple';

interface ComboboxProps {
	mode?: Mode;
	options: ComboboxOption[];
	selected: string | string[];
	className?: string;
	placeholder?: string;
	onChange?: (event: string | string[]) => void;
}

export function Combobox({
	options,
	selected,
	className,
	placeholder = 'Select Item...',
	mode = 'single',
	onChange,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const handleSelect = (value: string) => {
		if (onChange) {
			if (mode === 'multiple' && Array.isArray(selected)) {
				onChange(
					selected.includes(value)
						? selected.filter((item) => item !== value)
						: [...selected, value],
				);
			} else {
				onChange(value);
			}
		}
		setOpen(false);
	};

	const displayValue = React.useMemo(() => {
		if (!selected || (Array.isArray(selected) && selected.length === 0)) {
			return placeholder;
		}
		if (mode === 'multiple' && Array.isArray(selected)) {
			return selected
				.map((value) => options.find((item) => item.value === value)?.label)
				.join(', ');
		}
		return options.find((item) => item.value === selected)?.label;
	}, [selected, options, mode, placeholder]);

	return (
		<div className={cn('block', className)}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						<span className="truncate">{displayValue}</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-72 max-w-sm p-0">
					<Command>
						<CommandInput placeholder={placeholder} />
						<ScrollArea className="max-h-80">
							<CommandGroup>
								<CommandList>
									{options.map((option) => (
										<CommandItem
											key={option.value}
											value={option.label}
											onSelect={() => handleSelect(option.value)}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													(
														mode === 'multiple' && Array.isArray(selected)
															? selected.includes(option.value)
															: selected === option.value
													)
														? 'opacity-100'
														: 'opacity-0',
												)}
											/>
											{option.label}
										</CommandItem>
									))}
								</CommandList>
							</CommandGroup>
						</ScrollArea>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
