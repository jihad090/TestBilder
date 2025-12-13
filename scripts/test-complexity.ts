
import { analyzeComplexity } from "../src/utils/complexityAnalyzer";

async function test() {
    console.log("Testing Complexity Analyzer...");

    const easyText = "What is 2 + 2?";
    const hardText = "Explain the impact of quantum computing on modern cryptography.";

    console.log(`Analyzing: "${easyText}"`);
    const res1 = await analyzeComplexity(easyText);
    console.log(`Result: ${res1}`);

    console.log(`Analyzing: "${hardText}"`);
    const res2 = await analyzeComplexity(hardText);
    console.log(`Result: ${res2}`);

    console.log("Done.");
}

test().catch(console.error);
