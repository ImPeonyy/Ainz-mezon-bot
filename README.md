# Ainz Mezon Bot

Welcome to the official documentation of **Ainz Bot**.  
This guide covers features, environment setup, and how to run the project.

---

## 🚀 Features

- ✨ Daily rewards system
- 🐾 Pet hunting and collecting
- ⚔️ Battle with friends
- 😂 Funny memes & entertainment

---

## 🛠 Tech Stack

- 🌐 Frontend: Next.js
- ⚙️ Backend: Express.js + Prisma ORM
- 🗄 Database: PostgreSQL (via Neon)
- ☁️ Cloud Storage: Cloudinary

---

## 📌 Usage

You can invite **Ainz Bot** into your clan using this link:

```
👉 https://mezon.ai/invite/YOUR_BOT_ID
```

## 🔑 Environment Variables

```
Create a .env file in the root folder and add the following (replace with your own credentials):

#MEZON BOT
BOT_ID=your_bot_id_here
BOT_TOKEN=your_bot_token
DATABASE_URL=your_database_url

#CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLOUDINARY_ROOT_FOLDER='your_root_folder_here'

#REDDIT
REDDIT_CLIENT_ID=your_reddit_app_id
REDDIT_CLIENT_SECRET=your_reddit_app_secret
```

## ⚙️ Setup Guide

1. Clone the repository:

    ```
    git clone https://github.com/ImPeonyy/Ainz-mezon-bot.git
    ```

2. Move into the server folder:

    ```
    cd server
    ```

3. Install dependencies:

    ```
    npm install
    or
    yarn
    ```

4. Run the Project
   After setup, run the project with:
   `     yarn dev
 or
 npm run dev
 `

## 🚀 Deployment on Railway

You can easily deploy **Ainz Bot** on [Railway](https://railway.app/).

### Steps

1. **Fork or clone the repository**
    ```bash
    git clone https://github.com/ImPeonyy/Ainz-mezon-bot.git
    cd Ainz-mezon-bot/server
    ```
2. **Login to Railway**

Go to [Railway](https://railway.app/) Dashboard and sign in with GitHub.

3. **Create a new project**

- Click **New Project** → Deploy from GitHub Repo
- Select your forked repository

4. **Create a PostgreSQL Database**

- In your Railway project, click **+ New → Database → PostgreSQL**
- Railway will provision a new PostgreSQL instance
- After creation, click the database and copy the `DATABASE_URL` connection string
- Use this URL in your environment variables

5. **Configure Environment Variables**

In Railway dashboard, go to your project → **Variables** and add all keys from your local `.env` file.  
(Refer to the `.env.example` file for required variables.)

6. **Deploy**

Railway will automatically detect Node.js and install dependencies.
In project Settings → Deploy configure:

- **Root Directory:**
    ```
    server
    ```
- **Build Command:**

    ```
    npm run build && npx prisma generate

    ```

- **Start Command**
    ```
    npm run start
    # or
    yarn start
    ```

7. **Done**

Your bot backend is now live on Railway. Copy the generated domain/endpoint and update it in your bot configuration if needed.
