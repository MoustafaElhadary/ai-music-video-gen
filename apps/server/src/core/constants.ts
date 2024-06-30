export const VIDEO_QUEUE = 'video-queue';

//TODO: remove later
export const testVideoData = [
  {
    durationInSeconds: 46,
    startFrom: 0,
    media: [
      {
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/qv7xUK3OrwjBLA6wNwGNYA/Hqi1wAdwL07PqbAIlAS6Bqbqr7CFyRUadilT6Agsv9Fd8Ez-IvEpFaStQ3MQBFHE27Yc7VXP3cYQalqWfUPvD8XqfV4ltBcHBWXhbkEdIBATP8xZTcX83uNYhNBQHFbc9cBLyjDSSD0WlTC9w3tJB9X0zpIEr8rbA5GEJLj9M-s/zjEgWHEx8ada38vImtkDybKi0o14EOPySlekqLvrAdQ',
        type: 'audio/mpeg',
      },
    ],
    name: 'Bg music',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/l2WofsvySZEvP_Y0wPhQOA/OSHOy3xRVHSOmGotC-roi40pXcuPgCL2Q3RDmKjLFcD2qwyC4N7BAkntwHBkM86dWmPKs4ROuzPLz2nTVhg78mOLL5dGAzVAnkq42V73gYOmWpli6fTHj_KbLQSYY6cTx52TutpENKdO0b5B1Bhsxw/xWWN1ztCW6qc9OXEhInTXgQWtDH0C3bkt1J0afRpjag',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/ZtsMlLUrBn7zc-nms_0s6w/y4lmmSV1FnM92JKtaqbYHMI7fOsM-scwJm9UwmdbwdhVx05itv6O13BWWxEZRDC6TtUv-2MN88-_KxxLYugmBRE9C97kEm31XZpZdUPcC0K4-DnIT60IgpaxUZND-SMwyKSzbDJK7RAhz1sSHRp-1W6dif-nW_XdlIiJXL2mYUA/kaqoDVzRiJ3wNvR2Z6AjHK2fsGr7eKEIEcoSvLQ4BwU',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/bgLB2irqE_XH70lFPwLEdQ/D9YCSHqTyVTRkeOVziasFgesyfNEMet5dI-cHWgVu_bbLNSZRdb7Gdzio1F5x1wLgAcdVoTJHG4WuYtvkQs8OkAvIkLStPFyStlaPyDaqdyhxl8mXIwrS6BrSbEt5bXBXLXANtH-IgYH4_Sx1pbj42LVrcYpgQa27rI0geoCkdc/qzQgqld3iTx85-5GOcRqExd5ox1Oxwt679Ck2msV2kM',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/Z2yEtUG098TeP_jTBY567Q/9qCr2wHvhA5iBbGdAJ1HsWjxZIsk4wktaO-SFdSVEEDyW1DwPGkPSmD3ukJDJajCbjNwqYGNFsdx9_Qt0vOkRIjLnB1ctDdzQiHkH-JVPe0UOq8VzlpB0sFn5BnJG0HDjdvHo3Q5IcCZFMsYFk-ugHTDzAJKuBSgm7xJzLCiTrc/KYaTE5YQte5MNUJZU6Ct4pYt1O8e2I5t0OXKSMymCJM',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/L5i6ISEgFbL8_3qhJ0oC9g/iGXc7wISB0rz5u3kNLK7RKslFnJEhmGiifc2Oljw8nicKsXSFKFRmWLJH0zRwJA5C_F95YeWjjdkrAkH4B1zFqc-ynnR05F3Sh9yZ7HShuxl65qZ_LYtzvNGar1lvDXSpxaW4erQgNS24kDEA94X3xtdfbvpkla6kTEfkeM5Kzw/wOQpSanLmt0mCtt5N7I9aK105mlBMTLQtOfMekWlpl8',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/YWo_giOJvjVY_FeVVTEdeA/qLvR0rgvZ14itmHIoSDZByP8kIGnqolBp3HaStTaSqGn4NMJkfbPlTXy7UjI48RZXjYHSswu8xhYYRSSj20bVA_1qHWFfWrZKDzVBVokicvMwHznCeL1i9RnSHKpq1HjXPgq7X3mtAHsrXjhD36IFQ/sYh4tnR4pBg5rPqy1a0OzqqtsNHaI5ETyrUYlfNIgZw',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/q2sElxQ2FHCAZE8DFTZTPw/GmRNc6PCKhwJvvQBxad7a4nWfxY-UQxfJY6HiGcLWa8grPx1801AEjWlCtZMVs_tjn0yz2geh06SvE1muneAtkWuDavPFkl0AvhmS5PfR3wvJTX9dUctHgG6ixMvPwl1i4T8ZocgAmx75ze7pt_DfMb_xVeX7BgFTZQD_wx3Otc/4oEDpD-gN60pPlEl6iveK33yHWWHTb1YqOQ0UU12daA',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/QP4u3QCONHHakcEsWJTX3A/SUrJf45aNdFCk7oXYql2Gx5BZTUanYBu5nxsgJBSazCAbAQKsCqFBcUWcJf_sYU61qBt3kupgJxV6vCu7N9jH29O4iKsw-j0Bt8i_J9tA5JPz5_TedY-MMS4ThC8LjX_4PT6oPUw5lTZwVPKN1m0BO8vBdriiQ0LtAQLgHy-bXQ/Dx-Pjy4AgREFGfjgFwYcy7fAPWdejKAbZUUnmoswci4',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/0yEx10H1p5xOGVUVzF3-yg/nncSMPYuAjXa656B2SO6zWODmlKG8O-xBsxZgI6sYQu83bBqaoUKm_8osFgfXWz4TqGEOCY71Qgrci-jb7MEyEarRqG-NKBFawaC1tBA-QPfHTGKaLkn2yNklziH3M7bPrboK4hm97r6rFDYkoJStZcMjNkCP1XRydbgS_jGrqc/rMKmau_5ZHGCjQYJ142qxtbLez_j-jz3-634hZ9HdCw',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/4n1oHaEh1BPsN3fLuNyPiQ/qorXjpsYkP45Ym8FrohTaQuLhnJlNvHXGVYRj4BLs6Hx1hbgZtNW6voW49IW0lAPUxcKxguV4a2Qa52Nl_8svAhmbmfkCzLiVz11PRbODkYJs-gcR2rCcprdzgOppowyl7HAM1RhmVdU7naJxtOGLZCP_xummrDDGabwsRPNAQc/bCyTuppAIYLQ0mL_0Cdb1wbAwTDWI-nil60Mgea73c8',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/Wt6mzrRnTGHX-uvGyTMrhg/QMnOY7hHFoHabK2yyIv5ETPni208_jfcy9S2-g7pWDwHb5Zm6cEFZMJbFgaavEp7qtGeDB8ThVFfaygYq2UbV9Sy7Qlpr34HxBR2XhdRumkCHkR_C844QNJReAp9bRChBWVSYz3wCRkK9v3ixBIM0w/3Neuh7C4lRAHnW-9lpHWH-N8TK1kr3qYYb8CYwVpK_E',
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
        url: 'https://v5.airtableusercontent.com/v3/u/30/30/1719705600000/l2WofsvySZEvP_Y0wPhQOA/OSHOy3xRVHSOmGotC-roi40pXcuPgCL2Q3RDmKjLFcD2qwyC4N7BAkntwHBkM86dWmPKs4ROuzPLz2nTVhg78mOLL5dGAzVAnkq42V73gYOmWpli6fTHj_KbLQSYY6cTx52TutpENKdO0b5B1Bhsxw/xWWN1ztCW6qc9OXEhInTXgQWtDH0C3bkt1J0afRpjag',
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
