# 🩺 Aarogya Saarthi

**Your AI-powered companion for health, right in your browser.**

Aarogya Saarthi (आरोग्य साथी — "Health Companion") is a Progressive Web App that brings AI-driven health assistance directly to the client. Powered by on-device machine learning, voice interaction, and offline-first architecture, it works reliably even in low-connectivity environments — no server-side AI calls required for core inference.

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge">
  <img alt="TensorFlow.js" src="https://img.shields.io/badge/TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white&style=for-the-badge">
  <img alt="ONNX Runtime" src="https://img.shields.io/badge/ONNX%20Runtime-Web-005CED?style=for-the-badge">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge">
  <img alt="PWA" src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white&style=for-the-badge">
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge">
</p>

---

## ✨ Features

- 🧠 **On-device AI inference** — Runs machine learning models directly in the browser using **TensorFlow.js** and **ONNX Runtime Web**, so predictions happen without round-tripping to a server.
- 🤗 **Transformer-powered NLP** — Uses **@xenova/transformers** and **Hugging Face Inference** for natural language understanding and health-related Q&A.
- 🎙️ **Voice interaction** — Built-in speech recognition lets users talk to the app naturally, powered by the Web Speech API.
- 📴 **Offline-first PWA** — Service workers via **Workbox** cache assets and data so the app keeps working with poor or no internet connection.
- 💾 **Local persistence** — Uses **IndexedDB (idb)** to store user data and history securely on-device.
- ⚡ **Lightweight global state** — Powered by **Zustand** for fast, minimal-boilerplate state management.
- 🎨 **Modern, responsive UI** — Styled with **Tailwind CSS** for a clean, mobile-friendly experience.
- 🚀 **Instant deployment** — One-command deploys to **Vercel**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React (Create React App) |
| Routing | React Router DOM |
| State Management | Zustand |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| On-device ML | TensorFlow.js, ONNX Runtime Web |
| NLP / Transformers | @xenova/transformers, Hugging Face Inference |
| Voice | react-speech-recognition, Web Speech API |
| Offline Support | Workbox (Service Workers) |
| Local Storage | IndexedDB (idb) |
| Deployment | Vercel |

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Pranavkale11/Aarogya-Saarthi-.git
cd Aarogya-Saarthi-
```

### 2. Install dependencies
```bash
npm install
```

<details>
<summary>📋 Full list of core dependencies (if setting up from scratch)</summary>

```bash
# Routing, state, networking, offline & storage
npm install react-router-dom zustand axios idb workbox-cli workbox-window

# On-device machine learning
npm install @tensorflow/tfjs @tensorflow/tfjs-backend-webgl onnxruntime-web

# Voice interaction
npm install react-speech-recognition web-speech-api

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# NLP / Transformers
npm install @xenova/transformers @huggingface/inference
```
</details>

### 3. Start the development server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser. The page reloads automatically as you edit.

### 4. Build for production
```bash
npm run build
```
This bundles the app in production mode into the `build/` folder, optimized and minified for the best performance.

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel deploy --prod
```

---

## 📁 Project Structure

```
aarogya-saarthi/
├── public/
│   ├── index.html
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Route-level views
│   ├── store/                 # Zustand stores
│   ├── ml/                    # TensorFlow.js / ONNX model logic
│   ├── voice/                 # Speech recognition hooks
│   ├── services/               # Axios / Hugging Face API calls
│   ├── utils/                  # Helper functions
│   ├── App.js
│   └── index.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

> Adjust this to match your actual folder layout.

---

## 🧪 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the interactive test runner |
| `npm run build` | Builds the app for production |
| `npm run eject` | Ejects CRA config (one-way operation) |

---
