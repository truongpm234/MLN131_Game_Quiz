"""
Document processing utilities.
"""

import io
import os
import unicodedata # Thêm thư viện này để sửa lỗi font tiếng Việt
from typing import List, Dict, Optional
import pdfplumber # Thay pypdf bằng pdfplumber
from backend.core.exceptions import DocumentProcessingError
from backend.core.config import settings


def load_document(file_path: str) -> bytes:
    """Load document from file path."""
    try:
        with open(file_path, "rb") as f:
            return f.read()
    except Exception as e:
        raise DocumentProcessingError(f"Failed to load document {file_path}: {e}")


def clean_vietnamese_text(text: str) -> str:
    """
    Sửa lỗi font tiếng Việt bị tách dấu (VD: 'dân tô ̣c' -> 'dân tộc')
    và chuẩn hóa Unicode về dạng NFKC.
    """
    if not text:
        return ""
    
    # 1. Chuẩn hóa Unicode (gộp ký tự tổ hợp thành ký tự dựng sẵn)
    text = unicodedata.normalize('NFKC', text)
    
    # 2. Xóa các khoảng trắng thừa do lỗi PDF (optional, cẩn thận kẻo dính chữ)
    # Với pdfplumber thì thường bước 1 là đủ.
    
    return text.strip()


def pdf_to_docs(file_bytes: bytes, filename: str) -> List[Dict]:
    """Convert PDF bytes to document chunks with metadata using pdfplumber."""
    try:
        docs = []
        empty_pages = 0
        
        # Dùng pdfplumber mở file từ bytes
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            total_pages = len(pdf.pages)
            print(f"📄 Đang xử lý PDF (pdfplumber): {filename} ({total_pages} trang)")

            for i, page in enumerate(pdf.pages):
                try:
                    # extract_text của pdfplumber thông minh hơn pypdf
                    raw_text = page.extract_text() or ""
                    
                    # Bước quan trọng: Sửa lỗi tiếng Việt
                    text = clean_vietnamese_text(raw_text)
                    
                except Exception as e:
                    print(f"⚠️ Lỗi đọc trang {i+1}: {e}")
                    text = ""
                
                if not text:
                    empty_pages += 1
                    continue
                
                # Xác định số trang thực tế (offset theo config)
                page_num = i + 1
                if filename == settings.study_file:
                    page_num = i + settings.study_file_page_offset
                
                doc = {
                    "text": text,
                    "source": filename,
                    "page": page_num,
                    "type": "study"
                }
                docs.append(doc)
        
        if empty_pages > 0:
            print(f"⚠️ Cảnh báo: Có {empty_pages}/{total_pages} trang không trích xuất được chữ.")
            
        if len(docs) == 0 and total_pages > 0:
            print("❌ LỖI: Không đọc được chữ nào. File này có thể là file Scan ảnh.")

        return docs
    except Exception as e:
        raise DocumentProcessingError(f"Failed to process PDF {filename}: {e}")


def chunk_text(text: str, chunk_size: Optional[int] = None, overlap: Optional[int] = None) -> List[str]:
    """Split text into chunks with specified size and overlap."""
    if chunk_size is None:
        chunk_size = settings.chunk_size
    if overlap is None:
        overlap = settings.chunk_overlap
    
    chunks = []
    start = 0
    n = len(text)
    
    while start < n:
        end = start + chunk_size
        chunk = text[start:end]
        # Chỉ lấy chunk nếu nó có nội dung thực sự (không phải chỉ toàn dấu cách)
        if len(chunk.strip()) > 10: 
            chunks.append(chunk)
        
        step = chunk_size - overlap
        if step <= 0: step = 1 
        start += step
    
    return chunks


def load_study_document() -> List[Dict]:
    """Load and process the main study document."""
    study_file_path = os.path.join(settings.docs_folder, settings.study_file)
    
    if not os.path.exists(study_file_path):
        raise DocumentProcessingError(f"Study document not found: {study_file_path}")
    
    file_bytes = load_document(study_file_path)
    return pdf_to_docs(file_bytes, settings.study_file)