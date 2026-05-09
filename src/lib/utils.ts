import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseExperts(text: string) {
  const match = text.match(/\[EXPERT:\s*([^\]]+)\]/i);
  return match ? match[1].split(',').map(s => s.trim()) : [];
}

export function cleanResponse(text: string) {
  return text.replace(/\[EXPERT:[^\]]+\]\n?/i, '').trim();
}
