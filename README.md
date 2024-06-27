TODO:

## Prisma

1. add prisma to backend [done]
2. remove prisma from frontend [done]

## Auth

1. add clerk auth to backend [done]
2. make trpc calls protected [done]

# Knip

1. add knip to backend
2. add knip to frontend

## BullMQ

1. add bullmq w/ redis to backend [done]
2. create video processing job
3. add scraping job to backend
4. add email sending job to backend (implement sendGrid and resend)
5. add text message sending job to backend (implement twilio and resend)

## Stripe

1. add stripe to backend
2. add stripe to frontend (generate checkout session)

## video

1. get song from sono
2. get subtitles for video
3. stitch them together

## video flow:

1. Typewriter template saying
   "Hey XXX, here's a video from YYY and ZZZ, Happy Birthday" (and show confetti)
2. Start playing the song in the background
3. create AI images for a combination of every verse or find funny gif, the image could be of the user, or a witty prompt that the AI comes up with ( might end up being 10 or so calls i think)
4.
