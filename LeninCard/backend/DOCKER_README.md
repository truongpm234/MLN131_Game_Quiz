# Backend Docker Setup

## Giới thiệu
Dockerfile này dùng để containerize phần backend Python FastAPI của dự án LeninCard, bao gồm RAG service với Google Gemini AI.

## Yêu cầu
- Docker Desktop đã cài đặt
- File `.env` với `GEMINI_API_KEY` ở thư mục `LeninCard/`
- File PDF trong thư mục `docs/`

## Cấu trúc
```
LeninCard/
├── backend/
│   ├── Dockerfile           # Docker configuration
│   ├── docker-compose.yml   # Docker Compose configuration
│   ├── .dockerignore        # Files to exclude from build
│   ├── api/
│   ├── core/
│   ├── models/
│   └── services/
├── docs/                    # PDF documents
├── requirements.txt         # Python dependencies
└── .env                     # Environment variables
```

## Cách sử dụng

### 1. Build Docker Image
```bash
cd backend
docker build -t lenincard-backend:latest -f Dockerfile ..
```

### 2. Run với Docker Compose (Khuyến nghị)
```bash
cd backend
docker-compose up -d
```

Hoặc build và chạy cùng lúc:
```bash
docker-compose up -d --build
```

### 3. Run trực tiếp với Docker
```bash
docker run -d \
  --name lenincard_backend \
  -p 8000:8000 \
  -e GEMINI_API_KEY=your_api_key_here \
  -v "$(pwd)/../docs:/app/docs" \
  lenincard-backend:latest
```

## Kiểm tra

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Debug System Info
```bash
curl http://localhost:8000/api/debug
```

### API Documentation
Truy cập: http://localhost:8000/api/docs

## Quản lý Container

### Xem logs
```bash
docker-compose logs -f backend
```

Hoặc:
```bash
docker logs -f lenincard_backend
```

### Dừng container
```bash
docker-compose down
```

### Restart container
```bash
docker-compose restart
```

### Xóa container và image
```bash
docker-compose down
docker rmi lenincard-backend:latest
```

## Production Deployment

Để deploy production, sửa file `docker-compose.yml`:
1. Bỏ volume mount code (chỉ giữ docs)
2. Thay `--reload` bằng cấu hình production trong Dockerfile
3. Cấu hình reverse proxy (Nginx/Traefik)
4. Sử dụng secrets cho API keys

### Dockerfile Production
Sửa dòng cuối trong `Dockerfile`:
```dockerfile
# Development
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# Production
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

## Troubleshooting

### Container không start được
1. Kiểm tra logs: `docker logs lenincard_backend`
2. Đảm bảo port 8000 không bị chiếm
3. Kiểm tra GEMINI_API_KEY trong file `.env`

### PDF không load được
1. Kiểm tra file PDF có trong `docs/` folder
2. Kiểm tra volume mount: `docker exec lenincard_backend ls /app/docs`

### Import errors
1. Kiểm tra PYTHONPATH: `docker exec lenincard_backend python -c "import sys; print(sys.path)"`
2. Rebuild image: `docker-compose up -d --build`

## Environment Variables

| Variable | Mô tả | Default |
|----------|-------|---------|
| GEMINI_API_KEY | Google Gemini API Key | (required) |
| PYTHONUNBUFFERED | Python output buffering | 1 |
| PYTHONPATH | Python module search path | /app |

## Notes
- Image size: ~500MB (slim base + dependencies)
- Startup time: ~10-30s (khởi tạo RAG service)
- Health check: Mỗi 30s
- Auto-restart: Enabled (unless-stopped)
