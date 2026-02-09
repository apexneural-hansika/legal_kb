const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { MemoryVectorStore } = require('@langchain/classic/vectorstores/memory');
require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const CONFIG = {
    pdfPath: path.join(__dirname, 'legal-chatbot/data/raw/Rules_of_Court_2012.pdf'),
    modelName: "gemini-1.5-pro", 
    embeddingModel: "embedding-001",
};

class LegalAI {
    constructor() {
        this.vectorStore = null;
        this.model = new ChatGoogleGenerativeAI({
            model: CONFIG.modelName,
            maxOutputTokens: 2048,
            apiKey: GOOGLE_API_KEY || "DUMMY",
        });
    }

    async init() {
        console.log("Loading Malaysian Rules of Court 2012...");
        const dataBuffer = fs.readFileSync(CONFIG.pdfPath);
        const data = await pdf(dataBuffer);
        
        console.log("Splitting document into chunks...");
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        
        const docs = await splitter.createDocuments([data.text]);
        
        console.log("Creating vector store...");
        
        let embeddings;
        if (GOOGLE_API_KEY) {
            embeddings = new GoogleGenerativeAIEmbeddings({
                modelName: CONFIG.embeddingModel,
                apiKey: GOOGLE_API_KEY,
            });
        } else if (OPENAI_API_KEY) {
            console.log("Falling back to OpenAI for embeddings...");
            const { OpenAIEmbeddings } = require('@langchain/openai');
            embeddings = new OpenAIEmbeddings({ apiKey: OPENAI_API_KEY });
            
            const { ChatOpenAI } = require('@langchain/openai');
            this.model = new ChatOpenAI({ modelName: "gpt-4o", apiKey: OPENAI_API_KEY });
        } else {
            throw new Error("No API keys found (GOOGLE_API_KEY or OPENAI_API_KEY)");
        }
        
        this.vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
        console.log("Legal AI Initialized.");
    }

    async ask(query) {
        if (!this.vectorStore) await this.init();

        const searchResults = await this.vectorStore.similaritySearch(query, 4);
        const context = searchResults.map(d => d.pageContent).join("\n---\n");

        const prompt = `
You are a highly specialized Malaysian Legal Assistant.
Your goal is to provide precise, authoritative answers based ONLY on the provided Rules of Court 2012 context.

CONTEXT:
${context}

QUESTION:
${query}

RULES:
1. Use a professional, legal tone.
2. Provide exact citations (Order, Rule) whenever possible based on the text.
3. If the answer is not in the context, say "I cannot find this information in the Rules of Court 2012."
4. Format your output in Markdown.

ANSWER:`;

        const response = await this.model.invoke(prompt);
        return response.content;
    }
}

module.exports = { LegalAI };
