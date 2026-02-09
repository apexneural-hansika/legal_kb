# Legal Reasoning Chatbot Module

A reusable RAG-based module designed for high-precision legal document analysis with support for PDF context and verifiable citations.

## Stack Recommendation: Python + LlamaIndex

For legal reasoning, **Python with LlamaIndex** is recommended over Node.js/LangChain for the following reasons:

1.  **Native Citation Support**: LlamaIndex provides a `CitationQueryEngine` that automatically tracks source nodes and simplifies the inclusion of page-level citations in responses.
2.  **Advanced PDF Parsing**: Python's ecosystem (`PyMuPDF`, `Unstructured`) is more mature for handling complex legal document layouts (columns, footers, etc.).
3.  **Data-Centric Design**: LlamaIndex is built specifically for "data augmentation," making it easier to implement complex retrieval strategies (e.g., recursive retrieval, hybrid search) which are crucial for legal precision.

## Key Features

-   **PDF Ingestion**: Robust extraction of text and metadata from PDF files.
-   **RAG Engine**: Semantic search across legal documents using vector embeddings.
-   **Verifiable Citations**: Every answer includes references to the specific source document and section.
-   **Modular Design**: Easily integrated into FastAPI, Flask, or CLI applications.

## Directory Structure

```text
legal-chatbot/
├── src/
│   ├── core/
│   │   ├── engine.py       # RAG logic & Citation Query Engine
│   │   └── llm.py          # Google Gemini / LLM configuration
│   ├── data/
│   │   ├── ingest.py       # PDF parsing & chunking logic
│   │   └── store.py        # Vector database (Chroma/Qdrant) management
│   ├── utils/
│   │   └── citations.py    # Formatting and post-processing of source refs
│   └── main.py             # Module entry point
├── data/
│   ├── raw/                # Uploaded PDFs
│   └── processed/          # Local vector storage / indices
├── tests/                  # Unit and integration tests
├── requirements.txt        # Dependency list
└── .env.example            # Environment variables
```

## Setup

1.  **Clone/Copy** this module into your project.
2.  **Install dependencies**:
    ```bash
    pip install llama-index llama-index-llms-gemini llama-index-embeddings-gemini pypdf
    ```
3.  **Configure Environment**:
    Create a `.env` file based on `.env.example` with your Google API Key.

## Usage

```python
from src.core.engine import LegalChatEngine

engine = LegalChatEngine()
engine.ingest_document("data/raw/contract.pdf")
response = engine.query("What are the termination clauses?")
print(response)
# Output: "The contract can be terminated... [Source: contract.pdf, Page 4]"
```
