# SellerSight – Amazon Review Intelligence Assistant

SellerSight is an **AI-powered Amazon review intelligence platform** that transforms messy, unstructured customer feedback into **clear insight and prioritized business actions**.

Instead of manually reading thousands of reviews, SellerSight uses a **Retrieval-Augmented Generation (RAG)** pipeline with **Pinecone** and **Exa web search** (for limited market context) to:

- Identify themes and root causes behind low ratings  
- Cluster complaints by feature (fit, quality, delivery, value, etc.)  
- Highlight strengths customers actually care about  
- Compare your product with chosen competitors  
- Forecast what happens if you **do nothing**  
- Generate a **prioritized action plan** on what to fix first and how  

👉 **Live demo:** https://seller-sight-repo1.vercel.app  

---

## What SellerSight Does

SellerSight is designed as a **decision engine**, not just a chatbot or dashboard.

For a given Amazon product (ASIN), it:

- Analyzes real review text via a **Pinecone vector database**
- Surfaces **Top Strengths** and **Top Complaints (Root Causes)**  
- Shows a **Product Performance Snapshot** with average rating, trends, and review quality
- Builds **competitor comparison tables** (your product vs selected competitors)
- Generates **“If You Don’t Fix These Issues”** projections (expected rating decline + impact)
- Offers a **prioritized recommendation plan** on **what to fix and how to fix it first**

Typical use cases:

- Amazon sellers improving ratings and conversion  
- Product managers prioritizing features / packaging changes  
- QC / manufacturing teams deciding which defects to tackle first  
- Agencies and marketplace consultants needing review-backed insights  

---

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript  
- **AI Model:** OpenAI (configured in `config.ts`)  
- **Vector Database:** Pinecone (review chunks for ASINs)  
- **Web Search:** Exa (for optional high-level market context)  
- **Hosting:** Vercel  

Core folders:

- `app/` – API routes and main chat UI  
- `components/` – Chat UI, message rendering, and AI response formatting  
- `lib/` – Pinecone integration, moderation, sources, utilities  
- `notebooks/` – Review ingestion / data prep (if used)  
- `config.ts` – Branding, model config, environment behavior  
- `prompts.ts` – System prompts and AI behavior (heavily customized for SellerSight)  

---

## AI Behavior & Prompting Customization

SellerSight is **not** a generic assistant. The prompts in `prompts.ts` heavily constrain behavior:

### 1. Role & Mission

- Identity: **“SellerSight, an Amazon review intelligence assistant”**  
- Mission:
  - Interpret real customer reviews for a seller’s product & competitors  
  - Turn raw review text into **structured, prioritized, actionable insights**  
  - Support decisions that improve ratings, reduce returns, and strengthen competitiveness  

### 2. Tools & RAG Logic

Defined in `TOOL_CALLING_PROMPT`:

- **Primary tool – Pinecone Vector Database**
  - Used for anything involving: reviews, ratings, complaints, pros/cons, feature issues, “what should I fix”, “why is my rating low”, etc.
- **Secondary tool – Exa Web Search**
  - Only for high-level context or when the ASIN is missing from the dataset
  - Never used to simulate live Amazon scraping or real-time data

The model is instructed to:

- **Prefer the vector database** over web search  
- **Never fabricate data** if tools return nothing  
- Be explicit when web search is used  

### 3. Conversation Flow

Encoded in `CONVERSATION_FLOW_PROMPT`:

1. **Category → ASIN → Basic Analysis → Goal → Deep Dive**  
2. First message is classified as:
   - ASIN given  
   - Product described (no ASIN yet)  
   - Generic business question  
   - Out-of-scope  
3. Once an ASIN is locked, it becomes **“your product”** (internally `MY_PRODUCT`), and the user is asked if they want **1–3 competitors** included.
4. Competitors are always referred to as **“Competitor 1 / 2 / 3”** or by brand/title – never as `COMP_1`, `MY_PRODUCT` etc. in user-facing text.

### 4. Output Formatting

Defined in `TONE_STYLE_PROMPT`:

- **Executive summary first** (1–2 sentences)  
- **Bold section headings** and **short bullet points**  
- Heavy use of **tables** for:
  - Product Performance Snapshot
  - Top Strengths / Top Complaints
  - Competitor Comparison
  - Rating Forecasts  
- Single clear **Next Step** question at the end of each answer  

Example sections SellerSight is instructed to use:

- **Product Snapshot**  
- **Top Strengths**  
- **Top Complaints (Root Causes)**  
- **Action Plan**  
- **If You Don’t Fix These Issues**  
- **Competitive View**  
- **Forecast**  
- **Next Step**  

### 5. Automatic “If You Don’t Fix This” + Recommendations

After presenting review analytics, the model:

1. **Always adds** an **“If You Don’t Fix These Issues”** section with:
   - A simple **rating forecast table** (Current, +1 month, +3 months)  
   - 2–4 bullets on business impact (visibility, conversion, returns, competitors)  
2. **Always ends** with a single forward-moving question:
   - “Would you like a **prioritized recommendation plan on what to fix and how to fix it first**?”

This makes SellerSight feel like a **consultant** rather than a passive Q&A bot.

---

## Configuration & Customization

Most customization happens in two files:

### `config.ts`

You can tweak:

- `AI_NAME` – e.g., `"SellerSight"`  
- `OWNER_NAME` – your name  
- `WELCOME_MESSAGE` – initial greeting in the UI  
- `MODEL` – which OpenAI model to use  
- Pinecone settings: `PINECONE_INDEX_NAME`, `PINECONE_TOP_K`  

### `prompts.ts`

You can adjust:

- `IDENTITY_PROMPT` – who the assistant is  
- `TOOL_CALLING_PROMPT` – when to use Pinecone vs Exa  
- `TONE_STYLE_PROMPT` – how outputs are formatted (tables, bullets, bold)  
- `GUARDRAILS_PROMPT` – safety and scope  
- `CONVERSATION_FLOW_PROMPT` – the full flow logic described above  

The `SYSTEM_PROMPT` composes all of these into a single system message.

---

## Environment Setup

You’ll need to set environment variables (e.g., in Vercel):

- `OPENAI_API_KEY` – required  
- `EXA_API_KEY` – optional (for web search)  
- `PINECONE_API_KEY` – optional but recommended (for RAG on review data)  

You can use `env.template` as a guide.

---

## Running Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# App will be available at http://localhost:3000
