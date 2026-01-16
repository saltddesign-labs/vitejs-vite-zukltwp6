import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSouvenirText = async (topic: string, productType: string): Promise<string[]> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return ["Best Trip Ever!", "Unforgettable Moments", "My Journey 2024"];
  }

  try {
    const prompt = `
      Write 3 short, emotional, and catchy phrases (max 5 words each) suitable for printing on a ${productType}.
      The theme is: "${topic}".
      Return ONLY the phrases, separated by a pipe character (|). Do not include numbering.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || '';
    return text.split('|').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["Love this moment", "Travel Memories", "Pure Joy"];
  }
};