"""API endpoints for the RAG application."""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
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
    description="Trợ lý AI Học tập - Hỏi đáp từ giáo trình MLN122"
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

# Startup Event
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup."""
    try:
        rag_service.initialize()
    except Exception as e:
        print(f"❌ Failed to initialize RAG service: {e}")

# API Endpoints
@app.get("/")
async def root():
    """Serve main index.html file"""
    frontend_dir = settings.frontend_folder
    if not os.path.exists(frontend_dir):
        return {"message": "✅ Trợ lý AI Học tập đã sẵn sàng!", "frontend": "Không tìm thấy thư mục frontend"}

    index_path = os.path.join(frontend_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)

    return {"message": "✅ Trợ lý AI Học tập đã sẵn sàng!", "index": "Không tìm thấy index.html"}

@app.get("/test")
async def test_page():
    """Serve test.html file"""
    frontend_dir = settings.frontend_folder
    test_path = os.path.join(frontend_dir, "test.html")
    if os.path.exists(test_path):
        return FileResponse(test_path)
    raise HTTPException(status_code=404, detail="Test page not found")

@app.post("/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question and get AI-generated answer."""
    try:
        result = rag_service.ask_question(request.question, request.top_k)
        return QuestionResponse(**result)
    except (AIServiceError, VectorStoreError) as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi không xác định: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": settings.api_title}

# Mount static files if needed
try:
    frontend_dir = settings.frontend_folder
    if os.path.exists(frontend_dir):
        app.mount("/static", StaticFiles(directory=frontend_dir), name="static")
        print(f"✅ Đã mount thư mục frontend: {frontend_dir}")
        
        # Mount images if exists
        images_dir = os.path.join(frontend_dir, "images")
        if os.path.exists(images_dir):
            app.mount("/images", StaticFiles(directory=images_dir), name="images")
            print(f"✅ Đã mount thư mục images: {images_dir}")
    else:
        print(f"⚠️  Cảnh báo: Không tìm thấy thư mục frontend tại {frontend_dir}")
except Exception as e:
    print(f"⚠️  Lỗi khi mount frontend: {e}")