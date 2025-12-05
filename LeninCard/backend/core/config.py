"""
Backend configuration settings.
"""

import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings."""
    
    # API settings
    api_title: str = "Trợ lý AI Học tập"
    api_version: str = "2.1"
    
    # AI Model settings
    embedding_model: str = "models/text-embedding-004"
    generation_model: str = "gemini-2.5-flash"
    temperature: float = 0.4
    max_output_tokens: int = 8192
    
    # RAG settings
    chunk_size: int = 700
    chunk_overlap: int = 150
    top_k: int = 10
    
    # File paths - QUAN TRỌNG: Dùng đường dẫn tuyệt đối
    # Lấy đường dẫn gốc dựa trên vị trí của file config.py này
    # backend/core/config.py -> đi ngược lên 3 cấp để về root -> vào docs
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    docs_folder: str = os.path.join(BASE_DIR, "docs")
    study_file: str = "[Tailieuvui.com]_giao-trinh-chu-nghia-xa-hoi-khoa-hoc.pdf"
    
    # API Keys
    gemini_api_key: Optional[str] = None
    
    # Page offset for study file
    study_file_page_offset: int = 57
    
    class Config:
        env_file = ".env"
        case_sensitive = False

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.gemini_api_key:
            self.gemini_api_key = os.getenv("GEMINI_API_KEY")

# Global settings instance
settings = Settings()