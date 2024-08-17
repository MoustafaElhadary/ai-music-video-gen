/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { AudioGramSchema } from './Composition';
import { GeneratedVideoSchema } from './GeneratedVideo';

// Define Zod schemas for each composition
const Scene1Schema = z.object({
  sources: z.array(z.string()).length(4),
});

const Scene2Schema = z.object({
  ranking: z.tuple([
    z.string(),
    z.string(),
    z.string(),
    z.string(),
    z.string(),
  ]),
});

const Scene3Schema = z.object({
  topSongName: z.string(),
  topSongArtistName: z.string(),
  topSongCover: z.string().url(),
});

const MainSchema = z.object({
  artists: z.array(z.string()).length(4),
  topSongName: z.string(),
  topSongArtistName: z.string(),
  topSongCover: z.string().url(),
  ranking: z.tuple([
    z.string(),
    z.string(),
    z.string(),
    z.string(),
    z.string(),
  ]),
});

// Create a map of composition IDs to their respective schemas
const compositionSchemas = {
  Audiogram: AudioGramSchema,
  Scene1: Scene1Schema,
  Scene2: Scene2Schema,
  Scene3: Scene3Schema,
  Main: MainSchema,
  GeneratedVideo: GeneratedVideoSchema,
} as const;

// Type for composition IDs
export type CompositionId = keyof typeof compositionSchemas;

// Function to get the correct schema based on composition ID
export function getSchemaForComposition<T extends CompositionId>(
  id: T,
): (typeof compositionSchemas)[T] {
  return compositionSchemas[id];
}

// Type to infer props from a Zod schema
export type InferredProps<T extends z.ZodType<any, any, any>> = z.infer<T>;

// Function to validate props against the correct schema
export function validateCompositionProps<T extends CompositionId>(
  id: T,
  props: InferredProps<(typeof compositionSchemas)[T]>,
): InferredProps<(typeof compositionSchemas)[T]> {
  const schema = getSchemaForComposition(id);
  return schema.parse(props);
}

// Usage example
export function getCompositionProps<T extends CompositionId>(
  id: T,
  props: InferredProps<(typeof compositionSchemas)[T]>,
) {
  const validatedProps = validateCompositionProps(id, props);
  console.log(`Creating composition ${id} with props:`, validatedProps);
  return validatedProps;
}

// Example call

// getCompositionProps('Main', {
//   artists: ['Artist 1', 'Artist 2', 'Artist 3', 'Artist 4'],
//   topSongName: 'Top Song',
//   topSongArtistName: 'Top Artist',
//   topSongCover: 'https://example.com/top-song-cover.jpg',
//   ranking: ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'],
// });
