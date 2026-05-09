import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { Message, UserContext } from "../types";

// Prefer gemini-3.1-pro-preview for complex business advisory tasks
const MODEL_NAME = "gemini-3.1-pro-preview";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async getChatResponse(messages: Message[], userContext?: UserContext) {
    const history = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Inject system prompt and user context
    let fullSystemPrompt = SYSTEM_PROMPT;
    if (userContext) {
      fullSystemPrompt += `\n\nUSER CONTEXT:
Name: ${userContext.name}
Background: ${userContext.background}
Current stage: ${userContext.stage}
Goal: ${userContext.goal}
Location: ${userContext.location}`;
    }

    try {
      const chat = this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: history.slice(0, -1), // Previous history
        config: {
          systemInstruction: fullSystemPrompt,
        },
      });

      // The last message is the current prompt
      const lastMessage = messages[messages.length - 1].content;
      
      const response = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: fullSystemPrompt,
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
        }
      });

      return response.text || "";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
