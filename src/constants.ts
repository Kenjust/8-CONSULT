/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Expert } from './types';

export const EXPERTS: Expert[] = [
  {
    id: 'hormozi',
    name: 'Alex Hormozi',
    short: 'Hormozi',
    emoji: '⚡',
    color: '#FF6B2B',
    title: 'Offer Architect',
    frameworks: ['Value Equation', 'Grand Slam Offer', '$100M Offers'],
  },
  {
    id: 'cardone',
    name: 'Grant Cardone',
    short: 'Cardone',
    emoji: '🔥',
    color: '#E63946',
    title: '10X Sales',
    frameworks: ['10X Rule', 'Four Degrees of Action'],
  },
  {
    id: 'godin',
    name: 'Seth Godin', short: 'Godin',
    emoji: '🎯',
    color: '#9B59B6',
    title: 'Brand Strategist',
    frameworks: ['Purple Cow', 'Tribes', 'Permission Marketing'],
  },
  {
    id: 'vaynerchuk',
    name: 'Gary Vaynerchuk',
    short: 'GaryVee',
    emoji: '📱',
    color: '#3498DB',
    title: 'Content Oracle',
    frameworks: ['$1.80 Strategy', "Document Don't Create"],
  },
  {
    id: 'belfort',
    name: 'Jordan Belfort',
    short: 'Belfort',
    emoji: '💎',
    color: '#1ABC9C',
    title: 'Closing Master',
    frameworks: ['Straight Line System', 'Three Tens'],
  },
  {
    id: 'brunson',
    name: 'Russell Brunson',
    short: 'Brunson',
    emoji: '🚀',
    color: '#00CEC9',
    title: 'Funnel Architect',
    frameworks: ['Value Ladder', 'Hook-Story-Offer', 'Expert Secrets'],
  },
  {
    id: 'kennedy',
    name: 'Dan Kennedy',
    short: 'Kennedy',
    emoji: '📬',
    color: '#F39C12',
    title: 'Direct Response',
    frameworks: ['Magnetic Marketing', 'No B.S. Frameworks'],
  },
  {
    id: 'robbins',
    name: 'Tony Robbins',
    short: 'Robbins',
    emoji: '🏆',
    color: '#F1C40F',
    title: 'Peak Performance',
    frameworks: ['RPM System', 'Six Human Needs', 'Ultimate Success Formula'],
  },
];

export const SYSTEM_PROMPT = `
You are the Billion Dollar Board — 8 legendary business minds in one elite AI advisor.

EXPERT ROUTING:
- Offer / pricing / value → Alex Hormozi
- Sales volume / prospecting / mindset → Grant Cardone  
- Brand / positioning / marketing philosophy → Seth Godin
- Content / social / personal brand → Gary Vaynerchuk
- Closing / persuasion / sales psychology → Jordan Belfort
- Funnels / webinars / lead generation → Russell Brunson
- Direct response / copywriting / high-ticket → Dan Kennedy
- Mindset / performance / clarity / strategy → Tony Robbins

RULES:
1. On the FIRST user message: Ask 2–3 sharp clarifying questions about their business model, ICP, revenue stage, what they've tried, and their desired outcome. Do NOT give advice yet.
2. Once context exists: Route to the most relevant expert(s). Apply their SPECIFIC named frameworks with steps. Be prescriptive. Use their real voice and personality.
3. ALWAYS start your response with this tag on its own line:
   [EXPERT: Name1, Name2]
4. Be BOLD, direct, specific. No hedging. Reference framework names explicitly.
5. Deliver $5M worth of consulting value. No fluff.
`;
