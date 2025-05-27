# interview-strella-agent

A **TypeScript** CLI that spins up a LiveKit voice agent powered by OpenAI.  
At runtime the agent

1. connects to a LiveKit room and waits for the first remote participant,  
2. fetches an interview prompt from your Next.js app at  
   `GET http://localhost:3000/api/questionnaire-prompt-builder`,  
3. uses that prompt to initialise an OpenAI **real-time model**, and  
4. runs a short conversation that starts with *“Hello! Are you ready to get started?”*.

---

## 1 · Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | ≥ 18.x  | Tested on 20 LTS |
| **npm** / **pnpm** / **yarn** | latest | examples use **npm** |
| A LiveKit env vars | any | provided by us |
| OpenAI account | any | we will provide **API key** |

---

## 2 · Quick start

```bash
git clone http://github.com/corner3-ai/interview-strella-agent
cd interview-strella-agent

# install dependencies
npm install         

# copy and edit env vars
cp env.example .env # then open .env in your editor
```
### 2.1 · Environment variables

| Variable             | Example value                                       | Required? | Notes                                               |
|----------------------|------------------------------------------------------|-----------|-----------------------------------------------------|
| `LIVEKIT_URL`        | `wss://eu-west-1.livekit.cloud`                      | ✅        | WebSocket endpoint of your LiveKit deployment       |
| `LIVEKIT_API_KEY`    | `lk_api_abc123`                                      | ✅        | API key issued in the LiveKit console               |
| `LIVEKIT_API_SECRET` | `lk_secret_def456`                                   | ✅        | Secret that matches the key above                   |
| `OPENAI_API_KEY`     | `sk-...`                                             | ✅  | Your OpenAI key (the agent uses OpenAI real-time)   |
> **Keep your `.env` file out of version control!**

---

## 3 · Running the agent

```bash
npm run dev
```
or
```bash
npm run start
```

> If you want to test the agent you can use LiveKit voice assstant frontent example: [code](https://github.com/livekit-examples/voice-assistant-frontend)