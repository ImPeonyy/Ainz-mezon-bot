"use client";

import { motion } from "framer-motion";

export default function Documents() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 bg-gradient-to-b from-indigo-50 to-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold mb-6 text-purple-700 text-center"
      >
        📖 AINZ Bot – Documentation
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg text-gray-700 mb-12 max-w-2xl text-center leading-relaxed"
      >
        Welcome to the official documentation of{" "}
        <span className="font-semibold">AINZ Bot</span>.  
        This guide covers features, environment setup, and how to run the project.
      </motion.p>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-4">🚀 Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✨ Daily rewards system</li>
            <li>🐾 Pet hunting and collecting</li>
            <li>⚔️ Battle with friends</li>
            <li>😂 Funny memes & entertainment</li>
          </ul>
        </motion.div>

        {/* Environment */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-4">🛠 Environment</h3>
          <ul className="space-y-2 text-gray-600">
            <li>🌐 Frontend: Next.js</li>
            <li>⚙️ Backend: Express.js</li>
            <li>🗄 Database: PostgreSQL (via Neon)</li>
            <li>☁️ Cloud Storage: Cloudinary</li>
          </ul>
        </motion.div>

        {/* Setup Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition md:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">⚙️ Setup Guide</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              Clone the repository:
              <code className="block bg-slate-100 px-3 py-2 rounded mt-1">
                git clone https://github.com/ImPeonyy/Ainz-mezon-bot.git
              </code>
            </li>
            <li>
              Move into the{" "}
              <code className="bg-slate-100 px-1 rounded">server</code> folder:
              <code className="block bg-slate-100 px-3 py-2 rounded mt-1">
                cd server
              </code>
            </li>
            <li>
              Install dependencies:
              <code className="block bg-slate-100 px-3 py-2 rounded mt-1">
                npm install <br /> or <br /> yarn
              </code>
            </li>
            <li>
              Copy example env file:
              <code className="block bg-slate-100 px-3 py-2 rounded mt-1">
                cp .env.example .env
              </code>
            </li>
          </ol>
        </motion.div>

        {/* Environment Variables */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition md:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">🔑 Environment Variables</h3>
          <p className="text-gray-600 mb-3">
            Create a <code>.env</code> file in the root folder and add the following:  
            (Replace with your own credentials)
          </p>
          <code className="block bg-slate-100 px-4 py-3 rounded whitespace-pre-wrap text-sm">
{`BOT_ID=your_bot_id_here
BOT_TOKEN=your_bot_token_here
DATABASE_URL=postgresql://username:password@host/dbname?sslmode=require
BLOB_READ_WRITE_TOKEN=your_blob_rw_token_here
CHANNEL_ID=your_channel_id_here

CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLOUDINARY_ROOT_FOLDER='your_root_folder_here'`}
          </code>
        </motion.div>

        {/* Run Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="p-6 rounded-2xl border bg-white shadow-md hover:shadow-lg transition md:col-span-2"
        >
          <h3 className="text-xl font-semibold mb-4">▶️ Run the Project</h3>
          <p className="text-gray-600 mb-2">
            After setup, run the project with:
          </p>
          <code className="block bg-slate-100 px-3 py-2 rounded">
            yarn dev <br /> or <br /> npm run dev
          </code>
        </motion.div>
      </div>
    </main>
  );
}
