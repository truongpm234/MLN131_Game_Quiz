# Sử dụng Python 3.11 slim image để giảm kích thước
FROM python:3.11-slim

# Đặt working directory trong container
WORKDIR /app

# Cài đặt các dependencies hệ thống cần thiết cho pypdf và pdfplumber
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy file requirements.txt trước để tận dụng Docker cache
COPY ./requirements.txt .

# Cài đặt Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ backend code
COPY ./backend /app/backend/

# Tạo thư mục docs trống (sẽ mount volume hoặc copy PDF sau)
RUN mkdir -p /app/docs

# Tạo biến môi trường
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Expose port mà FastAPI sẽ chạy
EXPOSE 8000

# Health check để đảm bảo container đang hoạt động
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/api/health')" || exit 1

# Command để chạy ứng dụng
# Production: Sử dụng multiple workers để tăng hiệu năng
# Development: Thay --workers 4 bằng --reload
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
