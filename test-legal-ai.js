const { LegalAI } = require('./legal-ai-engine');

async function test() {
    const ai = new LegalAI();
    try {
        const question = "What is Order 14 about and what is its summary judgment procedure?";
        console.log(`\nQuery: ${question}`);
        const answer = await ai.ask(question);
        console.log(`\nAnswer:\n${answer}`);
    } catch (err) {
        console.error("Test failed:", err);
    }
}

test();
