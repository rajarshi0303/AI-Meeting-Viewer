# 🧠 AI-Meeting-Viewer

**AI-Meeting-Viewer** is a React-based web application that allows users to view their Google Calendar meetings and generate AI-powered summaries for each event using the HuggingFace `facebook/bart-large-cnn` model.

> View and summarize your meetings – all in one sleek, responsive UI.

---

## ✨ Features

- 📅 Fetch and display meetings from Google Calendar
- 🤖 AI-generated meeting summaries using HuggingFace API
- 🌙 Light/Dark mode toggle
- 🔗 Direct links to Google Calendar events
- ⚡ Fast and responsive UI with TailwindCSS
- 🧪 TypeScript for type safety and scalability

---

## 🛠 Tech Stack

- **React** (w/ TypeScript)
- **TailwindCSS** (UI Styling)
- **Axios** (API Requests)
- **HuggingFace Inference API** (AI Summarization)
- **Google Calendar Integration** (Frontend only)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajarshi0303/AI-Meeting-Viewer.git
cd AI-Meeting-Viewer
```
### 2. Install dependencies
```
npm install
```
### 3. Add your HuggingFace API Key
#### Create a .env file in the root directory or rename .env.example to .env:
```
VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
VITE_HF_API_KEY="your_huggingface_api_key_here"
```
### 4. Start the development server
```
npm run dev
```
