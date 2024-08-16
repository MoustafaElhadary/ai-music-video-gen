export const VIDEO_QUEUE = 'video-queue';

export const MAX_FILE_SIZE_MB = 40;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// TODO: remove later
export const testVideoData = [
  {
    durationInSeconds: 46,
    startFrom: 0,
    media: [
      {
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/imdbp1uQIzH-9u2faC84nQ/RibT7l0BKzL3GcWTPOIrTBTjcLCiMn2dKV0IdYs6WN64j1p6JiXsuRG9GsYkDKkhX0uCnySbz-0sjK3s7ou6OhWlojzvrC9BW6KfBdHj-yNY0OW6ZltITFVi5KDvZWePj5Qaw_jkCIocx2193IVVdL7RpXBBg6oPp8WR2yNQM2Q/mBAxeOOWM_vrCSay3JAi1D7o-0FGcEEExS5yIyExlJA',
        type: 'audio/mpeg',
      },
    ],
    name: 'Bg music',
  },
  {
    durationInSeconds: 46,
    startFrom: 0,
    name: 'BG white',
    bgStyle: 'bg-white',
  },
  {
    durationInSeconds: 10,
    startFrom: 10,
    name: 'BG pink',
    bgStyle: 'bg-gradient-to-bl from-white via-pink-200 to-indigo-300',
  },
  {
    durationInSeconds: 20,
    startFrom: 0,
    name: 'BG gray',
    bgStyle: 'bg-gradient-to-bl from-white via-gray-200 to-gray-300',
    animation: [
      'Move({ x: 1080, y: , start: 240, duration: 36, mass: 4, damping: 9, stiffness: 10, overshootClamping: true })',
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/l2CwOSKK3uDBBw27L8jtsA/VUZvQGHxAkth3vy1J_Sr3xYuUKrAghfPXWnJx302QvMV1TENDfFZzwo2j3MykScG4mO2tcXu2Zl1Lqe63WXBWDLZqIe46STVtrK_5x0At4cv1kpdK476mn8KcZh39Hov_nmZ4yib4JE2WP5sfKaYfw/Czpmgo5cV21nrFzIORydUL6KEZRR9y8x5dFqMkCC634',
        type: 'image/svg+xml',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/tdpVl5Fi67czcH74VvwuzQ/4AzMga5KJ7-FL6q4lSXkzKTFoOzdUdtfJfaPOH6IIVPeDCrgbEgRcmhgOxnI61h3ZLB3dbIL4vXbAnDp8585a56k8kpvohEeyLLGJSs3k12tK0u-js0QUnRK1aH2qBlt_GT_W45hz6nQsMJSMmkzRuBuWW5KHXOAJYt5KQLgnrM/cInPtYAMUXy8lIyVDBLUL-hIDN_g0XGKkuoxcsSFEwA',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/nRA9xy7QqKfqvqh_sj2nCA/T1VDyyXQSA4CUnEumo1CGcyhGhN-g6GcCIYuVQ7VK4m_zqaimLLhUWuc9OABaat1Cs6uABcvNpNZlYN2_fVP2Y8e2Br_PpYADi17i-1bsGxBgFOymYRrHsEE6_ypjKbdWvyTp0szooSyo3IUeHpVJWahDzTesC_X87P1Nl-ZT70/FvvvnvpWqD0k30EG6SNPOD1QV_XK3gRKWBnQO3zGolI',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/6pQzvW_g7kEgetu1C0WJ9A/PPFApf4dQi6j-keJSnHuVpa8WJQq5y758yrdtxVlltMrlH6FnkqMHrkgP2QDJRJTMwaF4HAjEFqzjagaF5BRPX72jBqAGoyvVFiazSAEq1GUVV5GTLcogLB6lm5607DegXJg6jXqQxZJQl8i9iajCTG2Vl0qBSQeyYqhZ2KT7kE/F1Y8Wy855xeBKUALigKmJ4_8ZGfSqTR5RAN0mAFadD0',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/5CZn_jfAQkRxzhvZz2P58w/LmAVE2eNJtGrR14dfkrrdeNBZWKJFys7Yuyu3-lhYbzCKpKv8zcRfqoRht476moWIfo2aCSBCrrVZOP3dLG7k6E_v_I3uTtdSod7OWbgQG6DZAokGL-DmWZzZNBUuqN8GPKKLQNWPAL6ar-NTPpNlt2QT3RnAeRnO1Uk8WAL56I/vAhVp0jT3mzzGYHycDAZC2VPjuOkqTIwDyQqse9KohY',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/9c3ZKYHVGur1h82uk432bg/WivSGv-fGq7nkCUliLY2FsCZM4MP3ZceslYzvg82Iqf_1d1HGph7g6sDBKS4TU0yz6BZNQCN7d3L8Djw4vcOqncPMv6XWo_edBFi6xa6wUncpQD4EJHd4Dv3J7uz3sNI-0K8xTkK0UPW1Jb-gVbTQg/X_ddRN27CiEP8AIa-jy6tcB7tITVrg597Cv_8Og1J94',
        type: 'video/mp4',
      },
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/ZU3whwAvWnuzECimnjNRgw/AgSzok8NOHPnutMxFRUKfZ-gitKuGZ8WFcD3g7iCxaJf-1VtcnKuF1vQaBz0HPYigB3qMgnzPghM6JyULjmwYIbwAorLw9YY_ikMpPYLwsQWjgmzi8QEhQYcux8XST4SnU11HKsDuRfmn-lk10R1F1JdOxhCXziE7b_OJuINc_M/5MBSsYU6hfOv-jf9fojVeOXX_BE23Xxzx1TqmKFju84',
        type: 'video/mp4',
      },
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/ReyZgT0S-3-451O1oA-EdA/noJ66INUaIGWyw-BT8ZffjErNfM6N6gTjro-WZDsIGWPdShjoybxy72QQTsF2qHWyUoJH7rUgumepvHzbE_z8MgAP3OVL-J9gjHdzJqlhQ9Cuy309iyUF3bm8EOxtij0kUVhE2Q7nuqL6Y4HJrnkw9sVQdah3Hga5Z3M_Le20WY/--7TrcmigebuP5uuzaFRE1b4bEVCPoF7PskbXoucc4M',
        type: 'video/mp4',
      },
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/tMlvvSQ7X5ffNMx_mR0hRg/QKf1MmaT-HmnQuUcALzDezYBoAqSk9UkXh3i52mub0qwFrUkI2nIDiU21gNMzMZsZemVDOAUMDBln3So-YJ-C1yytjChd1Bk8wU9wt3tnVVb80SCKCK0Yc5TCWBYi2tFpmr74NllFjaTKSDN0ZrvClQLzpIoqF7fjCK8wOjYS2o/G0cQeqYq4SZNHWkDHSvUOoRRZKG1P6xdgg-caxj2k5g',
        type: 'video/mp4',
      },
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/XuvL9fL5KtamSD1_A6OONA/BKgob14vaXfVwOCvZ3IdAstAd71X2Gp5RGPmbtn9mcap3kZL72DzrdOtEHnXMOigeQXxSf79o8idyAAZuc_sps5kGZpyR4LBBIY-HKYXpurARIIk0zgt1nMBUZk5xvrb-l9-A4z4KCzZ0od-x_2Y02qAM9v3ILwHPB4s4u9StSY/8yaOFAGwDe5T84esbNgKnViEtujTx8DO4JZ7VKXduAs',
        type: 'video/mp4',
      },
    ],
    name: 'Airtable demo',
    bgStyle: 'bg-gray-500',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/4YcfXSHMosxknhNrKyL1gA/vqFfmZPfuvQHkkF4czDgCTER7PquGNCiZ_-Mcmd-QiQPg9AC2HeJAitZBXdGfxKrFZcf2p99ARTYx6HdRL2-XfIDhl9k2HvAX5YCUVMWACV2ZV1oxYzTR_VTT56E7eKfBnkGow_v6gbj9Z9CHAd_WQ/1xs0M5Ng-OJ9l3OAWpNSRAwtl16Ta0OUufdv7QbjDPM',
        type: 'video/mp4',
      },
    ],
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719734400000/l2CwOSKK3uDBBw27L8jtsA/VUZvQGHxAkth3vy1J_Sr3xYuUKrAghfPXWnJx302QvMV1TENDfFZzwo2j3MykScG4mO2tcXu2Zl1Lqe63WXBWDLZqIe46STVtrK_5x0At4cv1kpdK476mn8KcZh39Hov_nmZ4yib4JE2WP5sfKaYfw/Czpmgo5cV21nrFzIORydUL6KEZRR9y8x5dFqMkCC634',
        type: 'image/svg+xml',
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
];
