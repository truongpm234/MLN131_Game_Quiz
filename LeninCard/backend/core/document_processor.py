"""
Document processing utilities.
"""

import io
import os
from typing import List, Dict, Optional
from pypdf import PdfReader
from backend.core.exceptions import DocumentProcessingError
from backend.core.config import settings


def load_document(file_path: str) -> bytes:
    """Load document from file path."""
    try:
        with open(file_path, "rb") as f:
            return f.read()
    except Exception as e:
        raise DocumentProcessingError(f"Failed to load document {file_path}: {e}")


def pdf_to_docs(file_bytes: bytes, filename: str) -> List[Dict]:
    """Convert PDF bytes to document chunks with metadata."""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        docs = []
        
        for i, page in enumerate(reader.pages):
            try:
                text = page.extract_text() or ""
            except Exception:
                text = ""
            text = text.strip()
            if not text:
                continue
            
            # Determine page number based on filename
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
        if chunk.strip():
            chunks.append(chunk)
        start = end - overlap
    
    return chunks


def load_study_document() -> List[Dict]:
    """Load and process the main study document."""
    study_file_path = os.path.join(settings.docs_folder, settings.study_file)
    
    if not os.path.exists(study_file_path):
        raise DocumentProcessingError(f"Study document not found: {study_file_path}")
    
    file_bytes = load_document(study_file_path)
    return pdf_to_docs(file_bytes, settings.study_file)