import React, { useEffect } from 'react';
import { Composition } from 'remotion';
import { testVideoData } from '../core/constants';
import { AudioGramSchema, AudiogramComposition, fps } from './Composition';
import { srt } from './constants';
import { GeneratedVideo, GeneratedVideoSchema } from './GeneratedVideo';
import { Gradient } from './Gradient';
import { GradientCircle } from './GradientCircle';
import { Main } from './Main';
import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';
import './style.css';
import { Wrapped } from './Wrapped';

export const preloadHTMLScript = (
  src: string,
): HTMLScriptElement | (() => undefined) => {
  if (typeof document === 'undefined') {
    console.warn('() was called outside the browser. Doing nothing.');
    return () => undefined;
  }

  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
  return script;
};

export const RemotionRoot: React.FC = () => {
  useEffect(() => {
    preloadHTMLScript('https://cdn.tailwindcss.com');
  }, []);
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
            'https://github.com/remotion-dev/template-audiogram/blob/main/public/cover.jpg?raw=true',
          titleText: '#234 – Test 123',
          titleColor: 'rgba(186, 186, 186, 0.93)',

          // Subtitles settings
          subtitlesFileName: srt,
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
          subtitlesLinePerPage: 4,
          subtitlesZoomMeasurerSize: 10,
          subtitlesLineHeight: 98,
          isRTL: false,

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
      <Composition
        id="Gradient"
        component={Gradient}
        width={720}
        height={1280}
        durationInFrames={120}
        fps={30}
        defaultProps={{ height: 1280 }}
      />
      <Composition
        id="Scene1"
        component={Scene1}
        width={720}
        height={1280}
        durationInFrames={210}
        fps={30}
        defaultProps={{
          sources: [
            'weeknd.jpg',
            'maryjblige.jpg',
            'roots.jpg',
            'samsmith.jpg',
          ],
        }}
      />
      <Composition
        id="Wrapped"
        component={Wrapped}
        width={720}
        height={1280}
        durationInFrames={210}
        fps={30}
      />
      <Composition
        id="GradientCircle"
        component={GradientCircle}
        width={720}
        height={1280}
        durationInFrames={210}
        fps={30}
      />
      <Composition
        id="Scene2"
        component={Scene2}
        width={720}
        height={1280}
        durationInFrames={210}
        fps={30}
        defaultProps={{
          ranking: [
            'Rap',
            'Pop',
            'Underground\nHip Hop',
            'Alternative R&B',
            'Neo Soul',
          ] as [string, string, string, string, string],
        }}
      />
      <Composition
        id="Scene3"
        component={Scene3}
        width={720}
        height={1280}
        durationInFrames={150}
        fps={30}
        defaultProps={{
          topSongName: 'All I Talk Is Money',
          topSongArtistName: 'Albusta',
          topSongCover:
            'https://i.scdn.co/image/ab67616d00001e02d0108ee3b4a64bddfa7e6cc2',
        }}
      />
      <Composition
        id="Main"
        component={Main}
        width={720}
        height={1280}
        durationInFrames={360 + 210}
        fps={30}
        defaultProps={{
          artists: [
            'weeknd.jpg',
            'maryjblige.jpg',
            'roots.jpg',
            'samsmith.jpg',
          ],
          topSongName: 'All I Talk Is Money',
          topSongArtistName: 'Albusta',
          topSongCover:
            'https://i.scdn.co/image/ab67616d00001e02d0108ee3b4a64bddfa7e6cc2',
          ranking: [
            'Rap',
            'Pop',
            'Underground\nHip Hop',
            'Alternative R&B',
            'Neo Soul',
          ] as [string, string, string, string, string],
        }}
      />
      <Composition
        id="GeneratedVideo"
        component={GeneratedVideo}
        durationInFrames={60 * 2}
        fps={fps}
        height={1920}
        width={1080}
        defaultProps={{
          data: testVideoData,
        }}
        schema={GeneratedVideoSchema}
        calculateMetadata={({ props }) => {
          const durationInSeconds = props.data?.[0]?.durationInSeconds ?? 2;

          return {
            durationInFrames: Math.floor(durationInSeconds * 30),
          };
        }}
      />
    </>
  );
};
