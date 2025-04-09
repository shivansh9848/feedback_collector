# Feedback Collector

This repository contains a feedback form application built using **Next.js 13**, **React**, **TypeScript**, and **Tailwind CSS**. The backend logic is powered by **Netlify Serverless Functions**, providing basic operations such as submitting, reading feedback entries and also has Dark Mode.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Deployment](#deployment)
7. [License](#license)

---

## Project Overview

The application consists of a **front-end** where users can:
- Submit feedback through a form.
- View feedback entries in a feedback list.

On the **back-end**, Netlify functions handle:
- Saving feedback data to an ephemeral JSON file.
- Retrieving existing feedback for display.
- Clearing all feedback (optional).

Since Netlify functions store data in the `/tmp` directory, the stored feedback is **not persistent** across redeployments or function cold starts. For a production-ready environment, consider an external database.

---

## Project Structure

```
.
├── public/
│   └── (Static assets, images, favicon, etc.)
├── src/
│   ├── app/
│   │   ├── feedback/
│   │   │   └── page.tsx       (Feedback page entry point)
│   │   └── ...                (Other app routes/pages)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── FeedbackForm.tsx  (Form component for user submissions)
│   │   │   ├── FeedbackList.tsx  (List component to display feedback)
│   │   │   ├── Footer.tsx        (Footer layout)
│   │   │   ├── Navbar.tsx        (Navigation bar)
│   │   │   └── ...
│   │   └── DarkModeContext.tsx   (Context to manage dark/light modes)
│   ├── lib/
│   │   └── utils.ts              (Utility functions)
│   ├── types/
│   │   └── feedback.ts           (Type definitions for feedback data)
│   └── ...
├── netlify.toml                  (Netlify configuration)
├── .gitignore
├── next.config.js                (Next.js configuration)
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── README.md                     (You are here)
```

### Key Folders

- **`public/`**  
  Stores static assets (images, favicons, etc.) that can be served directly.

- **`src/app/`**  
  Houses Next.js routes (e.g., `feedback/page.tsx`) following Next.js 13’s App Router architecture. This includes the main page or sub-pages relevant to feedback.

- **`src/components/`**  
  Contains reusable UI components (e.g., `FeedbackForm`, `FeedbackList`, `Footer`, `Navbar`).  
  - `DarkModeContext` manages theme-related states (light/dark mode).

- **`src/lib/`**  
  General-purpose utilities and helper functions that can be reused across components.

- **`src/types/`**  
  Central place for **TypeScript** type definitions, such as the `feedback.ts` interface.

- **Netlify Functions**  
  Typically located in `netlify/functions/` or within the `functions` folder if configured. These handle serverless actions (e.g., `submit-feedback`, `get-feedback`, `clear-feedback`).

---

## Tech Stack

| Technology        | Description                                    |
|-------------------|------------------------------------------------|
| **Next.js 13**    | React framework with an App Router.            |
| **React**         | UI library for building interactive interfaces.|
| **TypeScript**    | Superset of JavaScript for static typing.      |
| **Tailwind CSS**  | Utility-first CSS framework for styling.       |
| **Netlify**       | Platform for hosting & serverless functions.   |

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd <your-repo>
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. **Open your browser at:**  
   `http://localhost:3000`

---

## Available Scripts

In the project directory, you can run:

- **`npm run dev`** or **`yarn dev`**  
  Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

- **`npm run build`** or **`yarn build`**  
  Builds the production-ready app in the `.next` folder.

- **`npm run start`** or **`yarn start`**  
  Serves the production build locally.

- **`netlify dev`**  
  (Optional) If the Netlify CLI is installed, you can run the project locally with Netlify’s serverless functions.

---

## Deployment

### Deploying to Netlify

1. **Create a Netlify Account**  
   Go to [netlify.com](https://www.netlify.com/) and sign up (free plan available).

2. **Connect Your Git Repository**  
   From your Netlify dashboard, create a new site by linking your GitHub/GitLab/Bitbucket repository.

3. **Configure Build Settings**  
   - **Build Command:** `npm run build` (or `yarn build`)
   - **Publish Directory:** `.next`
   - **Functions Directory (optional):** `netlify/functions`  
     (Ensure this aligns with your Netlify configuration in `netlify.toml`.)

4. **Deploy**  
   Netlify will automatically build and deploy your project on every commit to the configured branch (usually `main` or `master`).

5. **Environment Variables**  
   If you need any environment variables, set them up in your Netlify dashboard under **Site Settings** → **Build & Deploy** → **Environment**.

6. **Check the Live Site**  
   Once the build is complete, Netlify provides a public URL (`https://<your-site>.netlify.app`). Go there to see your deployed app.

**Important**: The data stored by Netlify Functions in `/tmp/` is **ephemeral**. For production-grade apps needing permanent data storage, integrate a database service (e.g., Firebase, Supabase, MongoDB, PostgreSQL).

---

**Happy Coding!** If you have any questions or suggestions, feel free to open an issue or reach out.