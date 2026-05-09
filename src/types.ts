/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Expert {
  id: string;
  name: string;
  emoji: string;
  color: string;
  title: string;
  frameworks: string[];
  short: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  experts?: string[];
}

export interface UserContext {
  name: string;
  background: string;
  stage: string;
  goal: string;
  location: string;
}
