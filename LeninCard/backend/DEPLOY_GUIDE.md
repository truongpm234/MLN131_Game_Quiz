# 🚀 Hướng dẫn Deploy Backend lên Production

## Các nền tảng deploy phổ biến

### 1. Railway.app (Khuyến nghị - DỄ NHẤT)
**Ưu điểm:** Miễn phí tier, tự động build Docker, dễ setup

**Bước thực hiện:**
1. Tạo tài khoản tại https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Chọn repository của bạn
4. Railway tự động detect Dockerfile
5. Thêm Environment Variables:
   - `GEMINI_API_KEY=your_api_key`
   - `ALLOWED_ORIGINS=https://yourfrontend.com`
6. Deploy!

**Lưu ý:** 
- Railway cho 500 hours/tháng miễn phí
- Tự động tạo domain: `https://your-app.up.railway.app`

---

### 2. Render.com (Miễn phí, tốt)
**Ưu điểm:** Miễn phí vĩnh viễn, hỗ trợ Docker

**Bước thực hiện:**
1. Tạo tài khoản tại https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Chọn:
   - Environment: Docker
   - Dockerfile path: `backend/Dockerfile`
   - Health check path: `/api/health`
5. Thêm Environment Variables:
   ```
   GEMINI_API_KEY=your_api_key
   ALLOWED_ORIGINS=https://yourfrontend.com
   ```
6. Deploy!

**Lưu ý:** 
- Free tier sẽ sleep sau 15 phút không dùng
- Khởi động lại mất ~30s khi có request

---

### 3. Google Cloud Run (Tốt, pay-as-you-go)
**Ưu điểm:** Cực mạnh, scale tự động, free tier rộng

**Bước thực hiện:**
```bash
# 1. Cài Google Cloud SDK
# 2. Login
gcloud auth login

# 3. Tạo project
gcloud projects create lenincard-backend
gcloud config set project lenincard-backend

# 4. Build và push image
cd d:\mln_131\MLN131_Game_Quiz\LeninCard\backend
gcloud builds submit --tag gcr.io/lenincard-backend/backend

# 5. Deploy
gcloud run deploy lenincard-backend \
  --image gcr.io/lenincard-backend/backend \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key,ALLOWED_ORIGINS=https://yourfrontend.com
```

---

### 4. DigitalOcean App Platform
**Ưu điểm:** Đơn giản, $5/tháng

**Bước thực hiện:**
1. Tạo tài khoản DigitalOcean
2. Apps → Create App
3. Connect GitHub
4. Chọn Dockerfile: `backend/Dockerfile`
5. Set environment variables
6. Deploy!

---

### 5. VPS (AWS EC2, DigitalOcean Droplet, Vultr)
**Ưu điểm:** Kiểm soát hoàn toàn, rẻ nhất về lâu dài

**Bước thực hiện:**

```bash
# 1. SSH vào VPS
ssh root@your_vps_ip

# 2. Cài Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Cài docker-compose
apt-get install docker-compose

# 4. Clone repository
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo/LeninCard/backend

# 5. Tạo file .env
nano .env
# Thêm: GEMINI_API_KEY=your_key

# 6. Build và run
docker-compose -f docker-compose.prod.yml up -d --build

# 7. Setup Nginx reverse proxy (optional)
apt-get install nginx
nano /etc/nginx/sites-available/backend
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Setup SSL với Let's Encrypt
apt-get install certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

---

## ⚙️ Environment Variables cần thiết

| Variable | Mô tả | Ví dụ |
|----------|-------|-------|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `ALLOWED_ORIGINS` | Frontend URLs (phân cách bằng dấu phẩy) | `https://yoursite.com,https://www.yoursite.com` |
| `PYTHONUNBUFFERED` | Python logging | `1` |

---

## 🔒 Bảo mật Production

### 1. KHÔNG hard-code API key vào code
- ✅ Dùng environment variables
- ❌ KHÔNG commit file `.env` lên Git

### 2. Giới hạn CORS origins
```bash
# Thay vì allow_origins=["*"]
ALLOWED_ORIGINS=https://yourfrontend.com,https://www.yourfrontend.com
```

### 3. Setup HTTPS/SSL
- Railway/Render tự động có SSL
- VPS: Dùng Certbot + Let's Encrypt

### 4. Rate limiting (Optional)
Cài thêm package:
```bash
pip install slowapi
```

---

## 📊 Monitoring & Logs

### Railway/Render
- Xem logs trực tiếp trên dashboard
- Metrics tự động

### VPS
```bash
# Xem logs
docker logs -f lenincard_backend_prod

# Xem resource usage
docker stats

# Restart container
docker-compose -f docker-compose.prod.yml restart
```

---

## 🎯 Khuyến nghị

| Nền tảng | Phù hợp cho | Giá |
|----------|-------------|-----|
| **Railway.app** | Học tập, demo, MVP | Free → $5/tháng |
| **Render.com** | Side project, portfolio | Free (sleep) |
| **Google Cloud Run** | Production nhỏ/vừa | Pay-per-use (~$0-10) |
| **DigitalOcean** | Production ổn định | $5-12/tháng |
| **VPS** | Production lớn, nhiều service | $5-20/tháng |

**Khuyến nghị của tôi:** Bắt đầu với **Railway.app** vì dễ nhất!

---

## 🚀 Quick Deploy với Railway

1. Push code lên GitHub
2. Vào https://railway.app
3. "New Project" → "Deploy from GitHub"
4. Chọn repo
5. Thêm Environment Variable: `GEMINI_API_KEY`
6. Xong! Railway tự build Docker và deploy

URL: `https://your-app.up.railway.app/api/docs`

---

## ✅ Checklist trước khi deploy

- [ ] Đã test API ở local
- [ ] Đã set GEMINI_API_KEY trong environment variables
- [ ] Đã update ALLOWED_ORIGINS nếu có frontend
- [ ] Dockerfile dùng `--workers 4` thay vì `--reload`
- [ ] Đã test health check: `/api/health`
- [ ] File PDF trong thư mục `docs/`
- [ ] .env không bị commit lên Git

---

## 🆘 Troubleshooting

### Container crash ngay sau khi start
```bash
# Xem logs
docker logs lenincard_backend_prod

# Thường do:
# 1. Thiếu GEMINI_API_KEY
# 2. File PDF không tìm thấy
# 3. Port bị chiếm
```

### API không trả về response
- Kiểm tra CORS settings
- Kiểm tra firewall/security group cho port 8000
- Xem logs để debug

### Health check fail
- Đợi 30s sau khi start (RAG init mất thời gian)
- Kiểm tra PDF đã load thành công chưa trong logs

---

Chúc bạn deploy thành công! 🎉
