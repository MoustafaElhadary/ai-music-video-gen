import type { SubtitleItem } from 'parse-srt';
import React from 'react';
import { Easing, interpolate } from 'remotion';

export const Word: React.FC<{
  readonly item: SubtitleItem;
  readonly frame: number;
  readonly transcriptionColor: string;
  readonly isRTL: boolean;
}> = ({ item, frame, transcriptionColor, isRTL }) => {
  const opacity = interpolate(frame, [item.start, item.start + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(
    frame,
    [item.start, item.start + 10],
    [0.25, 0],
    {
      easing: Easing.out((t) => Easing.quad(t)),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        translate: `0 ${translateY}em`,
        color: transcriptionColor,
        direction: isRTL ? 'rtl' : 'ltr',
        unicodeBidi: 'embed',
      }}
    >
      {item.text}
    </span>
  );
};
