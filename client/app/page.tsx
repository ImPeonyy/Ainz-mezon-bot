"use client";

import React from "react";

// === Icons ===
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16 3v4M8 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" {...props}>
      <path
        d="M5 15c0-2.5 3-6 7-6s7 3.5 7 6v2H5v-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8c0-1.7 1.3-3 3-3s3 1.3 3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="14" r="0.6" fill="currentColor" />
      <circle cx="14.5" cy="14" r="0.6" fill="currentColor" />
    </svg>
  );
}

// === Card component Daily & Pet Hunt ===
function DailyPetCards() {
  return (
    <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Daily Card */}
      <a
        href="/daily"
        className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl 
                   bg-gradient-to-b from-pink-50 via-pink-100 to-white 
                   shadow border border-pink-200/60 
                   transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <div className="rounded-full p-3 bg-white/70 border animate-bounce">
          <CalendarIcon className="text-pink-600" />
        </div>
        <h3 className="text-lg font-semibold text-pink-700">Daily</h3>
        <p className="text-sm text-slate-500">
          Complete daily quests to earn cute rewards.
        </p>
        <div className="absolute -top-3 -right-3 text-pink-300 text-2xl animate-pulse">
          ✨
        </div>
      </a>

      {/* Pet Hunt Card */}
      <a
        href="/pet-hunt"
        className="group relative flex flex-col items-center gap-4 p-6 rounded-2xl 
                   bg-gradient-to-b from-emerald-50 via-emerald-100 to-white 
                   shadow border border-emerald-200/60 
                   transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <div className="rounded-full p-3 bg-white/70 border animate-pulse">
          <PetIcon className="text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-700">Pet Hunt</h3>
        <p className="text-sm text-slate-500">
          Catch, collect, and nurture your pets.
        </p>
        <div className="absolute -bottom-3 -left-3 text-emerald-300 text-2xl animate-bounce">
          🐾
        </div>
      </a>
    </div>
  );
}

// === Landing Page ===
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-extrabold mb-6 text-purple-700 text-center">
          🚀 Welcome to Ainz Bot
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          A fun playground: do your dailies, hunt pets, battle, actions, and
          laugh with memes.
        </p>
        <a
          href="#daily"
          className="rounded-xl bg-blue-600 px-6 py-3 text-white 
                     hover:bg-blue-700 hover:scale-105 
                     transition-transform duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Daily & Pet Hunt */}
      <section id="daily" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">🔥 Daily & Pet Hunt</h2>
        <DailyPetCards />
      </section>

      {/* Battle Showcase */}
      <section id="battle" className="py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold mb-6">⚔️ Battle</h2>
        <p className="text-gray-600 mb-10">
          Join intense battles and test your skills with friends.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/images/meme2.gif"
              alt="Battle"
              className="rounded-xl shadow-md object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center text-left p-6">
            <h3 className="text-2xl font-semibold mb-4">
              Dynamic Battleground
            </h3>
            <p className="text-gray-600 mb-6">
              From 1v1 duels to massive arenas — prove your strategy and
              strength.
            </p>
            <a
              href="/battle"
              className="inline-block px-5 py-3 bg-red-600 text-white rounded-md 
                         hover:bg-red-700 hover:scale-105 
                         transition-transform duration-300"
            >
              Join Battle
            </a>
          </div>
        </div>
      </section>

      {/* Action Showcase */}
      <section id="action" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">⚡ Actions</h2>
        <p className="text-gray-600 mb-10">
          Interact with friends using fun actions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="flex flex-col justify-center text-left p-6 order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">Express Yourself</h3>
            <p className="text-gray-600 mb-6">
              hug 🤗, blush 🫶, slap 👋, or sleep 😴... — have fun with endless
              reactions.
            </p>
            <a
              href="/actions"
              className="inline-block px-5 py-3 bg-green-600 text-white rounded-md 
                         hover:bg-green-700 hover:scale-105 
                         transition-transform duration-300"
            >
              Explore Actions
            </a>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <img
              src="/images/meme2.gif"
              alt="Action"
              className="rounded-xl shadow-md object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Meme Section */}
      <section id="meme" className="py-20 bg-slate-50 text-center">
        <h2 className="text-3xl font-bold mb-6">😂 Memes & Fun</h2>
        <p className="text-gray-600 mb-10">Relax and laugh with community.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="flex justify-center">
            <img
              src="/images/meme2.gif"
              alt="Funny Meme"
              className="rounded-xl shadow-md max-w-full h-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center text-left p-6">
            <h3 className="text-2xl font-semibold mb-4">Share the Fun</h3>
            <p className="text-gray-600 mb-6">
              Take your memes and laugh with your friends!
            </p>
            <button
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl 
                         hover:bg-purple-700 hover:scale-105 
                         transition-transform duration-300"
            >
              Let try it!
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
