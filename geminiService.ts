
import { GoogleGenAI, Type } from "@google/genai";
import { TestResponse, UserProfile, AgeGroup, TestMode, TestResult, Drill } from "./types";
import { Language } from "./translations";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a simple, non-academic summary of the user's performance.
 */
export async function generateCognitiveAnalysis(responses: TestResponse[], user: UserProfile, lang: Language) {
  const ai = getAIClient();
  const performanceData = JSON.stringify(responses.map(r => ({
    correct: r.isCorrect,
    time: r.timeTaken,
  })));

  const prompt = `
    Subject: ${user.name}
    Performance Data: ${performanceData}
    Age Group: ${user.ageGroup}
    Language: ${lang}

    Task: Provide a 2-sentence encouraging summary. 
    Rule 1: Use plain, simple English (or translated equivalent). NO academic words like "synthesis" or "architecture".
    Rule 2: Give 1 simple, fun tip for improvement.
    Rule 3: Provide a 2-word catchy tagline.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ["tagline", "summary"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return {
      tagline: "Quick Thinker",
      summary: "You did a great job answering quickly! Try solving some puzzles today to keep your mind sharp."
    };
  }
}

/**
 * Aira: The Personal Cognitive Mentor.
 */
export async function getAiraResponse(query: string, userContext: string, lang: Language) {
  const ai = getAIClient();
  
  let userData = { Name: "User" };
  try {
    userData = JSON.parse(userContext);
  } catch (e) {
    console.error("Context parse error:", e);
  }

  const systemInstruction = `
    Your Name: Aira.
    Your Role: Friendly Growth Mentor at SACA.
    User Name: ${userData.Name}.
    Context: ${userContext}.
    Language: ${lang}.

    Tone Rules:
    - BE SIMPLE. Use words a 10-year-old understands.
    - BE SHORT. Keep answers under 50 words.
    - BE HELPFUL. Always give 1 clear step the user can take.
    - NO JARGON. Never use words like "cognitive", "psychometric", or "parameters".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { systemInstruction }
    });
    return response.text;
  } catch (err) {
    return "I'm having a little trouble connecting. Can you try asking me again?";
  }
}

/**
 * Generates highly effective, simple mental drills.
 */
export async function generatePersonalizedDrills(domainScores: Record<string, number>, user: UserProfile, lang: Language): Promise<Drill[]> {
  const ai = getAIClient();
  const focusAreas = Object.entries(domainScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2)
    .map(([d]) => d)
    .join(", ");

  const prompt = `
    Create 3 fun brain exercises for ${user.name} to improve in ${focusAreas}.
    Language: ${lang}.

    Requirements:
    1. SIMPLE names (e.g., 'Word Hunt', 'Number Memory').
    2. One sentence goal.
    3. Three easy steps (1, 2, 3).
    4. MUST be doable in 2 minutes without special tools.
    5. NO complicated language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Use Pro for higher quality drill reasoning
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              domain: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              duration: { type: Type.STRING },
              description: { type: Type.STRING },
              instruction: { type: Type.STRING }
            },
            required: ["id", "title", "domain", "difficulty", "duration", "description", "instruction"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [
      {
        id: "d1",
        title: "Reverse Counting",
        domain: "Focus",
        difficulty: "Easy",
        duration: "1 min",
        description: "Count backwards to boost concentration.",
        instruction: "1. Pick a number like 50. 2. Count down to 0 in your head. 3. Try to go faster each time."
      }
    ];
  }
}

export async function generateNeuralVisualization(prompt: string, imageSize: "1K" | "2K" | "4K" = "1K") {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1", imageSize: imageSize }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data.");
  } catch (error: any) {
    if (error?.message?.includes("Requested entity was not found.") || error?.status === 404) {
      throw new Error("API_KEY_REQUIRED");
    }
    throw error;
  }
}
