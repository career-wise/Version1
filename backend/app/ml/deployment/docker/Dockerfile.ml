# Multi-stage Docker build for ML Interview Analysis Service
# Optimized for production deployment with GPU support

# Stage 1: Base image with system dependencies
FROM nvidia/cuda:11.8-devel-ubuntu20.04 as base

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3.9-dev \
    python3-pip \
    python3.9-venv \
    ffmpeg \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libglib2.0-0 \
    libgtk-3-0 \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev \
    libv4l-dev \
    libxvidcore-dev \
    libx264-dev \
    libjpeg-dev \
    libpng-dev \
    libtiff-dev \
    libatlas-base-dev \
    gfortran \
    wget \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 mluser && \
    mkdir -p /app && \
    chown -R mluser:mluser /app

# Stage 2: Python environment setup
FROM base as python-env

USER mluser
WORKDIR /app

# Create virtual environment
RUN python3.9 -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Upgrade pip and install wheel
RUN pip install --upgrade pip wheel setuptools

# Install PyTorch with CUDA support
RUN pip install torch==2.1.0 torchvision==0.16.0 torchaudio==0.16.0 --index-url https://download.pytorch.org/whl/cu118

# Stage 3: ML dependencies
FROM python-env as ml-deps

# Copy requirements file
COPY backend/requirements-ml.txt /app/requirements-ml.txt

# Install ML dependencies
RUN pip install -r requirements-ml.txt

# Install additional optimizations
RUN pip install \
    onnxruntime-gpu==1.16.3 \
    tensorrt==8.6.1 \
    nvidia-ml-py==12.535.108

# Stage 4: Application code
FROM ml-deps as app

# Copy application code
COPY backend/app /app/app
COPY backend/app/ml /app/app/ml

# Create necessary directories
RUN mkdir -p /app/data /app/models /app/logs /app/temp

# Download and cache ML models
RUN python3.9 -c "
import mediapipe as mp
# Initialize MediaPipe models to download them
mp.solutions.pose.Pose()
mp.solutions.face_mesh.FaceMesh()
print('MediaPipe models cached successfully')
"

# Set environment variables
ENV PYTHONPATH="/app:$PYTHONPATH"
ENV CUDA_VISIBLE_DEVICES="0"
ENV OMP_NUM_THREADS="4"
ENV MKL_NUM_THREADS="4"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Expose port
EXPOSE 8001

# Run application
CMD ["python3.9", "-m", "app.ml.deployment.model_server"]