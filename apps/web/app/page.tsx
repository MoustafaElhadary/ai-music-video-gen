/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Meteors } from "@web/components/ui/meteors";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import AskAnything from "./AskAnything";
import { BackgroundBeams } from "@web/components/ui/background-beams";
import { SparklesCore } from "@web/components/ui/sparkles";
import { SVGProps } from "react";
import { VideoRequest } from "@web/components/VideoRequest";
import Image from "next/image";
import React from "react";
import { Noise, WobbleCard } from "@web/components/ui/wobble-card";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@web/components/ui/hero-highlight";

export default function LandingPage() {
  return (
    <ClerkProvider>
      <Header />

      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        With insomnia, nothing&apos;s real. Everything is far away. Everything
        is a{" "}
        <Highlight className="text-black dark:text-white">
          copy, of a copy, of a copy.
        </Highlight>
      </motion.h1>
      <AskAnything />
      <BackgroundBeams />
      <WobbleCardDemo />

      <VideoRequest />
    </ClerkProvider>
  );
}

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-neutral-950 z-100">
      <Link className="flex items-center justify-center" href="#">
        <Logo className="h-16 w-auto" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode={"modal"}>
            <span className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer">
              sign in
            </span>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Gippity AI powers the entire universe
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}

export function MeteorsDemo() {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            Meteors because they&apos;re cool
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            I don&apos;t know what to write so I&apos;ll just paste something
            cool here. One more sentence because lorem ipsum is just
            unacceptable. Won&apos;t ChatGPT the shit out of this.
          </p>

          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
          </button>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}

