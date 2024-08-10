/* eslint-disable react/no-unescaped-entities */

import {Button} from '@web/components/ui/button';
import {trpc} from '@web/lib/trpc/client';
import {useRouter} from 'next/navigation';
import {UseFormReturn} from 'react-hook-form';
import {FormValues} from '../utils';

export const ReviewStep = ({
	form,
	onEdit,
	currentGenerationId,
}: {
	form: UseFormReturn<FormValues>;
	onEdit: () => void;
	currentGenerationId: string | null;
}) => {
	const router = useRouter();
	const formValues = form.getValues();

	const {mutate: createPaymentIntent, isLoading} =
		trpc.stripe.createPaymentIntent.useMutation({
			onSuccess: (data) => {
				router.push(data.url!);
			},
			onError: (error) => {
				console.error('Payment intent creation failed:', error);
			},
		});

	const handlePayment = () => {
		createPaymentIntent({
			priceId: process.env.NEXT_PUBLIC_SONG_PRICE_ID!,
			successUrl: `${window.location.origin}/payment-success?generationRequestId=${currentGenerationId}`,
			cancelUrl: `${window.location.origin}/payment-cancelled`,
			metadata: {
				generationRequestId: currentGenerationId ?? '',
			},
		});
	};

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Review Your Information</h3>
			<div>
				<p>
					<strong>Occasion:</strong> {formValues.occasion}
				</p>
				<p>
					<strong>Recipient's Name:</strong> {formValues.recipientName}
				</p>
				<p>
					<strong>Prompt:</strong> {formValues.prompt}
				</p>
				<p>
					<strong>Sender's Name:</strong> {formValues.senderName}
				</p>
			</div>
			<div className="flex space-x-4">
				<Button onClick={onEdit}>Edit</Button>
				<Button onClick={handlePayment} disabled={isLoading}>
					{isLoading ? 'Processing...' : 'Pay Now'}
				</Button>
			</div>
		</div>
	);
};
