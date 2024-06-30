import React from 'react';

import cn from 'clsx';
import { Img } from 'remotion';

export const Image: React.FC<{ src: string; mediaStyle?: string }> = ({
  src,
  mediaStyle,
}) => {
  return (
    <>
      <Img
        src={src}
        className={cn('absolute', mediaStyle ? mediaStyle : 'w-full')}
      />
    </>
  );
};
