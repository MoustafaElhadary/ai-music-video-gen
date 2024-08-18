import { spring } from 'remotion';
import type { SpringConfig } from 'remotion';
import type { AnimationOptions } from '../animations/AnimationOptions';

const AnimationSpring =
  (withDefaultConfig?: Partial<SpringConfig>) =>
  (frame: number, fps: number, options: AnimationOptions = {}) => {
    const { start, ...overrideSpringConfig } = options;
    return spring({
      fps,
      frame: frame - (start ?? 0),
      durationInFrames: options.duration,
      config: {
        ...withDefaultConfig,
        ...overrideSpringConfig,
      },
    });
  };

export default AnimationSpring;
