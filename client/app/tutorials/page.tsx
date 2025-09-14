"use client";

import { motion } from "framer-motion";

export default function Tutorials() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-10 bg-gradient-to-b from-purple-50 to-white">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl font-extrabold mb-6 text-purple-700 text-center"
            >
                🚀 Ainz Bot – Tutorials
            </motion.h1>

            {/* Intro */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg text-gray-700 mb-12 max-w-3xl text-center leading-relaxed"
            >
                Welcome to the{" "}
                <span className="font-semibold">Ainz Bot guide</span>. Here
                you’ll learn the basics of <strong>Trigger</strong>,{" "}
                <strong>User</strong>, <strong>Pets</strong>, and the{" "}
                <strong>Main Flow</strong> for beginners.
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
                {/* Trigger */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition flex flex-col"
                >
                    <h3 className="text-2xl font-semibold mb-4">⚡ Trigger</h3>
                    <p className="text-gray-600 mb-3">
                        All commands in Ainz Bot start with:
                    </p>
                    <code className="block bg-slate-100 px-3 py-2 rounded mb-3 text-sm font-mono">
                        *ainz [action] [target(optional)]
                    </code>
                    <p className="text-gray-600">
                        Example:{" "}
                        <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                            *ainz hug @username
                        </code>{" "}
                        → You hug your friend.
                    </p>
                </motion.div>

                {/* Users */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition flex flex-col"
                >
                    <h3 className="text-2xl font-semibold mb-4">
                        🪪 User Commands
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz init
                            </code>{" "}
                            – Set up your Ainz Bot account.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz info
                            </code>{" "}
                            – View your profile.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz update
                            </code>{" "}
                            – Update your profile details.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz daily
                            </code>{" "}
                            – Collect daily rewards.
                        </li>
                    </ul>
                </motion.div>

                {/* Pets */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition lg:col-span-2"
                >
                    <h3 className="text-2xl font-semibold mb-4">🐾 Pets</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz hunt
                            </code>{" "}
                            – Hunt pets.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz dex
                            </code>{" "}
                            – View system pet information.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz mydex
                            </code>{" "}
                            – View your pets information.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz rename [pet name] {">"} [nick name]
                            </code>{" "}
                            – Give your pet a nickname.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz bag
                            </code>{" "}
                            – Show all pets and the number of pets.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz bag [Common | Uncommon | Rare | Epic |
                                Legendary | Mythic | Limited]
                            </code>{" "}
                            – Show all pets and the number of pets by Rarity.
                        </li>
                    </ul>
                    {/* <p className="mt-4 text-gray-600">
            Pets can be collected, trained, and used in <strong>battles</strong>{" "}
            ⚔️ with your friends.
          </p> */}
                </motion.div>

                {/* Team */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition lg:col-span-2"
                >
                    <h3 className="text-2xl font-semibold mb-4">👥 Teams</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz team info
                            </code>{" "}
                            – Information about pets in your team.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz team create [team name]
                            </code>{" "}
                            – Create your team to battle.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz team update [team name]
                            </code>{" "}
                            – Update your team name.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz team add [position] [pet name]
                            </code>{" "}
                            – Add pet to your team.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz team swap [position 1] [position 2]
                            </code>{" "}
                            – Swap the positions 2 pets in your team.
                        </li>
                    </ul>
                    {/* <p className="mt-4 text-gray-600">
            Pets can be collected, trained, and used in <strong>battles</strong>{" "}
            ⚔️ with your friends.
          </p> */}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition lg:col-span-2"
                >
                    <h3 className="text-2xl font-semibold mb-4">
                        🎲 Miscellaneous
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz help
                            </code>{" "}
                            – Displays the full list of commands supported by
                            the bot.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz meme
                            </code>{" "}
                            – Sends a random meme image.
                        </li>
                        <li>
                            <code className="bg-slate-100 px-2 py-1 rounded font-mono text-sm">
                                *ainz [action] [@user(optional)]
                            </code>{" "}
                            – Shows or performs interactive actions that you can
                            use with other users.
                        </li>
                    </ul>
                </motion.div>
                {/* Main Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="p-8 rounded-2xl border bg-gradient-to-br from-purple-100 to-white shadow-md hover:shadow-lg transition lg:col-span-2 text-center"
                >
                    <h3 className="text-2xl font-semibold mb-8">
                        🌟 Main Flow for New Users
                    </h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-700">
                        {[
                            {
                                icon: "🆕",
                                cmd: "*ainz init",
                                label: "Create account",
                                color: "text-purple-600",
                            },
                            {
                                icon: "💰",
                                cmd: "*ainz daily",
                                label: "Claim rewards",
                                color: "text-yellow-500",
                            },
                            {
                                icon: "🎯",
                                cmd: "*ainz hunt",
                                label: "Catch pets",
                                color: "text-green-500",
                            },
                            {
                                icon: "👥",
                                cmd: "*ainz team",
                                label: "Setup team",
                                color: "text-blue-500",
                            },
                            {
                                icon: "⚔️",
                                cmd: "*ainz battle",
                                label: "Battle with friends",
                                color: "text-red-500",
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center p-4 border rounded-xl bg-white shadow-sm w-40 hover:shadow-md transition"
                            >
                                <span className={`${step.color} text-3xl`}>
                                    {step.icon}
                                </span>
                                <code className="bg-slate-100 px-2 py-1 rounded mt-3 font-mono text-sm">
                                    {step.cmd}
                                </code>
                                <p className="text-sm text-gray-500 mt-2">
                                    {step.label}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-gray-600">
                        👉 Follow this flow to get started quickly and enjoy
                        Ainz Bot to the fullest!
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
