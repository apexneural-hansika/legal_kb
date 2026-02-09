import os
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.core import Settings
from dotenv import load_dotenv

load_dotenv()

def setup_llm():
    """Configures the Gemini LLM and Embedding model."""
    api_key = os.getenv("GOOGLE_API_KEY")
    
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables.")

    # Using Gemini for both generation and embeddings
    Settings.llm = Gemini(model_name="models/gemini-pro", api_key=api_key)
    Settings.embed_model = GeminiEmbedding(model_name="models/embedding-001", api_key=api_key)
    
    return Settings.llm
