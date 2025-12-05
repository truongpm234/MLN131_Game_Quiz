from backend.api.main import app

# Vercel cần biến 'app' được expose ở đây để chạy serverless function
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)