# PowerUp by Sezzle

> A gamified credit-building app that rewards users with XP for healthy financial habits — unlocking higher spending limits as they level up.

**Live Demo:** [https://main.d8o4hckwicqvc.amplifyapp.com/](https://main.d8o4hckwicqvc.amplifyapp.com/)

---

## What is PowerUp?

PowerUp is a mobile-first web app built on top of Sezzle's buy-now-pay-later platform. Instead of a static spending limit, users earn XP (experience points) by completing financial actions — linking their bank, completing lessons, making on-time payments, and referring friends. More XP = higher spending power.

Built for the **2026 Hackathon**, PowerUp transforms the traditional credit experience into an engaging, gamified journey guided by **Zara** — an AI-powered financial growth coach.

---

## Features

### Home Screen
- Displays current spending limit with base + bonus breakdown
- PowerUp banner prompting users to start their growth journey
- Quick access to favorite stores (Target, Nike, DoorDash, Instacart)

### PowerUp Growth Hub
- **5 XP Dimensions** tracked with scores and progress:
  - Payment History — highest impact on limit
  - Identity & Profile — trust signals
  - Engagement — active usage rewards
  - Education — learn to grow faster
  - Social & Referrals — grow the community
- Interactive **radar chart** visualizing all 5 dimensions
- **Growth Path** with node-based progression map
- **Hall of Power** leaderboard with podium (1st, 2nd, 3rd place) and rankings
- Friend network — follow and challenge friends
- Daily streak tracker

### Zara — AI Financial Coach
- Real-time chat powered by **Claude claude-opus-4-6** (Anthropic)
- Zara knows your profile, XP, rank, and available actions
- Remembers conversation context within a session
- Voice interface with animated waveform
- Quick reply shortcuts for common questions

### Lessons & Quizzes
- Interactive financial literacy quizzes
- 3-heart lives system — lose a life on wrong answers
- XP rewards on completion (+50 XP)
- Topics: chargebacks, ACH payments, disputes
- Confetti animation on lesson complete
- Zara trophy shown on completion

### Onboarding
- Personalized purchase preference selection
- Payment plan preference
- Animated intro with Zara mascot

### Calendar & Daily Challenges
- 31-day calendar showing completed and upcoming challenges
- Daily streak tracking
- Challenge completion rewards

---

## AI Integration

Zara is powered by the **Anthropic Claude API** (`claude-opus-4-6`). The integration works as follows:

1. User sends a message in the chat UI
2. Browser POSTs to `/api/chat` on the Node.js backend
3. Server calls the Anthropic API with:
   - The user's message
   - Full conversation history (up to 20 messages for context)
   - A system prompt that gives Zara knowledge of the user's profile, XP, rank, spending limit, and available actions
4. Claude generates a personalized response
5. Response is streamed back to the browser

The API key is kept secure on the server — never exposed to the browser.

**Zara's knowledge includes:**
- Current XP and level breakdown
- Spending limit calculation
- Hall of Power ranking and what it takes to climb
- Fastest paths to earn more XP
- Financial education (chargebacks, ACH, disputes)
- Sezzle-specific policies and features

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| UI Icons | Material Symbols Rounded (Google Fonts) |
| Fonts | Satoshi, Plus Jakarta Sans |
| Backend | Node.js, Express.js |
| AI | Anthropic Claude API (`claude-opus-4-6`) |
| Deployment | AWS Amplify (frontend), AWS App Runner (backend) |

---

## XP & Leveling System

| Level | XP Required | Spending Bonus |
|---|---|---|
| 1 | 100 XP | +$15 |
| 2 | 200 XP | +$25 |
| 3 | 300 XP | +$35 |
| 4 | 400 XP | +$45 |
| 5 | 500 XP | +$50 |
| 6 | 600 XP | +$60 |
| 7 | 700 XP | +$70 |
| 8 | 800 XP | +$80 |
| 9 | 900 XP | +$90 |
| 10 | 1000 XP | +$100 |

**Top XP actions:**
- Link bank account — **+500 XP**
- Refer a friend — **+400 XP**
- Complete all lessons — **+110 XP**
- Make on-time payments — **+50–80 XP each**

---

## Getting Started

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/santiagotobar-a11y/Power-up-Hackaton-2026.git
cd Power-up-Hackaton-2026

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# Start the server
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

---

## Project Structure

```
Power-up-Hackaton-2026/
├── index.html              # Single-page app — all screens and logic
├── server.js               # Express backend + Anthropic API proxy
├── package.json            # Dependencies
├── .env.example            # Environment variable template
├── .gitignore              # Excludes .env and node_modules
├── Sezzle.svg              # Sezzle logo (SVG)
├── sezzle_icon.png         # Sezzle icon
├── zara_chat_thumbnail.png # Zara chat avatar
├── zara_introduction.png   # Zara intro mascot
├── zara_star.png           # Zara banner mascot
├── zara_star no background.png  # Zara banner (no bg)
├── zara_test.png           # Zara quiz mascot
├── zara_trophy.png         # Zara completion mascot
├── target.png              # Store logo
├── nike.png                # Store logo
├── doordash.png            # Store logo
└── instacart.png           # Store logo
```

---

## Hackathon

Built at the **Sezzle Power-Up Hackathon 2026**.

The goal: reimagine how users interact with their spending limit — turning a passive number into an active, gamified journey that rewards financial responsibility.
