# SeeMore AI

> **Look closer. See more.**

SeeMore AI is an observation-training application powered by Google's open **Gemma** models. Instead of functioning like a passive image-labeling or captioning app, SeeMore AI turns photos of real-world surroundings into active visual discovery challenges.

---

## 1. The Core Principle

> **AI gives the clue. Human does the observing.**

Traditional vision AI tells users what is in an image. SeeMore AI inverts this dynamic:
- **Gemma** analyzes the visual hierarchy, relationships, patterns, and functions within a user-uploaded photo.
- Gemma generates an **indirect clue** pointing to a specific feature without disclosing its name or obvious synonyms.
- The user must zoom in, scan the image, observe details, and submit their answer.
- The system evaluates the observation semantically and calculates an authoritative **SeeMore Observation Score** out of 100 with actionable feedback.

---

## 2. Problem & Solution

### The Problem
In an era dominated by rapid scrolling and glance-based consumption, deep visual attention has diminished. People frequently miss subtle architectural details, infrastructure mechanisms, and physical relationships right in front of them.

### The Solution
SeeMore AI gamifies real-world observation. By turning everyday photos into indirect visual puzzles, it trains:
1. **Sustained Attention**: Halting hasty assumptions and scanning deliberately.
2. **Detail Detection**: Identifying small textures, fixtures, and components.
3. **Pattern Recognition**: Spotting repeated structures, grids, and alignments.
4. **Visual Reasoning**: Connecting functional clues with spatial physical evidence.

---

## 3. The Role of Gemma Open Models

SeeMore AI uses the open weights instruction model **Gemma 4 (26B)** (`gemma-4-26b-a4b-it`) via the `@google/genai` SDK, with support for custom self-hosted endpoints (vLLM, Ollama, Hugging Face).

### Why Open Models Matter
Open models allow developers to inspect, fine-tune, and deploy intelligent visual pipelines with full transparency. Unlike closed APIs where internal chain-of-thought and data practices are opaque, Gemma gives developers the freedom to build privacy-conscious, verifiable educational applications.

### Anti-Fake AI Guarantee
SeeMore AI never simulates or hardcodes AI responses. Uploaded images are passed directly to the multimodal engine, which:
1. Performs deep scene inspection across objects, patterns, and contexts.
2. Selects one genuinely visible target.
3. Formulates an indirect clue suited to the selected difficulty (Easy, Medium, Hard, or Mixed).
4. Conducts internal validation to ensure the clue does not spoil the target.
5. Withholds the target from the client until after the user submits an answer.

---

## 4. Key Features

- **Full-Stack Architecture**: Express server with Vite middleware integration and type-safe API routing.
- **Strict Anti-Spoil Guard**: Target identity and evaluation criteria remain strictly server-side until the user submits their answer.
- **Three Depth Levels + Mixed**:
  - *Easy*: Prominent objects, sensory and functional clues.
  - *Medium*: Repeated patterns, textures, and structural relationships.
  - *Hard*: Subtle visual cues, contextual reasoning, and indirect inferences.
  - *Mixed*: Dynamically varies difficulty.
- **Deep Image Inspection Canvas**: Pan and zoom controls allow detailed inspection of fine image elements.
- **Sample Demonstration Scenes**: 4 instant test scenes (Urban Street, Study Room, Garden Patio, Artisan Kitchen) for immediate zero-friction evaluation.
- **SeeMore Observation Score (0–100)**:
  - Target Match (0–50)
  - Detail Awareness (0–20)
  - Reasoning (0–20)
  - Difficulty Bonus (0–10)
- **Observation Progress Dashboard**: Track completed challenges, average scores, and skill area progress bars over Today, 7 Days, 30 Days, or All Time.
- **Zero-Pill Minimalist Design**: Modern dark theme (`#080B12`) with electric cyan (`#5EE7F2`) accents, Inter typography, and full WCAG accessibility.
- **Privacy by Default**: Photos are processed ephemerally in server memory and discarded after the session.

---

## 5. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express, tsx
- **AI Engine**: Google GenAI SDK (`@google/genai`) with **Gemma 4 (26B)** (`gemma-4-26b-a4b-it`)
- **Database**: In-memory session store by default; pluggable MongoDB Atlas support via `MONGODB_URI`
- **Build / Tooling**: Vite 8, TypeScript 7

---

## 6. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# GEMINI_API_KEY: Required for Google Gen AI API calls (including Gemma open models).
GEMINI_API_KEY="your-api-key"

# APP_URL: Host URL for the applet.
APP_URL="http://localhost:3000"

# GEMMA_MODEL: Model identifier for the Gemma open model engine.
GEMMA_MODEL="gemma-4-26b-a4b-it"

# GEMMA_API_ENDPOINT: Optional self-hosted Gemma inference endpoint (e.g. Ollama, vLLM)
# GEMMA_API_ENDPOINT="http://localhost:11434/v1"

# MONGODB_URI: Optional connection string for MongoDB Atlas persistent challenge storage.
# MONGODB_URI="mongodb+srv://..."
```

---

## 7. Local Development & Deployment

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Run the full-stack dev server (port 3000)
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deployment Targets
The app is designed to run seamlessly on containerized hosting platforms such as **Render**, Google Cloud Run, or any Node.js 20+ runtime.

---

## 8. Privacy & Ethics

1. **Ephemeral Processing**: User photos are held in server memory only for challenge generation and evaluation, never written to public cloud storage.
2. **No Medical Claims**: Observation scores and skill areas are explicitly in-app gamification indicators, not psychological or diagnostic certifications.
3. **Transparent Technology**: Model identities and status endpoints are fully disclosed via `/api/system/status`.

---

## 9. Hacktoberfest Open AI Challenge Relevance

SeeMore AI embodies the spirit of open innovation:
- Demonstrates practical multimodal reasoning with open-weights Gemma models.
- Replaces passive content generation with active, human-centered cognitive engagement.
- High architectural standards with zero mock data, real server-side guardrails, and transparent disclosures.
