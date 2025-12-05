"""
Custom exceptions for the application.
"""


class ConfigurationError(Exception):
    """Raised when there's a configuration error."""
    pass


class DocumentProcessingError(Exception):
    """Raised when document processing fails."""
    pass


class AIServiceError(Exception):
    """Raised when AI service encounters an error."""
    pass


class VectorStoreError(Exception):
    """Raised when vector store operations fail."""
    pass