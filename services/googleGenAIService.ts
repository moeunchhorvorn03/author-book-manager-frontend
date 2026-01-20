import { GenerateContentConfig, GoogleGenAI } from "@google/genai";

class GoogleGenAIService {
    private static instance: GoogleGenAIService;
    private ai: GoogleGenAI;
    
    private constructor() {
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY is not set");
        }

        this.ai = new GoogleGenAI({ apiKey });
    }

    public static getInstance(): GoogleGenAIService {
        if (!this.instance) {
            this.instance = new GoogleGenAIService();
        }
        return this.instance;
    }


    public generateContent(options: generateContentOptions) {
        const model = options.model || "gemini-3-flash-preview";

        return this.ai.models.generateContent({
            model: model,
            contents: options.contents,
            config: options.config
        });
    }
}

export const googleGenAI = GoogleGenAIService.getInstance();

interface generateContentOptions {
    model?: string;
    contents: string;
    config: GenerateContentConfig;
}