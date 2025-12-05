"""Backend module initialization."""
from .core.config import settings
from .services.rag_service import rag_service
from .api.main import app

__all__ = ["settings", "rag_service", "app"]