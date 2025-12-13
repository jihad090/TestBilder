
import { pipeline } from '@xenova/transformers';

// Singleton to hold the pipeline
class ComplexityModel {
    static instance: any = null;

    static async getInstance() {
        if (!ComplexityModel.instance) {
            console.log("Loading AI Model (Xenova/bart-large-mnli)... This may take a while initially.");
            // using quantized version by default (approx 400MB)
            // @ts-ignore
            ComplexityModel.instance = await pipeline('zero-shot-classification', 'Xenova/bart-large-mnli');
            console.log("AI Model Loaded Successfully.");
        }
        return ComplexityModel.instance;
    }
}

/**
 * Analyzes the complexity of a question string using local AI.
 * @param text The question text to analyze.
 * @returns 'Easy', 'Medium', or 'Hard'
 */
export async function analyzeComplexity(text: any) {
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return 'Easy';
    }

    try {
        console.log("Analyzing with Local AI...");
        const classifier = await ComplexityModel.getInstance();
        const labels = ["Easy", "Medium", "Hard"];

        // Run inference
        const output = await classifier(text, labels);
        // output format: { sequence: '...', labels: [ 'Medium', 'Hard', 'Easy' ], scores: [ 0.8, 0.1, 0.1 ] }

        if (output && output.labels && output.labels.length > 0) {
            console.log(`Local AI Result: ${output.labels[0]} (Score: ${output.scores[0].toFixed(2)})`);
            return output.labels[0];
        }

    } catch (error) {
        console.error("Local AI Model failed:", error);
        console.warn("Falling back to heuristic.");
    }

    // Fallback Heuristic
    return heuristicComplexity(text);
}

function heuristicComplexity(text: string) {
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / wordCount;

    // Improved Heuristic Logic:
    if (wordCount < 6) return 'Easy';
    if (wordCount > 25) return 'Hard';
    if (avgWordLength > 6) return 'Hard'; // Many complex words

    return 'Medium';
}
