import { z } from 'zod';
import { AnimationValuesSchema } from '../reducer/AnimationValues';

export const AnimationSchema = z.object({
  in: z.number(),
  valuesAt: z
    .function()
    .args(z.number(), z.number())
    .returns(AnimationValuesSchema),
});

export type Animation = z.infer<typeof AnimationSchema>;

export default Animation;
