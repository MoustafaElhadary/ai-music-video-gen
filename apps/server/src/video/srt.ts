/* eslint-disable camelcase */
import { z } from 'zod';
export const CaptionSchema = z.object({
  id: z.number(),
  end: z.number(),
  seek: z.number(),
  text: z.string(),
  start: z.number(),
  tokens: z.array(z.number()),
  compression_ratio: z.number(),
});

export type Caption = z.infer<typeof CaptionSchema>;

export function convertToSRT(captions: Caption[]): string {
  let result = '';
  let captionIndex = 1;

  function formatTime(seconds: number): string {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 12).replace('.', ',');
  }

  captions.forEach((caption) => {
    const { start, end, text } = caption;
    result += `${captionIndex++}\n${formatTime(start)} --> ${formatTime(end)}\n${text.trim()}\n\n`;
  });

  return result.trim();
}
