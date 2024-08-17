import { SceneDataArraySchema } from '@server/remotion/types';
import { z } from 'zod';

export const VIDEO_QUEUE = 'video-queue';

export const MAX_FILE_SIZE_MB = 40;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const USER_UPLOAD_FOLDER = 'user-uploads';

export const VIDEOS_FOLDER = 'videos';

// TODO: remove later
export const testVideoData: z.infer<typeof SceneDataArraySchema> = [
  {
    durationInSeconds: 176,
    startFrom: 0,
    media: [
      {
        url: 'https://cdn1.suno.ai/a307051f-4685-49ab-9e51-d634b384695d.mp3',
        type: 'audio/mpeg',
      },
    ],
    name: 'Bg music',
  },
  {
    durationInSeconds: 176,
    startFrom: 0,
    name: 'BG white',
    bgStyle: 'bg-white',
  },
  {
    durationInSeconds: 176,
    startFrom: 0,
    name: 'BG pink',
    bgStyle: 'bg-gradient-to-bl from-white via-pink-200 to-indigo-300',
  },
  {
    durationInSeconds: 10,
    startFrom: 0,
    text: 'Welcome to:',
    name: 'Background  white',
    textStyle: 'w-72 -translate-y-64 text-center scale-150 text-5xl font-bold',
    bgStyle: 'bg-gradient-to-bl from-white via-blue-50 to-blue-200',
    animation: [
      'Move({ x: 1080, y: , start: 48, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 20,
    startFrom: 0,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Logo SVG',
    mediaStyle: 'scale-150',
    animation: [
      'Move({ x: , y: 300, initialY: -1080, duration: 36, mass: 4, damping: 9, stiffness: 120, overshootClamping: false })',
      'Move({ x: 1080, y: , start: 48, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 20,
    startFrom: 0,
    text: 'Rewind Table',
    name: 'Rewind Table',
    textStyle:
      "absolute w-52 flex justify-center -translate-y-12 scale-150 text-center text-8xl font-bold font-['Akshar']",
    animation: [
      'Move({ x: , y: , initialX: 1080, duration: 36, mass: 4, damping: 9, stiffness: 120, overshootClamping: false })',
      'Move({ x: 1080, y: , start: 48, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 10,
    startFrom: 3,
    text: 'Create programmatic videos at scale, directly  from Airtable',
    name: 'Create programmatic videos directly from Airtable ',
    textStyle:
      'absolute max-w-lg scale-150 rounded-3xl p-4 text-center text-6xl font-bold text-gray-900',
  },
  {
    durationInSeconds: 3,
    startFrom: 6,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Cat1',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 7,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Cat2',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 8,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Cat3',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 9,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Cat1',
    mediaStyle: 'rounded-3xl',
  },
  {
    durationInSeconds: 10,
    startFrom: 6,
    text: 'AI generated images',
    name: 'AI  Generated Kittens',
    textStyle:
      'absolute max-w-lg scale-150 text-center text-6xl font-bold text-gray-900 translate-y-[700px]',
    animation: [
      'Move({ x: 1080, y: , start: 96, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 11,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Dog',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 12,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Dog2',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 3,
    startFrom: 13,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Dog4',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Rotate({ degrees: -45, initial: , start: 24, overshootClamping: false })',
      'Move({ x: -1210, y: 1210, initialY: -50, start: 24, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
      'Move({ x: 0, y: -50, initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 10,
    startFrom: 14,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Dog5',
    mediaStyle: 'rounded-3xl',
    animation: [
      'Rotate({ degrees: , initial: 45, overshootClamping: false })',
      'Move({ x: 0, y: , initialX: 1210, initialY: 1210, overshootClamping: false })',
    ],
  },
  {
    durationInSeconds: 10,
    startFrom: 11,
    text: 'Videos imported via API',
    name: 'Puppy vids via API',
    textStyle:
      'absolute inline-block max-w-xl translate-y-[700px] scale-150 rounded-2xl bg-gray-50 p-4 text-center text-6xl font-bold text-gray-900',
    animation: [
      'Move({ x: 1080, y: , start: 96, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 2,
    startFrom: 15,
    text: 'Create customizable video templates',
    name: 'Create customizable video templates',
    textStyle:
      'absolute flex h-80 max-w-[420px] translate-y-[290px] rotate-6 -translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 2,
    startFrom: 16,
    text: 'for your social media',
    name: 'for your social media',
    textStyle:
      'absolute flex h-80 max-w-[420px] translate-y-[290px] rotate-6 -translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 1,
    startFrom: 17,
    text: 'for your  customers 👨‍👩‍👧🙌',
    name: 'for your  customers 👨‍👩‍👧🙌',
    textStyle:
      'absolute flex h-80 max-w-[420px] translate-y-[290px] rotate-6 -translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 4,
    startFrom: 17,
    text: 'for your products 📦🎁',
    name: 'for your products 📦🎁',
    textStyle:
      'absolute flex h-80 max-w-[420px] translate-y-[290px] rotate-6 -translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
      'Move({ x: -1080, y: , start: 24, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
      'Move({ x: -1080, y: , start: 72, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 19,
    startFrom: 19,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Airtable demo',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 4,
    startFrom: 20,
    text: '📄📋 copy paste content ',
    name: '📄📋 copy paste content ',
    textStyle:
      'absolute flex h-80 max-w-lg translate-y-[600px] translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900 border-4',
  },
  {
    durationInSeconds: 4,
    startFrom: 23,
    text: 'Customize your own animations',
    name: 'Animation',
    textStyle:
      'absolute flex h-80 max-w-lg translate-y-[600px] translate-x-7 scale-150 place-items-center rounded-2xl bg-gray-50 p-14 text-center text-5xl font-bold text-gray-900 border-4',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
      'Move({ x: -1080, y: , start: 72, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 4,
    startFrom: 37,
    media: [
      {
        url: 'https://ifpupndmbhydfccmnbuz.supabase.co/storage/v1/object/public/songs/public/Audiogram-clzx25s550005416iv92qwl2t.mp4?t=2024-08-16T19%3A29%3A27.891Z',
        type: 'video/mp4',
      },
    ],
    volume: 0,
    name: 'Video output',
    animation: [
      'Move({ x: , y: , initialY: 1920, duration: 12, overshootClamping: true })',
      'Move({ x: , y: , initialX: 1080, duration: 12, overshootClamping: true })',
    ],
  },
  {
    durationInSeconds: 5,
    startFrom: 41,
    name: 'BG gray',
    bgStyle: 'bg-gradient-to-bl from-white via-gray-200 to-gray-300',
  },
  {
    durationInSeconds: 5,
    startFrom: 41,
    media: [
      {
        url: 'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
        type: 'image/png',
      },
    ],
    name: 'Logo SVG',
    mediaStyle: 'scale-150',
  },
  {
    durationInSeconds: 5,
    startFrom: 41,
    text: 'Rewind Table',
    name: 'Rewind Table',
    textStyle:
      "absolute w-52 flex justify-center -translate-y-12 scale-150 text-center text-8xl font-bold font-['Akshar']",
  },
  {
    durationInSeconds: 5,
    startFrom: 41,
    text: 'Visit \nrewind-table.com',
    name: '📄📋 copy paste content ',
    textStyle:
      'absolute flex h-80 max-w-lg translate-y-[600px] translate-x-7 scale-150 place-items-center  text-center text-5xl font-bold text-gray-900',
  },
  {
    name: 'Subtitles',
    durationInSeconds: 170,
    startFrom: 0,
    subtitles: {
      onlyDisplayCurrentSentence: false,
      subtitlesTextColor: 'rgba(0, 255, 255, 1)',
      subtitlesLinePerPage: 4,
      subtitlesZoomMeasurerSize: 10,
      subtitlesLineHeight: 98,
      isRTL: false,
      audioOffsetInSeconds: 4,
      srt: "1\n00:00:00,000 --> 00:00:11,000\nMaha shines so bright\n\n2\n00:00:11,000 --> 00:00:16,000\nBarry dreams in sight\n\n3\n00:00:16,000 --> 00:00:20,000\nCounselor's heart so wide\n\n4\n00:00:20,000 --> 00:00:25,000\nNow it's her time to ride\n\n5\n00:00:25,000 --> 00:00:27,000\nCelebrate\n\n6\n00:00:27,000 --> 00:00:29,000\nMaha's day\n\n7\n00:00:29,000 --> 00:00:31,000\nDance and shout\n\n8\n00:00:31,000 --> 00:00:34,000\nHooray\n\n9\n00:00:34,000 --> 00:00:36,000\nFuture's clear\n\n10\n00:00:36,000 --> 00:00:38,000\nAs light\n\n11\n00:00:38,000 --> 00:00:40,000\nMaha's shining bright\n\n12\n00:00:59,000 --> 00:01:14,000\nBarry dreams in sight\n\n13\n00:01:14,000 --> 00:01:18,000\nCounselor's heart so wide\n\n14\n00:01:18,000 --> 00:01:24,000\nBarry dreams in sight\n\n15\n00:01:24,000 --> 00:01:26,000\nMaha shines so bright\n\n16\n00:01:26,000 --> 00:01:28,000\nBarry dreams in sight\n\n17\n00:01:28,000 --> 00:01:29,000\nMaha shines so bright\n\n18\n00:01:29,000 --> 00:01:29,000\nHooray!\n\n19\n00:01:29,000 --> 00:01:29,000\nFuture's clear\n\n20\n00:01:29,000 --> 00:01:29,000\nMaha shines so bright\n\n21\n00:01:29,000 --> 00:01:31,000\nAs light\n\n22\n00:01:31,000 --> 00:01:33,000\nMaha shines so bright\n\n23\n00:01:33,000 --> 00:01:36,000\nTwo kids by her side\n\n24\n00:01:36,000 --> 00:01:40,000\nIn her love they confide\n\n25\n00:01:40,000 --> 00:01:45,000\nThrough each stage and tide\n\n26\n00:01:45,000 --> 00:01:49,000\nMaha's joy can't hide\n\n27\n00:01:49,000 --> 00:01:51,000\nCelebrate\n\n28\n00:01:51,000 --> 00:01:54,000\nMaha's day\n\n29\n00:01:54,000 --> 00:01:56,000\nDance and shout\n\n30\n00:01:56,000 --> 00:01:58,000\nHooray!\n\n31\n00:01:58,000 --> 00:02:00,000\nFuture's clear\n\n32\n00:02:00,000 --> 00:02:02,000\nAs light\n\n33\n00:02:02,000 --> 00:02:04,000\nMaha's shining bright\n\n34\n00:02:04,000 --> 00:02:06,000\nHooray!\n\n35\n00:02:06,000 --> 00:02:08,000\nHooray!\n\n36\n00:02:08,000 --> 00:02:10,000\nHooray!\n\n37\n00:02:10,000 --> 00:02:12,000\nHooray!\n\n38\n00:02:12,000 --> 00:02:14,000\nMaha shines so bright\n\n39\n00:02:14,000 --> 00:02:16,000\nMaha shines so bright\n\n40\n00:02:16,000 --> 00:02:18,000\nHooray!\n\n41\n00:02:18,000 --> 00:02:20,000\nEgypt's pride and joy\n\n42\n00:02:20,000 --> 00:02:22,000\nHooray!\n\n43\n00:02:22,000 --> 00:02:24,000\nCounselor deploy\n\n44\n00:02:24,000 --> 00:02:26,000\nWisdom she'll employ\n\n45\n00:02:26,000 --> 00:02:27,000\nWith love she will enjoy\n\n46\n00:02:27,000 --> 00:02:30,000\nCelebrate\n\n47\n00:02:30,000 --> 00:02:33,000\nMaha's day\n\n48\n00:02:33,000 --> 00:02:37,000\nDance and shout\n\n49\n00:02:37,000 --> 00:02:38,000\nHooray!\n\n50\n00:02:38,000 --> 00:02:40,000\nFuture's clear\n\n51\n00:02:40,000 --> 00:02:43,000\nAs light\n\n52\n00:02:43,000 --> 00:02:45,000\nMaha's shining bright\n\n53\n00:02:45,000 --> 00:02:47,000\nHooray!\n\n54\n00:02:47,000 --> 00:02:49,000\nMaha's shining bright\n\n55\n00:02:49,000 --> 00:02:53,000\nHooray!\n\n56\n00:02:53,000 --> 00:02:56,000\nMaha's shining bright\n\n57\n00:02:56,000 --> 00:02:57,000\nHooray!\n\n58\n00:02:57,000 --> 00:03:00,000\nOh, oh, oh, oh",
    },
  },
];
