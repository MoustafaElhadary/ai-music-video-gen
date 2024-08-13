import * as z from 'zod';

// Constants and types
export const MAX_CHARS = 200;
export const FormSchema = z.object({
	senderName: z.string().min(1, 'Your name is required'),
	occasion: z.string().min(1, 'Occasion is required'),
	recipientName: z.string().min(1, "Recipient's name is required"),
	prompt: z
		.string()
		.max(MAX_CHARS, `Prompt must be ${MAX_CHARS} characters or less`),
	recipientPhoneNumber: z.string(),
	// .min(1, "Recipient's phone number is required"), TODO: bring back
});
export type FormValues = z.infer<typeof FormSchema>;
