"""Vector store using FAISS for similarity search."""
import numpy as np
import faiss
from typing import List, Tuple
from backend.core.exceptions import VectorStoreError


class VectorStore:
    """FAISS-based vector store for document embeddings."""
    
    def __init__(self):
        """Initialize empty vector store."""
        self.index: faiss.IndexFlatIP = None
        self.vectors: np.ndarray = None
        self.dimension: int = None
    
    def build_index(self, vectors: np.ndarray) -> None:
        """
        Build FAISS index from embeddings.
        
        Args:
            vectors: Numpy array of embeddings (n_docs, dimension)
        """
        try:
            if len(vectors) == 0:
                raise VectorStoreError("Cannot build index with empty vectors")
            
            # Normalize vectors for cosine similarity
            norms = np.linalg.norm(vectors, axis=1, keepdims=True) + 1e-12
            unit_vecs = vectors / norms
            
            self.dimension = unit_vecs.shape[1]
            self.vectors = unit_vecs
            
            # Create FAISS index with inner product (cosine similarity)
            self.index = faiss.IndexFlatIP(self.dimension)
            self.index.add(unit_vecs.astype('float32'))
            
        except Exception as e:
            raise VectorStoreError(f"Failed to build FAISS index: {str(e)}")
    
    def search(self, query_vector: np.ndarray, top_k: int = 10) -> Tuple[List[int], List[float]]:
        """
        Search for similar documents.
        
        Args:
            query_vector: Query embedding vector
            top_k: Number of results to return
            
        Returns:
            Tuple of (indices, scores) for top-k results
        """
        try:
            if self.index is None:
                raise VectorStoreError("Index not initialized. Call build_index first.")
            
            # Normalize query vector
            q_norm = query_vector / (np.linalg.norm(query_vector, axis=1, keepdims=True) + 1e-12)
            
            # Search
            D, I = self.index.search(q_norm.astype('float32'), top_k)
            
            return I[0].tolist(), D[0].tolist()
            
        except Exception as e:
            raise VectorStoreError(f"Failed to search index: {str(e)}")
    
    @property
    def is_initialized(self) -> bool:
        """Check if index is initialized."""
        return self.index is not None


# Global vector store instance
vector_store = VectorStore()