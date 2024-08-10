import * as z from 'zod';

// Constants and types
export const MAX_CHARS = 500;
export const FormSchema = z.object({
	occasion: z.string().min(1, 'Please select an occasion'),
	recipientName: z.string().min(1, "Recipient's name is required"),
	prompt: z
		.string()
		.min(1, 'Prompt is required')
		.max(MAX_CHARS, `Prompt must be ${MAX_CHARS} characters or less`),
	senderName: z.string().min(1, "Sender's name is required"),
});
export type FormValues = z.infer<typeof FormSchema>;
