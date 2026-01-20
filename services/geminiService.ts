
import { GoogleGenAI } from "@google/genai";

export const getTravelAdvice = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Aura Airlines Assistant. Talk to users in very simple, clear, and friendly English. Do not use hard words. Be very helpful and keep the tone luxurious but easy to understand.",
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am sorry, I am having a little trouble right now. Please try again in a moment!";
  }
};
