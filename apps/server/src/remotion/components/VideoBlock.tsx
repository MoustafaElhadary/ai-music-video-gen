import cn from 'clsx';
import React from 'react';
import { OffthreadVideo } from 'remotion';

export const VideoBlock: React.FC<{
  src: string;
  mediaStyle?: string;
  volume?: number;
}> = ({ src, mediaStyle, volume }) => {
  return (
    <>
      <OffthreadVideo
        src={src}
        className={cn('absolute', mediaStyle ? mediaStyle : 'w-full')}
        volume={volume}
      />
    </>
  );
};
