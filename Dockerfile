FROM python:3.10-slim

# Install system dependencies needed for OpenCV, FFmpeg, and Git
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6 \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python requirements
COPY backend/DeOldify/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source files
COPY . .

# Hugging Face Spaces / default web container port
ENV PORT=7860
ENV PYTHONPATH=/app/backend/DeOldify

# Run with a reasonable timeout for large image uploads/processing
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--chdir", "backend", "app:app", "--timeout", "120"]
