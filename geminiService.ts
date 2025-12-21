
import { GoogleGenAI, Type } from "@google/genai";
import { TestResponse, UserProfile, AgeGroup, TestMode, TestResult, Drill } from "./types";
import { Language } from "./translations";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * High-Nuance Cognitive Synthesis.
 */
export async function generateCognitiveAnalysis(responses: TestResponse[], user: UserProfile, lang: Language) {
  const ai = getAIClient();
  const performanceData = JSON.stringify(responses.map(r => ({
    correct: r.isCorrect,
    time: r.timeTaken,
    questionId: r.questionId,
  })));

  const prompt = `
    ROLE: Principal Institutional Psychometrician at SACA.
    TASK: Generate an official institutional cognitive synthesis for ${user.name}.
    PERFORMANCE_LOG: ${performanceData}.
    DEMOGRAPHIC: ${user.ageGroup}.
    LANGUAGE: Respond strictly in ${lang === 'hi' ? 'Hindi' : lang === 'kn' ? 'Kannada' : 'English'}.
    
    GUIDELINES FOR TAGLINE:
    - HIGH (>120): 'The Cerebral Vanguard', 'Neural Grandmaster', 'Architecture of High-Complexity'.
    - MID (90-115): 'Steady Analytical Anchor', 'Balanced Logic Architect'.
    - DEVELOPING (<90): 'Ascending Logic Explorer', 'Foundation-Stage Analyst'.
    
    SUMMARY: Exactly 2 highly nuanced sentences explaining their specific cognitive behavior.
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
      tagline: "Standardized Baseline Profile",
      summary: "Evaluation successfully concluded. Cognitive markers indicate a stable performance threshold for the current demographic cohort."
    };
  }
}

/**
 * Aira: Fast Neural Protocol Counselor.
 */
export async function getAiraResponse(query: string, userContext: string, lang: Language) {
  const ai = getAIClient();
  const systemInstruction = `
    Identity: You are Aira, the Architect for Institutional Research & Analysis at SACA.
    Tone: Professional, calm, empathetic, and structurally clear. 
    Language: ${lang}.
    Context: ${userContext}.
    Objective: Help the user understand their cognitive results, suggest neural roadmap tips, or explain SACA's research. 
    Constraint: Keep responses under 100 words. Use bullet points for advice. Avoid jargon unless explaining it.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { systemInstruction }
    });
    return response.text;
  } catch (err) {
    return "Institutional communication link unstable. Please retry.";
  }
}

export async function generatePersonalizedDrills(domainScores: Record<string, number>, user: UserProfile, lang: Language): Promise<Drill[]> {
  const ai = getAIClient();
  const sortedDomains = Object.entries(domainScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([domain]) => domain);

  const prompt = `
    Generate 3 brain conditioning protocols for ${user.name} for: ${sortedDomains.join(', ')}.
    Language: ${lang}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    return [];
  }
}

/**
 * Generates an institutional-grade visual of cognitive topology.
 * Requires mandatory API key selection via aistudio interface for Gemini 3 Pro series models.
 */
export async function generateNeuralVisualization(prompt: string, imageSize: "1K" | "2K" | "4K" = "1K"): Promise<string> {
  // Check whether an API key has been selected using pre-configured window.aistudio helper
  const hasKey = await (window as any).aistudio.hasSelectedApiKey();
  if (!hasKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  // Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `SACA Institutional Neural Topology: ${prompt}. Minimalist scientific blueprint, neural architecture, professional psychometric mapping style, high-fidelity research aesthetic.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: imageSize
        }
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
      // The output response may contain both image and text parts; iterate to find the image part
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
        }
      }
    }
    throw new Error("Institutional synthesis returned no visual payload.");
  } catch (error: any) {
    // If the request fails due to key mismatch, signal that key selection is required
    if (error.message?.includes("Requested entity was not found.")) {
      throw new Error("API_KEY_REQUIRED");
    }
    throw error;
  }
}
