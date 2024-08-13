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
import {useVideoGeneration} from '../videoGenerationContext';

export const PhoneNumberStep = () => {
	const {form, setCurrentStep} = useVideoGeneration();

	const handleSubmit = () => {
		setCurrentStep(4);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
				<Button type="submit">Next</Button>
			</form>
		</Form>
	);
};
