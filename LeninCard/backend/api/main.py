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

# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    description="Trợ lý AI Học tập",
    docs_url="/api/docs", 
    openapi_url="/api/openapi.json" 
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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
        # Kiểm tra xem đã init chưa để tránh làm lại không cần thiết gây timeout
        if not rag_service.initialized:
            print("⏳ Đang khởi động RAG Service...")
            # Lưu ý: Trên Vercel Free, bước này có thể bị timeout nếu xử lý PDF quá lâu
            rag_service.initialize()
    except Exception as e:
        print(f"❌ Failed to initialize RAG service: {e}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": settings.api_title}

@app.post("/api/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question and get AI-generated answer."""
    try:
        # Đảm bảo RAG đã sẵn sàng
        if not rag_service.initialized:
             rag_service.initialize()

        result = rag_service.ask_question(request.question, request.top_k)
        return QuestionResponse(**result)
    except (AIServiceError, VectorStoreError) as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi không xác định: {str(e)}")