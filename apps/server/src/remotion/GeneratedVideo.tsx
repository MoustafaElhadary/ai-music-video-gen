import { Sequence, useVideoConfig } from 'remotion';
import { RegularScene } from './scenes/RegularScene';
import React from 'react';
import { z } from 'zod';
import { SceneDataSchema } from './types';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tailwind: any;
  }
}

export const GeneratedVideoSchema = z.object({
  data: z.array(SceneDataSchema),
});

type GeneratedVideoProps = z.infer<typeof GeneratedVideoSchema>;

export const GeneratedVideo: React.FC<GeneratedVideoProps> = ({ data }) => {
  const { fps } = useVideoConfig();

  return (
    <>
      {data.map((scene, index) => (
        <Sequence
          key={index}
          durationInFrames={scene.durationInSeconds * fps}
          from={scene.startFrom * fps}
          name={scene.name}
        >
          <RegularScene {...scene} />
        </Sequence>
      ))}
    </>
  );
};
