import * as z from 'zod';

export const subscriptionsSchema = z.object({
  user_id: z.string(),
  stripe_customer_id: z.string(),
  stripe_subscription_id: z.string().nullish(),
  stripe_price_id: z.string().nullish(),
  stripe_current_period_end: z.date().nullish(),
});
