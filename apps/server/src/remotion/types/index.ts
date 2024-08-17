import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

const MediaSchema = z.object({
  url: z.string().describe('The URL of the media file'),
  type: z.string().describe('The MIME type of the media file'),
});

export const SceneDataSchema = z.object({
  name: z.string().optional().describe('Optional name of the scene'),
  durationInSeconds: z.number().describe('Duration of the scene in seconds'),
  startFrom: z.number().describe('Start time of the scene in seconds'),
  media: z
    .array(MediaSchema)
    .optional()
    .describe('Optional array of media objects'),
  text: z.string().optional().describe('Optional text content for the scene'),
  textStyle: z
    .string()
    .optional()
    .describe(
      'Optional Tailwind CSS classes for styling the text. use large styles when possible. minimum is text-4xl. 6xl is usually good',
    ),
  mediaStyle: z
    .string()
    .optional()
    .describe('Optional Tailwind CSS classes for styling the media'),
  bgStyle: z
    .string()
    .optional()
    .describe(
      'Optional Tailwind CSS classes for styling the background such as bg-gradient-to-r from-green-400 to-blue-500. DO NOT USE bg-url',
    ),
  animation: z
    .array(z.string())
    .optional()
    .describe(
      'Optional array of animation codes such as Move({ x: 1080, y: , start: 48, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true }) or Rotate({ degrees: , initial: 45, overshootClamping: false })',
    ),
  volume: z
    .number()
    .optional()
    .describe('Optional volume level for the scene (0 to 1)'),

  subtitles: z
    .object({
      srt: z.string().describe('Optional SRT file for the scene'),
      isRTL: z
        .boolean()
        .optional()
        .default(false)
        .describe('Optional RTL for the scene'),
      audioOffsetInSeconds: z
        .number()
        .optional()
        .default(0)
        .describe('Optional audio offset in seconds for the scene'),

      subtitlesLinePerPage: z.number().int().min(0),
      subtitlesLineHeight: z.number().int().min(0),
      subtitlesZoomMeasurerSize: z.number().int().min(0),
      onlyDisplayCurrentSentence: z.boolean(),
      subtitlesTextColor: zColor(),
    })
    .optional(),
  children: z
    .array(
      z.object({
        className: z.string(),
      }),
    )
    .optional(),
});

export type SceneData = z.infer<typeof SceneDataSchema>;

export const SceneDataArraySchema = z.array(SceneDataSchema);

export type ScenesRequestParams = {
  apiKey: string;
  baseId: string;
  table: string;
  view?: string;
  fieldNames: MandatoryFields & {
    name?: string;
    textStyle?: string;
    mediaStyle?: string;
    bgStyle?: string;
    animation?: string;
    volume?: string;
  };
};

type MandatoryFields = {
  [key in (typeof mandatoryFieldKeys)[number]]: string;
};

const mandatoryFieldKeys = [
  'startFrom',
  'durationInSeconds',
  'media',
  'text',
] as const;

export type PlayerSectionProps = {
  fps?: number;
  width: number;
  height: number;
};

export type AirtableDataHash = {
  sceneRequest: ScenesRequestParams;
  sceneProperties: PlayerSectionProps;
  duration: number;
};
