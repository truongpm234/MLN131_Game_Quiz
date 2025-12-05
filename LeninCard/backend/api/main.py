"""API endpoints for the RAG application."""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Import from backend modules
from backend.core.config import settings
from backend.services.rag_service import rag_service
from backend.core.exceptions import AIServiceError, VectorStoreError
from backend.models.vector_store import vector_store # Import thêm vector_store để debug

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    description="Trợ lý AI Học tập",
    docs_url="/api/docs", 
    openapi_url="/api/openapi.json" 
)

# Add CORS middleware
# Production: Nên set ALLOWED_ORIGINS trong environment variable
# Development: Dùng ["*"] để test
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class QuestionRequest(BaseModel):
    question: str
    top_k: Optional[int] = None

class QuestionResponse(BaseModel):
    answer: str
    sources: List[dict]

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    try:
        if not rag_service.initialized:
            print("⏳ Đang khởi động RAG Service...")
            rag_service.initialize()
    except Exception as e:
        print(f"❌ Failed to initialize RAG service: {e}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy", 
        "service": settings.api_title,
        "rag_initialized": rag_service.initialized
    }

@app.get("/api/debug")
async def debug_system():
    """Endpoint để kiểm tra xem hệ thống đã nạp được file chưa."""
    docs_path = settings.docs_folder
    study_path = os.path.join(docs_path, settings.study_file)
    
    return {
        "rag_initialized": rag_service.initialized,
        "total_chunks": len(rag_service.chunks),
        "vector_store_ready": vector_store.is_initialized,
        "paths": {
            "configured_docs_path": docs_path,
            "study_file_path": study_path,
            "file_exists": os.path.exists(study_path),
            "cwd": os.getcwd()
        }
    }

@app.post("/api/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question and get AI-generated answer."""
    try:
        # Tự động init nếu chưa có
        if not rag_service.initialized:
             rag_service.initialize()

        result = rag_service.ask_question(request.question, request.top_k)
        return QuestionResponse(**result)
    except (AIServiceError, VectorStoreError) as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        import traceback
        traceback.print_exc() # In lỗi chi tiết ra terminal
        raise HTTPException(status_code=500, detail=f"Lỗi không xác định: {str(e)}")