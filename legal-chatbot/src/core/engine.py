from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
from llama_index.core.query_engine import CitationQueryEngine
from src.core.llm import setup_llm
import os

class LegalChatEngine:
    def __init__(self, storage_dir="./data/processed"):
        setup_llm()
        self.storage_dir = storage_dir
        self.index = self._load_or_create_index()

    def _load_or_create_index(self):
        if os.path.exists(self.storage_dir) and os.listdir(self.storage_dir):
            print("Loading existing index...")
            storage_context = StorageContext.from_defaults(persist_dir=self.storage_dir)
            return load_index_from_storage(storage_context)
        return None

    def ingest_documents(self, input_dir="./data/raw"):
        """Reads PDFs from a directory and indexes them."""
        print(f"Ingesting documents from {input_dir}...")
        documents = SimpleDirectoryReader(input_dir).load_data()
        self.index = VectorStoreIndex.from_documents(documents)
        self.index.storage_context.persist(persist_dir=self.storage_dir)
        print("Ingestion complete.")

    def get_query_engine(self):
        """Returns a query engine with citation support."""
        if not self.index:
            raise ValueError("No index found. Please ingest documents first.")
        
        return CitationQueryEngine.from_args(
            self.index,
            similarity_top_k=3,
            citation_chunk_size=512,
        )

    def query(self, text: str):
        engine = self.get_query_engine()
        return engine.query(text)