function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="506"
      zoomAndPan="magnify"
      viewBox="0 0 379.5 119.999999"
      height="160"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <g />
      </defs>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(34.653297, 76.569769)">
          <g>
            <path d="M 50.203125 0 L 34.171875 0 L 15.359375 -21.671875 L 15.359375 0 L 3.71875 0 L 3.71875 -51.078125 L 15.359375 -51.078125 L 15.359375 -30.203125 L 32.875 -51.078125 L 46.984375 -51.078125 L 26.4375 -26.875 Z M 50.203125 0 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(77.542277, 76.569769)">
          <g>
            <path d="M 1.421875 -25.5625 C 1.421875 -32.957031 3.9375 -39.210938 8.96875 -44.328125 C 14.007812 -49.441406 20.078125 -52 27.171875 -52 C 34.316406 -52 40.382812 -49.445312 45.375 -44.34375 C 50.375 -39.25 52.875 -32.988281 52.875 -25.5625 C 52.875 -18.09375 50.414062 -11.8125 45.5 -6.71875 C 40.59375 -1.625 34.484375 0.921875 27.171875 0.921875 C 19.703125 0.921875 13.539062 -1.601562 8.6875 -6.65625 C 3.84375 -11.707031 1.421875 -18.007812 1.421875 -25.5625 Z M 13.984375 -25.5625 C 13.984375 -22.882812 14.394531 -20.441406 15.21875 -18.234375 C 16.050781 -16.023438 17.5 -14.15625 19.5625 -12.625 C 21.625 -11.101562 24.160156 -10.34375 27.171875 -10.34375 C 31.503906 -10.34375 34.773438 -11.828125 36.984375 -14.796875 C 39.191406 -17.765625 40.296875 -21.351562 40.296875 -25.5625 C 40.296875 -29.726562 39.171875 -33.304688 36.921875 -36.296875 C 34.671875 -39.296875 31.421875 -40.796875 27.171875 -40.796875 C 22.960938 -40.796875 19.710938 -39.296875 17.421875 -36.296875 C 15.128906 -33.304688 13.984375 -29.726562 13.984375 -25.5625 Z M 13.984375 -25.5625 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(126.001485, 76.569769)">
          <g>
            <path d="M 3.71875 -51.078125 L 21.984375 -51.078125 C 26.890625 -51.078125 30.890625 -49.765625 33.984375 -47.140625 C 37.078125 -44.515625 38.625 -40.769531 38.625 -35.90625 C 38.625 -32.144531 37.6875 -28.992188 35.8125 -26.453125 C 33.9375 -23.921875 31.390625 -22.140625 28.171875 -21.109375 L 45.75 0 L 30.953125 0 L 15.359375 -20.1875 L 15.359375 0 L 3.71875 0 Z M 15.359375 -28.421875 L 16.71875 -28.421875 C 17.789062 -28.421875 18.695312 -28.4375 19.4375 -28.46875 C 20.175781 -28.507812 21.019531 -28.65625 21.96875 -28.90625 C 22.925781 -29.15625 23.691406 -29.503906 24.265625 -29.953125 C 24.847656 -30.410156 25.34375 -31.070312 25.75 -31.9375 C 26.164062 -32.8125 26.375 -33.863281 26.375 -35.09375 C 26.375 -36.332031 26.164062 -37.382812 25.75 -38.25 C 25.34375 -39.125 24.847656 -39.785156 24.265625 -40.234375 C 23.691406 -40.691406 22.925781 -41.039062 21.96875 -41.28125 C 21.019531 -41.53125 20.175781 -41.675781 19.4375 -41.71875 C 18.695312 -41.757812 17.789062 -41.78125 16.71875 -41.78125 L 15.359375 -41.78125 Z M 15.359375 -28.421875 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(164.496175, 76.569769)">
          <g>
            <path d="M 42.96875 -51.078125 L 42.96875 -18.140625 C 42.96875 -11.867188 41.273438 -7.125 37.890625 -3.90625 C 34.503906 -0.6875 29.550781 0.921875 23.03125 0.921875 C 16.507812 0.921875 11.554688 -0.6875 8.171875 -3.90625 C 4.785156 -7.125 3.09375 -11.867188 3.09375 -18.140625 L 3.09375 -51.078125 L 14.734375 -51.078125 L 14.734375 -21.546875 C 14.734375 -17.421875 15.382812 -14.550781 16.6875 -12.9375 C 17.988281 -11.332031 20.101562 -10.53125 23.03125 -10.53125 C 25.957031 -10.53125 28.070312 -11.332031 29.375 -12.9375 C 30.675781 -14.550781 31.328125 -17.421875 31.328125 -21.546875 L 31.328125 -51.078125 Z M 42.96875 -51.078125 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(204.723835, 76.569769)">
          <g>
            <path d="M 22.53125 -52 C 25.300781 -52 28.003906 -51.597656 30.640625 -50.796875 C 33.285156 -49.992188 35.25 -49.195312 36.53125 -48.40625 L 38.375 -47.171875 L 33.671875 -37.890625 C 33.304688 -38.140625 32.789062 -38.457031 32.125 -38.84375 C 31.46875 -39.238281 30.226562 -39.765625 28.40625 -40.421875 C 26.59375 -41.085938 24.90625 -41.421875 23.34375 -41.421875 C 21.394531 -41.421875 19.894531 -41.003906 18.84375 -40.171875 C 17.789062 -39.347656 17.265625 -38.234375 17.265625 -36.828125 C 17.265625 -36.128906 17.507812 -35.476562 18 -34.875 C 18.5 -34.28125 19.347656 -33.640625 20.546875 -32.953125 C 21.742188 -32.273438 22.796875 -31.726562 23.703125 -31.3125 C 24.617188 -30.90625 26.023438 -30.289062 27.921875 -29.46875 C 31.222656 -28.0625 34.039062 -26.148438 36.375 -23.734375 C 38.707031 -21.328125 39.875 -18.59375 39.875 -15.53125 C 39.875 -12.601562 39.34375 -10.046875 38.28125 -7.859375 C 37.226562 -5.671875 35.785156 -3.957031 33.953125 -2.71875 C 32.117188 -1.476562 30.085938 -0.5625 27.859375 0.03125 C 25.628906 0.625 23.210938 0.921875 20.609375 0.921875 C 18.378906 0.921875 16.191406 0.691406 14.046875 0.234375 C 11.898438 -0.210938 10.101562 -0.773438 8.65625 -1.453125 C 7.21875 -2.128906 5.921875 -2.796875 4.765625 -3.453125 C 3.609375 -4.117188 2.765625 -4.679688 2.234375 -5.140625 L 1.421875 -5.8125 L 7.25 -15.59375 C 7.738281 -15.1875 8.414062 -14.660156 9.28125 -14.015625 C 10.15625 -13.378906 11.691406 -12.523438 13.890625 -11.453125 C 16.097656 -10.378906 18.050781 -9.84375 19.75 -9.84375 C 24.65625 -9.84375 27.109375 -11.515625 27.109375 -14.859375 C 27.109375 -15.554688 26.929688 -16.203125 26.578125 -16.796875 C 26.234375 -17.398438 25.617188 -18 24.734375 -18.59375 C 23.847656 -19.195312 23.0625 -19.671875 22.375 -20.015625 C 21.695312 -20.367188 20.582031 -20.90625 19.03125 -21.625 C 17.488281 -22.351562 16.34375 -22.90625 15.59375 -23.28125 C 12.5 -24.800781 10.101562 -26.707031 8.40625 -29 C 6.71875 -31.289062 5.875 -33.757812 5.875 -36.40625 C 5.875 -40.976562 7.566406 -44.71875 10.953125 -47.625 C 14.335938 -50.539062 18.195312 -52 22.53125 -52 Z M 22.53125 -52 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(240.495317, 76.569769)">
          <g>
            <path d="M 10.765625 -13.25 C 12.753906 -13.25 14.4375 -12.554688 15.8125 -11.171875 C 17.195312 -9.785156 17.890625 -8.101562 17.890625 -6.125 C 17.890625 -4.1875 17.195312 -2.523438 15.8125 -1.140625 C 14.4375 0.234375 12.753906 0.921875 10.765625 0.921875 C 8.828125 0.921875 7.164062 0.234375 5.78125 -1.140625 C 4.40625 -2.523438 3.71875 -4.1875 3.71875 -6.125 C 3.71875 -8.101562 4.40625 -9.785156 5.78125 -11.171875 C 7.164062 -12.554688 8.828125 -13.25 10.765625 -13.25 Z M 10.765625 -13.25 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(261.46597, 40.085799)">
          <g>
            <path d="M 7.15625 -13.28125 C 8.34375 -13.28125 9.359375 -12.984375 10.203125 -12.390625 C 11.046875 -11.796875 11.679688 -10.992188 12.109375 -9.984375 C 12.546875 -8.984375 12.765625 -7.867188 12.765625 -6.640625 C 12.765625 -5.398438 12.546875 -4.273438 12.109375 -3.265625 C 11.679688 -2.265625 11.046875 -1.46875 10.203125 -0.875 C 9.359375 -0.289062 8.34375 0 7.15625 0 L 2.484375 0 C 2.234375 0 2.019531 -0.0859375 1.84375 -0.265625 C 1.664062 -0.441406 1.578125 -0.65625 1.578125 -0.90625 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.234375 -13.28125 2.484375 -13.28125 Z M 6.96875 -1.75 C 8.25 -1.75 9.210938 -2.207031 9.859375 -3.125 C 10.503906 -4.039062 10.828125 -5.210938 10.828125 -6.640625 C 10.828125 -8.054688 10.5 -9.222656 9.84375 -10.140625 C 9.195312 -11.066406 8.238281 -11.53125 6.96875 -11.53125 L 3.453125 -11.53125 L 3.453125 -1.75 Z M 6.96875 -1.75 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(276.206717, 40.085799)">
          <g>
            <path d="M 3.453125 -0.921875 C 3.453125 -0.660156 3.359375 -0.441406 3.171875 -0.265625 C 2.984375 -0.0859375 2.757812 0 2.5 0 C 2.226562 0 2.003906 -0.0859375 1.828125 -0.265625 C 1.660156 -0.441406 1.578125 -0.660156 1.578125 -0.921875 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.242188 -13.28125 2.515625 -13.28125 C 2.773438 -13.28125 2.992188 -13.191406 3.171875 -13.015625 C 3.359375 -12.835938 3.453125 -12.625 3.453125 -12.375 Z M 3.453125 -0.921875 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(282.372511, 40.085799)">
          <g>
            <path d="M 11.328125 -6.984375 C 11.578125 -6.984375 11.785156 -6.894531 11.953125 -6.71875 C 12.128906 -6.539062 12.21875 -6.320312 12.21875 -6.0625 L 12.21875 -1.796875 C 12.21875 -1.460938 12.066406 -1.195312 11.765625 -1 C 11.179688 -0.625 10.539062 -0.332031 9.84375 -0.125 C 9.144531 0.0820312 8.429688 0.1875 7.703125 0.1875 C 6.429688 0.1875 5.269531 -0.113281 4.21875 -0.71875 C 3.164062 -1.320312 2.332031 -2.144531 1.71875 -3.1875 C 1.113281 -4.238281 0.8125 -5.390625 0.8125 -6.640625 C 0.8125 -7.890625 1.113281 -9.035156 1.71875 -10.078125 C 2.332031 -11.117188 3.164062 -11.941406 4.21875 -12.546875 C 5.269531 -13.160156 6.429688 -13.46875 7.703125 -13.46875 C 8.335938 -13.46875 8.945312 -13.394531 9.53125 -13.25 C 10.113281 -13.113281 10.640625 -12.910156 11.109375 -12.640625 C 11.265625 -12.546875 11.378906 -12.4375 11.453125 -12.3125 C 11.535156 -12.1875 11.578125 -12.046875 11.578125 -11.890625 C 11.578125 -11.640625 11.488281 -11.421875 11.3125 -11.234375 C 11.144531 -11.054688 10.941406 -10.96875 10.703125 -10.96875 C 10.503906 -10.96875 10.335938 -11.007812 10.203125 -11.09375 C 9.378906 -11.476562 8.546875 -11.671875 7.703125 -11.671875 C 6.785156 -11.671875 5.953125 -11.445312 5.203125 -11 C 4.453125 -10.5625 3.859375 -9.957031 3.421875 -9.1875 C 2.984375 -8.414062 2.765625 -7.566406 2.765625 -6.640625 C 2.765625 -5.710938 2.984375 -4.863281 3.421875 -4.09375 C 3.859375 -3.332031 4.453125 -2.726562 5.203125 -2.28125 C 5.953125 -1.832031 6.785156 -1.609375 7.703125 -1.609375 C 8.128906 -1.609375 8.578125 -1.660156 9.046875 -1.765625 C 9.523438 -1.867188 9.9375 -2 10.28125 -2.15625 L 10.28125 -5.171875 L 7.984375 -5.171875 C 7.734375 -5.171875 7.519531 -5.253906 7.34375 -5.421875 C 7.164062 -5.597656 7.078125 -5.8125 7.078125 -6.0625 C 7.078125 -6.332031 7.164062 -6.550781 7.34375 -6.71875 C 7.519531 -6.894531 7.734375 -6.984375 7.984375 -6.984375 Z M 11.328125 -6.984375 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(296.695893, 40.085799)">
          <g>
            <path d="M 3.453125 -0.921875 C 3.453125 -0.660156 3.359375 -0.441406 3.171875 -0.265625 C 2.984375 -0.0859375 2.757812 0 2.5 0 C 2.226562 0 2.003906 -0.0859375 1.828125 -0.265625 C 1.660156 -0.441406 1.578125 -0.660156 1.578125 -0.921875 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.242188 -13.28125 2.515625 -13.28125 C 2.773438 -13.28125 2.992188 -13.191406 3.171875 -13.015625 C 3.359375 -12.835938 3.453125 -12.625 3.453125 -12.375 Z M 3.453125 -0.921875 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(302.861688, 40.085799)">
          <g>
            <path d="M 10.1875 -13.28125 C 10.445312 -13.28125 10.660156 -13.195312 10.828125 -13.03125 C 11.003906 -12.875 11.09375 -12.664062 11.09375 -12.40625 C 11.09375 -12.132812 11.003906 -11.921875 10.828125 -11.765625 C 10.660156 -11.617188 10.445312 -11.546875 10.1875 -11.546875 L 6.8125 -11.546875 L 6.8125 -0.90625 C 6.8125 -0.65625 6.71875 -0.441406 6.53125 -0.265625 C 6.351562 -0.0859375 6.125 0 5.84375 0 C 5.5625 0 5.328125 -0.0859375 5.140625 -0.265625 C 4.960938 -0.441406 4.875 -0.65625 4.875 -0.90625 L 4.875 -11.546875 L 1.515625 -11.546875 C 1.253906 -11.546875 1.035156 -11.625 0.859375 -11.78125 C 0.691406 -11.945312 0.609375 -12.160156 0.609375 -12.421875 C 0.609375 -12.671875 0.691406 -12.875 0.859375 -13.03125 C 1.035156 -13.195312 1.253906 -13.28125 1.515625 -13.28125 Z M 10.1875 -13.28125 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(315.705316, 40.085799)">
          <g>
            <path d="M 11.78125 -1.171875 C 11.820312 -1.054688 11.84375 -0.9375 11.84375 -0.8125 C 11.84375 -0.5625 11.753906 -0.351562 11.578125 -0.1875 C 11.410156 -0.0195312 11.210938 0.0625 10.984375 0.0625 C 10.804688 0.0625 10.644531 0.0078125 10.5 -0.09375 C 10.351562 -0.207031 10.234375 -0.359375 10.140625 -0.546875 L 8.96875 -3.34375 L 3.109375 -3.34375 L 1.953125 -0.53125 C 1.890625 -0.34375 1.785156 -0.195312 1.640625 -0.09375 C 1.492188 0.0078125 1.332031 0.0625 1.15625 0.0625 C 0.894531 0.0625 0.691406 -0.00390625 0.546875 -0.140625 C 0.410156 -0.285156 0.34375 -0.476562 0.34375 -0.71875 C 0.34375 -0.769531 0.351562 -0.875 0.375 -1.03125 L 5.21875 -12.75 C 5.300781 -12.945312 5.421875 -13.097656 5.578125 -13.203125 C 5.742188 -13.316406 5.925781 -13.359375 6.125 -13.328125 C 6.3125 -13.328125 6.476562 -13.273438 6.625 -13.171875 C 6.78125 -13.078125 6.894531 -12.9375 6.96875 -12.75 Z M 3.828125 -5.0625 L 8.25 -5.0625 L 6.03125 -10.375 Z M 3.828125 -5.0625 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(329.023225, 40.085799)">
          <g>
            <path d="M 8.890625 -1.765625 C 9.160156 -1.765625 9.378906 -1.679688 9.546875 -1.515625 C 9.722656 -1.347656 9.8125 -1.132812 9.8125 -0.875 C 9.8125 -0.625 9.722656 -0.414062 9.546875 -0.25 C 9.378906 -0.0820312 9.160156 0 8.890625 0 L 2.484375 0 C 2.222656 0 2.003906 -0.0859375 1.828125 -0.265625 C 1.660156 -0.441406 1.578125 -0.65625 1.578125 -0.90625 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.242188 -13.28125 2.515625 -13.28125 C 2.773438 -13.28125 2.992188 -13.191406 3.171875 -13.015625 C 3.359375 -12.835938 3.453125 -12.625 3.453125 -12.375 L 3.453125 -1.765625 Z M 8.890625 -1.765625 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(261.46597, 58.062114)">
          <g>
            <path d="M 6.890625 -13.28125 C 7.554688 -13.28125 8.171875 -13.097656 8.734375 -12.734375 C 9.304688 -12.378906 9.757812 -11.890625 10.09375 -11.265625 C 10.4375 -10.648438 10.609375 -9.96875 10.609375 -9.21875 C 10.609375 -8.46875 10.4375 -7.773438 10.09375 -7.140625 C 9.757812 -6.515625 9.304688 -6.019531 8.734375 -5.65625 C 8.171875 -5.289062 7.554688 -5.109375 6.890625 -5.109375 L 3.3125 -5.109375 L 3.3125 -0.90625 C 3.3125 -0.65625 3.226562 -0.441406 3.0625 -0.265625 C 2.90625 -0.0859375 2.703125 0 2.453125 0 C 2.179688 0 1.96875 -0.0820312 1.8125 -0.25 C 1.65625 -0.425781 1.578125 -0.644531 1.578125 -0.90625 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.234375 -13.28125 2.484375 -13.28125 Z M 6.890625 -6.828125 C 7.222656 -6.828125 7.535156 -6.9375 7.828125 -7.15625 C 8.117188 -7.382812 8.347656 -7.679688 8.515625 -8.046875 C 8.691406 -8.410156 8.78125 -8.800781 8.78125 -9.21875 C 8.78125 -9.863281 8.59375 -10.410156 8.21875 -10.859375 C 7.84375 -11.304688 7.398438 -11.53125 6.890625 -11.53125 L 3.3125 -11.53125 L 3.3125 -6.828125 Z M 6.890625 -6.828125 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(273.987096, 58.062114)">
          <g>
            <path d="M 13.640625 -6.640625 C 13.640625 -5.359375 13.363281 -4.195312 12.8125 -3.15625 C 12.257812 -2.125 11.492188 -1.304688 10.515625 -0.703125 C 9.546875 -0.109375 8.453125 0.1875 7.234375 0.1875 C 6.003906 0.1875 4.898438 -0.109375 3.921875 -0.703125 C 2.953125 -1.304688 2.191406 -2.125 1.640625 -3.15625 C 1.085938 -4.195312 0.8125 -5.359375 0.8125 -6.640625 C 0.8125 -7.921875 1.085938 -9.078125 1.640625 -10.109375 C 2.191406 -11.148438 2.953125 -11.96875 3.921875 -12.5625 C 4.898438 -13.164062 6.003906 -13.46875 7.234375 -13.46875 C 8.453125 -13.46875 9.546875 -13.164062 10.515625 -12.5625 C 11.492188 -11.96875 12.257812 -11.148438 12.8125 -10.109375 C 13.363281 -9.078125 13.640625 -7.921875 13.640625 -6.640625 Z M 11.6875 -6.640625 C 11.6875 -7.585938 11.492188 -8.441406 11.109375 -9.203125 C 10.734375 -9.972656 10.207031 -10.578125 9.53125 -11.015625 C 8.851562 -11.453125 8.085938 -11.671875 7.234375 -11.671875 C 6.367188 -11.671875 5.597656 -11.453125 4.921875 -11.015625 C 4.242188 -10.585938 3.710938 -9.988281 3.328125 -9.21875 C 2.953125 -8.457031 2.765625 -7.597656 2.765625 -6.640625 C 2.765625 -5.691406 2.953125 -4.832031 3.328125 -4.0625 C 3.710938 -3.300781 4.242188 -2.703125 4.921875 -2.265625 C 5.597656 -1.828125 6.367188 -1.609375 7.234375 -1.609375 C 8.085938 -1.609375 8.851562 -1.828125 9.53125 -2.265625 C 10.207031 -2.703125 10.734375 -3.300781 11.109375 -4.0625 C 11.492188 -4.832031 11.6875 -5.691406 11.6875 -6.640625 Z M 11.6875 -6.640625 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(289.581546, 58.062114)">
          <g>
            <path d="M 5.59375 0.1875 C 4.675781 0.1875 3.863281 0.0546875 3.15625 -0.203125 C 2.445312 -0.460938 1.769531 -0.878906 1.125 -1.453125 C 0.851562 -1.679688 0.71875 -1.941406 0.71875 -2.234375 C 0.71875 -2.460938 0.804688 -2.664062 0.984375 -2.84375 C 1.160156 -3.03125 1.367188 -3.125 1.609375 -3.125 C 1.828125 -3.125 2.007812 -3.054688 2.15625 -2.921875 C 2.664062 -2.453125 3.1875 -2.109375 3.71875 -1.890625 C 4.257812 -1.671875 4.875 -1.5625 5.5625 -1.5625 C 6.351562 -1.5625 7.023438 -1.742188 7.578125 -2.109375 C 8.128906 -2.472656 8.40625 -2.929688 8.40625 -3.484375 C 8.394531 -4.148438 8.117188 -4.660156 7.578125 -5.015625 C 7.035156 -5.378906 6.21875 -5.679688 5.125 -5.921875 C 3.820312 -6.179688 2.816406 -6.613281 2.109375 -7.21875 C 1.410156 -7.832031 1.0625 -8.675781 1.0625 -9.75 C 1.0625 -10.5 1.253906 -11.15625 1.640625 -11.71875 C 2.035156 -12.28125 2.582031 -12.710938 3.28125 -13.015625 C 3.976562 -13.316406 4.765625 -13.46875 5.640625 -13.46875 C 6.421875 -13.46875 7.15625 -13.335938 7.84375 -13.078125 C 8.539062 -12.828125 9.109375 -12.492188 9.546875 -12.078125 C 9.835938 -11.828125 9.984375 -11.554688 9.984375 -11.265625 C 9.984375 -11.035156 9.894531 -10.832031 9.71875 -10.65625 C 9.550781 -10.476562 9.347656 -10.390625 9.109375 -10.390625 C 8.929688 -10.390625 8.785156 -10.441406 8.671875 -10.546875 C 8.335938 -10.878906 7.878906 -11.15625 7.296875 -11.375 C 6.722656 -11.601562 6.171875 -11.71875 5.640625 -11.71875 C 4.785156 -11.71875 4.109375 -11.539062 3.609375 -11.1875 C 3.109375 -10.84375 2.859375 -10.390625 2.859375 -9.828125 C 2.859375 -9.203125 3.109375 -8.722656 3.609375 -8.390625 C 4.109375 -8.066406 4.851562 -7.789062 5.84375 -7.5625 C 6.832031 -7.351562 7.640625 -7.101562 8.265625 -6.8125 C 8.890625 -6.519531 9.367188 -6.113281 9.703125 -5.59375 C 10.046875 -5.070312 10.21875 -4.394531 10.21875 -3.5625 C 10.21875 -2.832031 10.007812 -2.179688 9.59375 -1.609375 C 9.1875 -1.046875 8.628906 -0.601562 7.921875 -0.28125 C 7.210938 0.03125 6.4375 0.1875 5.59375 0.1875 Z M 5.59375 0.1875 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(301.761184, 58.062114)">
          <g>
            <path d="M 10.1875 -13.28125 C 10.445312 -13.28125 10.660156 -13.195312 10.828125 -13.03125 C 11.003906 -12.875 11.09375 -12.664062 11.09375 -12.40625 C 11.09375 -12.132812 11.003906 -11.921875 10.828125 -11.765625 C 10.660156 -11.617188 10.445312 -11.546875 10.1875 -11.546875 L 6.8125 -11.546875 L 6.8125 -0.90625 C 6.8125 -0.65625 6.71875 -0.441406 6.53125 -0.265625 C 6.351562 -0.0859375 6.125 0 5.84375 0 C 5.5625 0 5.328125 -0.0859375 5.140625 -0.265625 C 4.960938 -0.441406 4.875 -0.65625 4.875 -0.90625 L 4.875 -11.546875 L 1.515625 -11.546875 C 1.253906 -11.546875 1.035156 -11.625 0.859375 -11.78125 C 0.691406 -11.945312 0.609375 -12.160156 0.609375 -12.421875 C 0.609375 -12.671875 0.691406 -12.875 0.859375 -13.03125 C 1.035156 -13.195312 1.253906 -13.28125 1.515625 -13.28125 Z M 10.1875 -13.28125 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(261.46597, 76.038429)">
          <g>
            <path d="M 11.046875 -12.5 C 11.347656 -12.332031 11.5 -12.078125 11.5 -11.734375 C 11.5 -11.515625 11.421875 -11.304688 11.265625 -11.109375 C 11.117188 -10.910156 10.910156 -10.8125 10.640625 -10.8125 C 10.460938 -10.8125 10.289062 -10.851562 10.125 -10.9375 C 9.34375 -11.382812 8.5 -11.609375 7.59375 -11.609375 C 6.644531 -11.609375 5.804688 -11.398438 5.078125 -10.984375 C 4.347656 -10.566406 3.78125 -9.976562 3.375 -9.21875 C 2.96875 -8.46875 2.765625 -7.609375 2.765625 -6.640625 C 2.765625 -5.585938 2.972656 -4.679688 3.390625 -3.921875 C 3.804688 -3.160156 4.378906 -2.582031 5.109375 -2.1875 C 5.847656 -1.789062 6.675781 -1.59375 7.59375 -1.59375 C 8.519531 -1.59375 9.363281 -1.820312 10.125 -2.28125 C 10.28125 -2.351562 10.445312 -2.390625 10.625 -2.390625 C 10.90625 -2.390625 11.125 -2.28125 11.28125 -2.0625 C 11.4375 -1.875 11.515625 -1.671875 11.515625 -1.453125 C 11.515625 -1.304688 11.472656 -1.164062 11.390625 -1.03125 C 11.304688 -0.894531 11.195312 -0.789062 11.0625 -0.71875 C 10.5625 -0.4375 10.003906 -0.210938 9.390625 -0.046875 C 8.785156 0.109375 8.1875 0.1875 7.59375 0.1875 C 6.363281 0.1875 5.234375 -0.0820312 4.203125 -0.625 C 3.171875 -1.164062 2.347656 -1.953125 1.734375 -2.984375 C 1.117188 -4.023438 0.8125 -5.242188 0.8125 -6.640625 C 0.8125 -7.921875 1.101562 -9.070312 1.6875 -10.09375 C 2.28125 -11.125 3.09375 -11.929688 4.125 -12.515625 C 5.15625 -13.109375 6.3125 -13.40625 7.59375 -13.40625 C 8.8125 -13.40625 9.960938 -13.101562 11.046875 -12.5 Z M 11.046875 -12.5 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(274.707994, 76.038429)">
          <g>
            <path d="M 11.78125 -1.171875 C 11.820312 -1.054688 11.84375 -0.9375 11.84375 -0.8125 C 11.84375 -0.5625 11.753906 -0.351562 11.578125 -0.1875 C 11.410156 -0.0195312 11.210938 0.0625 10.984375 0.0625 C 10.804688 0.0625 10.644531 0.0078125 10.5 -0.09375 C 10.351562 -0.207031 10.234375 -0.359375 10.140625 -0.546875 L 8.96875 -3.34375 L 3.109375 -3.34375 L 1.953125 -0.53125 C 1.890625 -0.34375 1.785156 -0.195312 1.640625 -0.09375 C 1.492188 0.0078125 1.332031 0.0625 1.15625 0.0625 C 0.894531 0.0625 0.691406 -0.00390625 0.546875 -0.140625 C 0.410156 -0.285156 0.34375 -0.476562 0.34375 -0.71875 C 0.34375 -0.769531 0.351562 -0.875 0.375 -1.03125 L 5.21875 -12.75 C 5.300781 -12.945312 5.421875 -13.097656 5.578125 -13.203125 C 5.742188 -13.316406 5.925781 -13.359375 6.125 -13.328125 C 6.3125 -13.328125 6.476562 -13.273438 6.625 -13.171875 C 6.78125 -13.078125 6.894531 -12.9375 6.96875 -12.75 Z M 3.828125 -5.0625 L 8.25 -5.0625 L 6.03125 -10.375 Z M 3.828125 -5.0625 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(288.025906, 76.038429)">
          <g>
            <path d="M 11.6875 -1.515625 C 11.8125 -1.429688 11.910156 -1.320312 11.984375 -1.1875 C 12.066406 -1.050781 12.109375 -0.914062 12.109375 -0.78125 C 12.109375 -0.507812 12.019531 -0.3125 11.84375 -0.1875 C 11.675781 -0.0625 11.472656 0 11.234375 0 C 10.992188 0 10.789062 -0.0507812 10.625 -0.15625 C 10.238281 -0.363281 9.925781 -0.707031 9.6875 -1.1875 C 9.445312 -1.675781 9.328125 -2.382812 9.328125 -3.3125 C 9.328125 -3.945312 9.132812 -4.414062 8.75 -4.71875 C 8.375 -5.019531 7.882812 -5.171875 7.28125 -5.171875 L 3.453125 -5.171875 L 3.453125 -0.90625 C 3.453125 -0.644531 3.375 -0.425781 3.21875 -0.25 C 3.070312 -0.0820312 2.878906 0 2.640625 0 C 2.347656 0 2.097656 -0.0859375 1.890625 -0.265625 C 1.679688 -0.441406 1.578125 -0.65625 1.578125 -0.90625 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.234375 -13.28125 2.484375 -13.28125 L 7.8125 -13.28125 C 8.5 -13.28125 9.125 -13.109375 9.6875 -12.765625 C 10.257812 -12.429688 10.71875 -11.972656 11.0625 -11.390625 C 11.40625 -10.804688 11.578125 -10.144531 11.578125 -9.40625 C 11.578125 -8.695312 11.382812 -8.035156 11 -7.421875 C 10.625 -6.804688 10.140625 -6.347656 9.546875 -6.046875 C 10.015625 -5.804688 10.382812 -5.472656 10.65625 -5.046875 C 10.925781 -4.617188 11.070312 -4.117188 11.09375 -3.546875 C 11.144531 -2.828125 11.203125 -2.335938 11.265625 -2.078125 C 11.328125 -1.816406 11.46875 -1.628906 11.6875 -1.515625 Z M 7.78125 -6.75 C 8.09375 -6.78125 8.390625 -6.90625 8.671875 -7.125 C 8.960938 -7.351562 9.195312 -7.660156 9.375 -8.046875 C 9.550781 -8.429688 9.640625 -8.867188 9.640625 -9.359375 C 9.640625 -9.960938 9.453125 -10.472656 9.078125 -10.890625 C 8.703125 -11.316406 8.25 -11.53125 7.71875 -11.53125 L 3.453125 -11.53125 L 3.453125 -6.75 Z M 7.78125 -6.75 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(302.064716, 76.038429)">
          <g>
            <path d="M 7.15625 -13.28125 C 8.34375 -13.28125 9.359375 -12.984375 10.203125 -12.390625 C 11.046875 -11.796875 11.679688 -10.992188 12.109375 -9.984375 C 12.546875 -8.984375 12.765625 -7.867188 12.765625 -6.640625 C 12.765625 -5.398438 12.546875 -4.273438 12.109375 -3.265625 C 11.679688 -2.265625 11.046875 -1.46875 10.203125 -0.875 C 9.359375 -0.289062 8.34375 0 7.15625 0 L 2.484375 0 C 2.234375 0 2.019531 -0.0859375 1.84375 -0.265625 C 1.664062 -0.441406 1.578125 -0.65625 1.578125 -0.90625 L 1.578125 -12.375 C 1.578125 -12.625 1.664062 -12.835938 1.84375 -13.015625 C 2.019531 -13.191406 2.234375 -13.28125 2.484375 -13.28125 Z M 6.96875 -1.75 C 8.25 -1.75 9.210938 -2.207031 9.859375 -3.125 C 10.503906 -4.039062 10.828125 -5.210938 10.828125 -6.640625 C 10.828125 -8.054688 10.5 -9.222656 9.84375 -10.140625 C 9.195312 -11.066406 8.238281 -11.53125 6.96875 -11.53125 L 3.453125 -11.53125 L 3.453125 -1.75 Z M 6.96875 -1.75 " />
          </g>
        </g>
      </g>
      <g fill="#ffffff" fillOpacity="1">
        <g transform="translate(316.805463, 76.038429)">
          <g>
            <path d="M 5.59375 0.1875 C 4.675781 0.1875 3.863281 0.0546875 3.15625 -0.203125 C 2.445312 -0.460938 1.769531 -0.878906 1.125 -1.453125 C 0.851562 -1.679688 0.71875 -1.941406 0.71875 -2.234375 C 0.71875 -2.460938 0.804688 -2.664062 0.984375 -2.84375 C 1.160156 -3.03125 1.367188 -3.125 1.609375 -3.125 C 1.828125 -3.125 2.007812 -3.054688 2.15625 -2.921875 C 2.664062 -2.453125 3.1875 -2.109375 3.71875 -1.890625 C 4.257812 -1.671875 4.875 -1.5625 5.5625 -1.5625 C 6.351562 -1.5625 7.023438 -1.742188 7.578125 -2.109375 C 8.128906 -2.472656 8.40625 -2.929688 8.40625 -3.484375 C 8.394531 -4.148438 8.117188 -4.660156 7.578125 -5.015625 C 7.035156 -5.378906 6.21875 -5.679688 5.125 -5.921875 C 3.820312 -6.179688 2.816406 -6.613281 2.109375 -7.21875 C 1.410156 -7.832031 1.0625 -8.675781 1.0625 -9.75 C 1.0625 -10.5 1.253906 -11.15625 1.640625 -11.71875 C 2.035156 -12.28125 2.582031 -12.710938 3.28125 -13.015625 C 3.976562 -13.316406 4.765625 -13.46875 5.640625 -13.46875 C 6.421875 -13.46875 7.15625 -13.335938 7.84375 -13.078125 C 8.539062 -12.828125 9.109375 -12.492188 9.546875 -12.078125 C 9.835938 -11.828125 9.984375 -11.554688 9.984375 -11.265625 C 9.984375 -11.035156 9.894531 -10.832031 9.71875 -10.65625 C 9.550781 -10.476562 9.347656 -10.390625 9.109375 -10.390625 C 8.929688 -10.390625 8.785156 -10.441406 8.671875 -10.546875 C 8.335938 -10.878906 7.878906 -11.15625 7.296875 -11.375 C 6.722656 -11.601562 6.171875 -11.71875 5.640625 -11.71875 C 4.785156 -11.71875 4.109375 -11.539062 3.609375 -11.1875 C 3.109375 -10.84375 2.859375 -10.390625 2.859375 -9.828125 C 2.859375 -9.203125 3.109375 -8.722656 3.609375 -8.390625 C 4.109375 -8.066406 4.851562 -7.789062 5.84375 -7.5625 C 6.832031 -7.351562 7.640625 -7.101562 8.265625 -6.8125 C 8.890625 -6.519531 9.367188 -6.113281 9.703125 -5.59375 C 10.046875 -5.070312 10.21875 -4.394531 10.21875 -3.5625 C 10.21875 -2.832031 10.007812 -2.179688 9.59375 -1.609375 C 9.1875 -1.046875 8.628906 -0.601562 7.921875 -0.28125 C 7.210938 0.03125 6.4375 0.1875 5.59375 0.1875 Z M 5.59375 0.1875 " />
          </g>
        </g>
      </g>
    </svg>
  );
}
