import { GoogleGenAI } from "@google/genai";
import { LogoConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (config: LogoConfig): Promise<string> => {
  const prompt = `
    Design a professional logo for an educational brand named "${config.name}".
    ${config.slogan ? `Slogan: "${config.slogan}"` : ''}
    
    Style: ${config.style}
    Color Palette: ${config.palette}
    
    Additional Requirements:
    ${config.additionalInfo}
    
    The logo should be suitable for a website header and app icon. 
    Ensure high contrast and clear typography. 
    Output strictly a single high-quality image of the logo on a neutral or white background.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response. The model might have returned text instead.");
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};