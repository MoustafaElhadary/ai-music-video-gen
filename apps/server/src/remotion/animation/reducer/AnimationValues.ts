import { z } from 'zod';

export const AnimationValuesSchema = z.object({
  translateX: z.number().optional(),
  translateY: z.number().optional(),
  scaleX: z.number().optional(),
  scaleY: z.number().optional(),
  rotate: z.number().optional(),
  opacity: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type AnimationValues = z.infer<typeof AnimationValuesSchema>;

export default AnimationValues;
