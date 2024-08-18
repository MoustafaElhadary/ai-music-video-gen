/* eslint-disable @remotion/volume-callback */
/* eslint-disable complexity */
import cn from 'clsx';
import React from 'react';
import { Audio, useVideoConfig } from 'remotion';
import { Image } from '../components/Image';
import { Text } from '../components/Text';
import { VideoBlock } from '../components/VideoBlock';

import { z } from 'zod';
import type { Animation } from '../animation';
import { Animated, Move, Rotate, Scale } from '../animation';
import { PaginatedSubtitles } from '../Subtitles';
import type { SceneData } from '../types';
import { SceneDataSchema } from '../types';

export const fps = 30;

export function stringToReAnimated(str: string[]): Animation[] {
  const animationArray: Animation[] = [];

  str.forEach((item) => {
    if (!item) return;

    const x = item.match(/x: *(-*\d+\.?\d?)/)?.[1] || 0;
    const y = item.match(/y: *(-*\d+\.?\d?)/)?.[1] || 0;
    const initialX = item.match(/initialX: *(-*\d+\.?\d?)/)?.[1] || 0;
    const initialY = item.match(/initialY: *(-*\d+\.?\d?)/)?.[1] || 0;
    const by = item.match(/by: *(-*\d+\.?\d?)/)?.[1] || 0;
    const degrees = item.match(/degrees: *(-*\d+\.?\d?)/)?.[1] || 0;
    const initial = item.match(/initial: *(-*\d+\.?\d?)/)?.[1] || 0;

    const start = item.match(/start: *(\d+\.?\d?)/)?.[1] || 0;
    const duration = item.match(/duration: *(\d+\.?\d?)/)?.[1] || 0;
    const mass = item.match(/mass: *(\d+\.?\d?)/)?.[1] || 0;
    const damping = item.match(/damping: *(\d+\.?\d?)/)?.[1] || 0;
    const stiffness = item.match(/stiffness: *(\d+\.?\d?)/)?.[1] || 0;
    const overshootClamping =
      item.match(/overshootClamping: *(true|false)/)?.[1] || false;

    const springOptions = {
      ...(Boolean(mass) && { mass: Number(mass) > 1 ? Number(mass) : 1 }),
      ...(Boolean(damping) && {
        damping: Number(damping) > 5 ? Number(damping) : 5,
      }),
      ...(Boolean(stiffness) && {
        stiffness: Number(stiffness) > 1 ? Number(stiffness) : 1,
      }),
      ...(Boolean(overshootClamping) && {
        overshootClamping: overshootClamping === 'true',
      }),
    };

    const timingOptions = {
      start: Number(start),
      ...(Boolean(duration) && { duration: Number(duration) }),
    };

    if (item.startsWith('Move')) {
      animationArray.push(
        Move({
          x: Number(x),
          y: Number(y),
          initialX: Number(initialX),
          initialY: Number(initialY),
          ...timingOptions,
          ...springOptions,
        }),
      );
    } else if (item.startsWith('Scale')) {
      animationArray.push(
        Scale({
          by: Number(by),
          ...(Boolean(initial) && { initial: Number(initial) }),
          ...(Boolean(x) && { x: Number(x) }),
          ...(Boolean(y) && { y: Number(y) }),
          ...(Boolean(initialX) && { initialX: Number(initialX) }),
          ...(Boolean(initialY) && { initialY: Number(initialY) }),
          ...timingOptions,
          ...springOptions,
        }),
      );
    } else if (item.startsWith('Rotate')) {
      animationArray.push(
        Rotate({
          degrees: Number(degrees),
          initial: Number(initial),
          ...timingOptions,
          ...springOptions,
        }),
      );
    }
  });

  return animationArray;
}

export const Subtitles: React.FC<
  z.infer<typeof SceneDataSchema.shape.subtitles>
> = ({ ...props }) => {
  const {
    srt,
    audioOffsetInSeconds,
    subtitlesLinePerPage,
    subtitlesZoomMeasurerSize,
    subtitlesLineHeight,
    onlyDisplayCurrentSentence,
    subtitlesTextColor,
    isRTL,
  } = props;
  const { durationInFrames } = useVideoConfig();

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      className="px-32"
    >
      <div
        style={{
          lineHeight: `${subtitlesLineHeight}px`,
          textAlign: isRTL ? 'right' : 'left',
          marginTop: '1320px',
        }}
        className="text-6xl"
      >
        <PaginatedSubtitles
          subtitles={srt}
          startFrame={audioOffsetInFrames}
          endFrame={audioOffsetInFrames + durationInFrames}
          linesPerPage={subtitlesLinePerPage}
          subtitlesTextColor={subtitlesTextColor}
          subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
          subtitlesLineHeight={subtitlesLineHeight}
          onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
          isRTL={isRTL}
        />
      </div>
    </div>
  );
};

export const RegularScene: React.FC<SceneData> = ({
  text,
  media,
  textStyle,
  mediaStyle,
  bgStyle,
  animation,
  volume,
  subtitles,
  children,
}) => {
  const image = media?.[0]?.type?.startsWith('image') ? media[0] : null;
  const video = media?.[0]?.type?.startsWith('video') ? media[0] : null;
  const sound = media?.[0]?.type?.startsWith('audio') ? media[0] : null;

  return (
    <>
      <Animated
        className={cn(
          'items-center justify-center',
          'absolute inset-0 flex h-full w-full flex-col',
          bgStyle ? bgStyle : '',
        )}
        animations={stringToReAnimated(animation || [])}
      >
        {video && (
          <VideoBlock src={video.url} mediaStyle={mediaStyle} volume={volume} />
        )}
        {image && <Image src={image.url} mediaStyle={mediaStyle} />}
        {Boolean(text) && <Text text={text} textStyle={textStyle} />}
        {children &&
          children.map((child, index) => (
            <div key={index} className={child.className} />
          ))}
        {subtitles && <Subtitles {...subtitles} />}
      </Animated>
      {sound && <Audio src={sound.url} volume={volume} />}
    </>
  );
};
