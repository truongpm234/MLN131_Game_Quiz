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
    
    def _find_docs_folder(self) -> str:
        """Thử tìm thư mục docs ở nhiều vị trí khác nhau."""
        candidates = [
            settings.docs_folder,  # Từ config
            os.path.join(os.getcwd(), "docs"), # Tại thư mục chạy lệnh
            os.path.join(os.path.dirname(__file__), "../../docs"), # Relative từ file này
            "docs", # Đường dẫn tương đối đơn giản
            "/tmp/docs" # Trường hợp deploy serverless
        ]
        
        for path in candidates:
            if path and os.path.exists(path) and os.path.isdir(path):
                print(f"✅ Đã tìm thấy thư mục docs tại: {path}")
                return path
        
        print(f"❌ Không tìm thấy thư mục docs. Đã thử: {candidates}")
        return settings.docs_folder

    def _load_documents(self) -> None:
        """Load and process documents."""
        docs_folder = self._find_docs_folder()
        
        all_docs = []
        
        # Load study document
        study_file_path = os.path.join(docs_folder, settings.study_file)
        
        if os.path.exists(study_file_path):
            print(f"📕 Đang đọc file: {study_file_path}")
            try:
                with open(study_file_path, "rb") as f:
                    file_content = f.read()
                    extracted_docs = pdf_to_docs(file_content, settings.study_file)
                    
                    if not extracted_docs:
                        print("⚠️ CẢNH BÁO: File PDF được mở nhưng không đọc được văn bản nào. Có thể đây là file scan (ảnh)?")
                    else:
                        print(f"✅ Đã trích xuất được {len(extracted_docs)} trang văn bản.")
                        
                    all_docs.extend(extracted_docs)
            except Exception as e:
                print(f"❌ Lỗi khi đọc file PDF: {e}")
        else:
            print(f"⚠️ Không tìm thấy file giáo trình tại: {study_file_path}")
            # List các file trong thư mục để debug
            if os.path.exists(docs_folder):
                print(f"📂 Các file có trong {docs_folder}: {os.listdir(docs_folder)}")
        
        if not all_docs:
            print("❌ Không có tài liệu nào được nạp. Chatbot sẽ không có kiến thức.")
            return
        
        # Create chunks
        self.chunks = []
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
        
        print(f"📚 Đã tạo {len(self.chunks)} đoạn dữ liệu (chunks) từ {len(all_docs)} trang tài liệu")
    
    def _build_index(self) -> None:
        """Build FAISS index from chunks."""
        if not self.chunks:
            print("⚠️ Không có chunks để đánh chỉ mục (Index)")
            return
        
        try:
            # Generate embeddings
            texts = [c["text"] for c in self.chunks]
            print(f"🔄 Đang tạo embedding cho {len(texts)} đoạn văn bản...")
            embeddings = ai_service.embed_texts(texts)
            
            if len(embeddings) == 0:
                print("❌ Lỗi: API không trả về embedding nào.")
                return

            print(f"✅ Đã tạo xong {len(embeddings)} embeddings")
            
            # Build index
            print("🔄 Đang xây dựng FAISS index...")
            vector_store.build_index(embeddings)
            print("✅ FAISS index xây dựng thành công")
            
            self.initialized = True
        except Exception as e:
            print(f"❌ Lỗi nghiêm trọng khi xây dựng index: {e}")
            raise
    
    def ask_question(self, question: str, top_k: Optional[int] = None) -> Dict:
        """Answer a question using RAG."""
        if not self.initialized:
            # Thử khởi tạo lại nếu chưa có
            print("⚠️ RAG chưa được khởi tạo, đang thử khởi tạo lại...")
            self.initialize()
            if not self.initialized:
                return {
                    "answer": "Hệ thống đang gặp sự cố khi đọc tài liệu. Vui lòng kiểm tra logs server.",
                    "sources": []
                }
        
        question = question.strip()
        if not question:
            raise ValueError("Question cannot be empty")
        
        if top_k is None:
            top_k = settings.top_k
        
        # Get query embedding
        query_vector = ai_service.embed_texts([question])
        
        # Search for similar chunks
        indices, scores = vector_store.search(query_vector, top_k)
        
        # Filter valid indices
        valid_indices = [i for i in indices if 0 <= i < len(self.chunks)]
        contexts = [self.chunks[i] for i in valid_indices]
        
        print(f"🔍 Tìm thấy {len(contexts)} đoạn liên quan cho câu hỏi: '{question}'")
        
        print("====== KIỂM TRA NỘI DUNG CHUNKS ======")
        for i, ctx in enumerate(contexts[:3]): # Chỉ in 3 đoạn đầu
            print(f"Chunk {i+1}: {ctx['text'][:200]}...") # In 200 ký tự đầu
            print("------------------------------------")
        # Generate answer
        answer = ai_service.generate_response(question, contexts)
        
        # Prepare response
        unique_sources = sorted(set([c["source"] for c in contexts]))
        unique_pages = sorted(set([c.get("page") for c in contexts if "page" in c]))
        
        return {
            "answer": answer,
            "sources": [
                {
                    "type": c.get("type", "unknown"),
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
        print("🚀 Đang khởi động RAG service...")
        self._load_documents()
        self._build_index()
        if self.initialized:
            print("✨ RAG service đã sẵn sàng!")
        else:
            print("💀 RAG service khởi động thất bại.")


# Global RAG service instance
rag_service = RAGService()