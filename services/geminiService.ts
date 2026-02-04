import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const initializeChat = () => {
  if (chatSession) return chatSession;
  
  // Note: In a production app, never expose the API key on the client side like this unless restricted.
  // Using process.env.API_KEY as per instructions.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are Arham AI, a compassionate veterinary assistant for Arham Animal Ambulance (Always Care). 
      Your goal is to provide immediate, temporary first-aid advice for animals while the user contacts our ambulance.
      
      CRITICAL RULES:
      1. ALWAYS advise the user to call the nearest ambulance from the list on the screen if the situation is urgent.
      2. Keep answers short, calm, and actionable (bullet points).
      3. Do not diagnose complex diseases; focus on stabilization (stop bleeding, keep warm, do not move, etc.).
      4. If asked about the organization, say we have 75+ vets, 35+ ambulances, and have treated 1.5L+ animals.
      
      Tone: Urgent, calm, professional, compassionate.`,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm having trouble connecting right now. Please call an ambulance immediately.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection error. Please call an ambulance from the numbers above immediately.";
  }
};
