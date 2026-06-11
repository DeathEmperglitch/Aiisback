# StudyBuddy — AI Study Assistant

An AI-powered study assistant built for students. Powered by Groq (LLaMA 3.2 Vision) and [assistant-ui](https://github.com/assistant-ui/assistant-ui).

## Features

- 📚 Homework & assignment help (step-by-step)
- ✍️ Essay writing, brainstorming & grammar feedback
- 🗓️ Study planning & scheduling
- 🧪 Exam prep, quizzes & flashcards
- 🔬 Math & science problem solving
- 🌍 Language & grammar help
- 🖼️ **Image generation** — "draw me a diagram of the water cycle"
- 📎 **Image analysis** — upload photos of homework, diagrams, or worksheets

## Getting Started

### 1. Get a Groq API key (free)

Go to [https://console.groq.com](https://console.groq.com) and create a free API key.

### 2. Add it to `.env.local`

```
GROQ_API_KEY=your_key_here
```

> Image generation uses [Pollinations.ai](https://pollinations.ai) — completely free, no extra key needed.

### 3. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start studying!

## Usage Tips

- **Upload images**: Click the paperclip to attach a photo of homework or a diagram
- **Generate images**: Type "draw me a diagram of...", "visualize...", or "create an image of..."
- **Study help**: Ask anything — "explain photosynthesis", "help me write an essay intro", "quiz me on WW2"
