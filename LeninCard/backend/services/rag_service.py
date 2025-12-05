"""RAG (Retrieval-Augmented Generation) service."""
import os
from typing import List, Dict, Optional
from backend.core.config import settings
from backend.core.document_processor import pdf_to_docs, chunk_text
from backend.services.ai_service import ai_service
from backend.models.vector_store import vector_store
from backend.core.exceptions import AIServiceError, VectorStoreError


class RAGService:
    """Service for RAG operations: indexing and querying."""
    
    def __init__(self):
        """Initialize RAG service."""
        self.chunks: List[Dict] = []
        self.initialized = False
    
    def _load_documents(self) -> None:
        """Load and process documents."""
        docs_folder = os.path.join(os.getcwd(), settings.docs_folder)
        if not os.path.exists(docs_folder):
            raise FileNotFoundError(f"Docs folder not found: {docs_folder}")
        
        all_docs = []
        
        # Load study document
        study_file_path = os.path.join(docs_folder, settings.study_file)
        if os.path.exists(study_file_path):
            print(f"📕 Loading study document: {study_file_path}")
            with open(study_file_path, "rb") as f:
                all_docs.extend(pdf_to_docs(f.read(), settings.study_file))
        else:
            print(f"⚠️  Warning: Study file not found: {study_file_path}")
        
        if not all_docs:
            raise FileNotFoundError("No documents loaded")
        
        # Create chunks
        for doc in all_docs:
            chunks_text = chunk_text(doc["text"])
            for idx, chunk_text_str in enumerate(chunks_text):
                chunk = {
                    "text": chunk_text_str,
                    "source": doc["source"],
                    "chunk_id": idx,
                    "type": doc["type"]
                }
                if "page" in doc:
                    chunk["page"] = doc["page"]
                self.chunks.append(chunk)
        
        print(f"📚 Created {len(self.chunks)} chunks from {len(all_docs)} pages")
    
    def _build_index(self) -> None:
        """Build FAISS index from chunks."""
        if not self.chunks:
            print("⚠️  No chunks to index")
            return
        
        try:
            # Generate embeddings
            texts = [c["text"] for c in self.chunks]
            print("🔄 Generating embeddings...")
            embeddings = ai_service.embed_texts(texts)
            print(f"✅ Generated {len(embeddings)} embeddings")
            
            # Build index
            print("🔄 Building FAISS index...")
            vector_store.build_index(embeddings)
            print("✅ FAISS index built successfully")
            
            self.initialized = True
        except Exception as e:
            print(f"❌ Error building index: {e}")
            raise
    
    def ask_question(self, question: str, top_k: Optional[int] = None) -> Dict:
        """
        Answer a question using RAG.
        
        Args:
            question: User's question
            top_k: Number of context chunks to retrieve
            
        Returns:
            Dictionary with answer and sources
        """
        if not self.initialized:
            raise ValueError("RAG service not initialized")
        
        question = question.strip()
        if not question:
            raise ValueError("Question cannot be empty")
        
        if top_k is None:
            top_k = settings.top_k
        
        # Get query embedding
        query_vector = ai_service.embed_texts([question])
        
        # Search for similar chunks
        indices, scores = vector_store.search(query_vector, top_k)
        contexts = [self.chunks[i] for i in indices]
        
        # Generate answer
        answer = ai_service.generate_response(question, contexts)
        
        # Prepare response
        unique_sources = sorted(set([c["source"] for c in contexts]))
        unique_pages = sorted(set([c.get("page") for c in contexts if "page" in c]))
        
        return {
            "answer": answer,
            "sources": [
                {
                    "type": c["type"],
                    "source": c["source"],
                    "page": c.get("page"),
                    "text": c["text"][:200],
                }
                for c in contexts
            ],
            "documents_used": unique_sources,
            "pages_used": unique_pages,
        }


    def initialize(self) -> None:
        """Initialize RAG service by loading documents and building index."""
        print("🚀 Initializing RAG service...")
        self._load_documents()
        self._build_index()
        print("✨ RAG service initialized successfully")


# Global RAG service instance
rag_service = RAGService()