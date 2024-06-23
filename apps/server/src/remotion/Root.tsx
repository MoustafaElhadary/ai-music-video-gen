import React from 'react';

import { Composition, staticFile } from 'remotion';
import { AudioGramSchema, AudiogramComposition, fps } from './Composition';
import './style.css';
import { srt } from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1080}
        height={1080}
        schema={AudioGramSchema}
        defaultProps={{
          // Audio settings
          audioOffsetInSeconds: 6.9,

          // Title settings
          audioFileName:
            'https://cdn1.suno.ai/a563e6d7-e9d8-490f-b812-6338fb2ea4f8.mp3',
          coverImgFileName:
            'http://localhost:3001/static-4092756568f2/cover.jpg',
          titleText:
            '#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm',
          titleColor: 'rgba(186, 186, 186, 0.93)',

          // Subtitles settings
          subtitlesFileName: srt,
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
          subtitlesLinePerPage: 4,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,

          // Wave settings
          waveColor: '#a3a5ae',
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 29,
          waveNumberOfSamples: '256', // This is string for Remotion controls and will be converted to a number
          mirrorWave: true,
          durationInSeconds: 29.5,
        }}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * fps,
            props,
          };
        }}
      />
    </>
  );
};
