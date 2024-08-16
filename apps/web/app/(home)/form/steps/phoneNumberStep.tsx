import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@web/components/ui/form';
import {Input} from '@web/components/ui/input';
import {useVideoGeneration} from '../videoGenerationContext';

export const PhoneNumberStep = (): JSX.Element => {
	const {form, BottomNavigation} = useVideoGeneration();

	return (
		<Form {...form}>
			<h3 className="text-lg font-semibold">Recipient&apos;s Phone Number</h3>
			<FormField
				control={form.control}
				name="recipientPhoneNumber"
				render={({field}) => (
					<FormItem>
						<FormLabel>Phone Number</FormLabel>
						<FormControl>
							<Input {...field} placeholder="Enter phone number" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<BottomNavigation />
		</Form>
	);
};
