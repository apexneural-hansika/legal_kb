from src.core.engine import LegalChatEngine
import os

def main():
    # Ensure data directories exist
    os.makedirs("./data/raw", exist_ok=True)
    os.makedirs("./data/processed", exist_ok=True)

    chat_engine = LegalChatEngine()

    # Check if we have documents to index
    if not os.listdir("./data/raw"):
        print("Please place PDF documents in 'data/raw' and restart.")
        return

    # Ingest if index is empty
    if not chat_engine.index:
        chat_engine.ingest_documents()

    # Simple CLI Loop
    print("\nLegal Reasoning Chatbot Active. Type 'exit' to quit.")
    while True:
        user_input = input("\nQuery: ")
        if user_input.lower() in ['exit', 'quit']:
            break
        
        response = chat_engine.query(user_input)
        print(f"\nAnswer: {response}")
        print("\nCitations:")
        for source in response.source_nodes:
            print(f"- {source.node.get_metadata_str()}")

if __name__ == "__main__":
    main()
