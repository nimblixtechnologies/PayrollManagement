
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes payroll data using Gemini to provide HR insights.
 * Uses gemini-3-pro-preview for complex reasoning tasks involving data sets.
 */
export const getPayrollInsights = async (payrollData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this payroll data and provide 3 brief, professional HR insights or recommendations: ${JSON.stringify(payrollData)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impact: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
            },
            required: ['title', 'description', 'impact']
          }
        }
      }
    });

    // Access text as a property on GenerateContentResponse.
    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("No text response received from Gemini");
    }

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    // Fallback static insights if API fails
    return [
      { title: "Standard Review", description: "All payroll markers appear normal for the current period.", impact: "Low" },
      { title: "Budget Efficiency", description: "Consider reviewing overtime trends in Engineering.", impact: "Medium" }
    ];
  }
};
