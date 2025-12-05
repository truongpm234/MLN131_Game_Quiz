"""AI service for generating responses using Gemini."""
import os
import numpy as np
from typing import List, Dict
import google.generativeai as genai
from backend.core.config import settings
from backend.core.exceptions import AIServiceError


class AIService:
    """Service for AI-based text generation and embeddings."""

    def __init__(self):
        """Initialize AI service with API key."""
        api_key = settings.gemini_api_key or os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise AIServiceError("GEMINI_API_KEY chưa được thiết lập trong .env")
        genai.configure(api_key=api_key)
        self.generation_model = genai.GenerativeModel(settings.generation_model)
        self.embedding_model = settings.embedding_model

    def embed_texts(self, texts: List[str]) -> np.ndarray:
        """Generate embeddings for texts."""
        if not texts:
            return np.zeros((0, 768), dtype="float32")
        
        try:
            res = genai.embed_content(model=self.embedding_model, content=texts)
            vectors = []
            
            if hasattr(res, "embeddings"):
                vectors = [np.array(embed.values, dtype="float32") for embed in res.embeddings]
            elif isinstance(res, dict):
                emb = res.get("embedding", [])
                if isinstance(emb, list):
                    if len(emb) > 0 and isinstance(emb[0], list):
                        vectors = [np.array(e, dtype="float32") for e in emb]
                    elif len(emb) > 0 and isinstance(emb[0], dict):
                        vectors = [np.array(e.get("values", []), dtype="float32") for e in emb]
                elif isinstance(emb, dict) and "values" in emb:
                    vectors = [np.array(emb["values"], dtype="float32")]
            
            if not vectors:
                raise AIServiceError("Failed to extract embeddings from response")
            
            return np.vstack(vectors)
        except Exception as e:
            raise AIServiceError(f"Lỗi khi tạo embedding: {e}")

    def generate_response(self, question: str, contexts: List[Dict]) -> str:
        """Generate response using Gemini with context."""
        try:
            # Format contexts for the prompt
            formatted_contexts = []
            for i, c in enumerate(contexts):
                formatted_contexts.append(
                    f"[{i+1}] (Trang {c.get('page', '?')}, {c['source']}) {c['text']}"
                )
            formatted_context = "\n\n".join(formatted_contexts)

            # Create prompt
            prompt = f"""
Bạn là **Trợ lý Học tập AI**, một người bạn đồng hành thông minh giúp người dùng:
1. Hiểu rõ giáo trình và nội dung học tập qua giải thích chi tiết, ví dụ cụ thể, liên hệ thực tế.

Nguyên tắc:
- Chỉ dùng thông tin trong CONTEXT (đã có loại tài liệu & số trang nếu có).
- Giải thích tự nhiên, rõ ràng, bằng ngôi xưng "bạn".
- Khi dẫn chứng học tập, chèn trích dẫn [Trang X].
- Nếu không tìm thấy thông tin, trả lời: "Không tìm thấy thông tin phù hợp trong tài liệu."

CONTEXT:
{formatted_context}

CÂU HỎI:
{question}

TRẢ LỜI:
"""

            # Generate response
            response = self.generation_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=settings.temperature,
                    max_output_tokens=settings.max_output_tokens,
                )
            )

            return response.text

        except Exception as e:
            raise AIServiceError(f"Lỗi khi gọi AI: {e}")


# Global AI service instance
ai_service = AIService()