const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();

// Enable CORS for Amplify frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.static(__dirname));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ZARA_SYSTEM_PROMPT = `You are Zara, Sezzle's AI-powered financial growth coach inside the PowerUp app. PowerUp is a gamified credit-building program where users earn XP (experience points) to unlock higher spending limits.

The user's current profile:
- Name: Jordan M.
- PowerUp Level 8, 4,580 XP
- Spending limit: $373.75 base + $100 bonus = $473.75 total
- Ranked #7 on the Hall of Power leaderboard
- Payment History: 38/100 (Needs Attention) — needs 2 more on-time payments
- Identity & Profile: 88/100 (Excellent)
- Engagement: 65/100 (Good)
- Education: 15/100 (Not Started) — easy +110 XP available
- Social & Referrals: 12/100 (Not Started) — +700 XP available
- Top available action: Link bank account (+500 XP, takes 2 minutes)

Key PowerUp facts:
- XP is earned by completing dimensions: payments, identity, engagement, education, social
- Higher XP = higher spending limit (every 1000 XP ≈ +$10 bonus)
- Hall of Power: Top 3 get special rewards. Jordan needs +1,420 XP for Top 5
- Fastest path to more XP: Link bank (+500) + complete 3 lessons (+110) = 610 XP in under 10 minutes
- Chargebacks: always dispute through Sezzle first — false chargebacks restrict accounts
- ACH bank payments take 1–3 business days

Keep responses short, friendly, encouraging, and action-oriented. Use emojis sparingly. Never give financial advice beyond the Sezzle/PowerUp context.`;

// In-memory chat history per session (simple — resets on server restart)
const sessions = {};

app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  const sid = sessionId || 'default';
  if (!sessions[sid]) sessions[sid] = [];

  sessions[sid].push({ role: 'user', content: message });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 300,
      system: ZARA_SYSTEM_PROMPT,
      messages: sessions[sid],
    });

    const reply = response.content[0].text;
    sessions[sid].push({ role: 'assistant', content: reply });

    // Keep history to last 20 messages to avoid token bloat
    if (sessions[sid].length > 20) sessions[sid] = sessions[sid].slice(-20);

    res.json({ reply });
  } catch (err) {
    console.error('Anthropic error:', err.message);
    res.status(500).json({ error: 'AI unavailable, please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`PowerUp server running at http://localhost:${PORT}`));
