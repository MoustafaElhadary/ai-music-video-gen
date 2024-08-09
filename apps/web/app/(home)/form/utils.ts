import {z} from 'zod';

// Constants and types
export const MAX_CHARS = 200;
export const FormSchema = z.object({
	occasion: z.string().min(1, 'Occasion is required'),
	recipientName: z.string().min(1, "Recipient's name is required"),
	prompt: z
		.string()
		.min(1, 'Prompt is required')
		.max(MAX_CHARS, `Prompt must be ${MAX_CHARS} characters or less`),
});
export type FormValues = z.infer<typeof FormSchema>;
