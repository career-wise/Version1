# ML Interview Analysis System - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the ML Interview Analysis System in production environments. The system is designed for high availability, scalability, and optimal performance.

## Prerequisites

### Hardware Requirements

#### Minimum Requirements (Development)
- **CPU:** 4 cores, 2.5GHz+
- **RAM:** 16GB
- **GPU:** NVIDIA GTX 1060 or equivalent (optional)
- **Storage:** 100GB SSD
- **Network:** 100 Mbps

#### Recommended Requirements (Production)
- **CPU:** 8+ cores, 3.0GHz+
- **RAM:** 32GB+
- **GPU:** NVIDIA RTX 3080 or equivalent
- **Storage:** 500GB NVMe SSD
- **Network:** 1 Gbps+

#### Enterprise Requirements (High Scale)
- **CPU:** 16+ cores, 3.5GHz+
- **RAM:** 64GB+
- **GPU:** NVIDIA A100 or equivalent
- **Storage:** 1TB+ NVMe SSD
- **Network:** 10 Gbps+

### Software Requirements

#### Operating System
- **Linux:** Ubuntu 20.04 LTS or CentOS 8+ (recommended)
- **Windows:** Windows Server 2019+ (supported)
- **macOS:** macOS 11+ (development only)

#### Container Runtime
- **Docker:** 20.10+
- **Docker Compose:** 2.0+
- **Kubernetes:** 1.24+ (for production scaling)

#### GPU Support (Optional)
- **NVIDIA Driver:** 470+
- **CUDA:** 11.8+
- **cuDNN:** 8.6+
- **nvidia-docker2:** Latest

## Quick Start Deployment

### 1. Clone and Setup

```bash
# Clone repository
git clone https://github.com/your-org/interview-analysis-system.git
cd interview-analysis-system

# Create environment file
cp backend/.env.example backend/.env

# Edit configuration
nano backend/.env
```

### 2. Environment Configuration

```bash
# backend/.env
ENVIRONMENT=production
DEBUG=false
MAX_CONCURRENT_SESSIONS=10
ANALYSIS_INTERVAL=1.0
ENABLE_GPU=true

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/interview_db
REDIS_URL=redis://localhost:6379

# ML Configuration
ML_MODEL_PATH=/app/models
ML_DATA_PATH=/app/data
ML_TEMP_PATH=/app/temp

# Monitoring
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3001

# Security
JWT_SECRET_KEY=your-secret-key-here
API_RATE_LIMIT=100
```

### 3. Docker Deployment

```bash
# Build and start services
docker-compose -f backend/app/ml/deployment/docker-compose.ml.yml up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f ml-server
```

### 4. Verify Deployment

```bash
# Health check
curl http://localhost:8080/health

# Test API
curl -X POST http://localhost:8080/session/test-session/start \
  -H "Content-Type: application/json" \
  -d '{"session_id": "test", "user_id": "user1", "interview_type": "job"}'
```

## Production Deployment

### 1. Kubernetes Deployment

#### Create Namespace
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: interview-ml
  labels:
    name: interview-ml
```

#### ML Service Deployment
```yaml
# k8s/ml-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-server
  namespace: interview-ml
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-server
  template:
    metadata:
      labels:
        app: ml-server
    spec:
      containers:
      - name: ml-server
        image: interview-ml:latest
        ports:
        - containerPort: 8001
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
            nvidia.com/gpu: 1
          limits:
            memory: "8Gi"
            cpu: "4"
            nvidia.com/gpu: 1
        livenessProbe:
          httpGet:
            path: /health
            port: 8001
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /health
            port: 8001
          initialDelaySeconds: 30
          periodSeconds: 10
```

#### Service Configuration
```yaml
# k8s/ml-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ml-service
  namespace: interview-ml
spec:
  selector:
    app: ml-server
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8001
  type: ClusterIP
```

#### Horizontal Pod Autoscaler
```yaml
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-server-hpa
  namespace: interview-ml
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-server
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 2. Deploy to Kubernetes

```bash
# Apply configurations
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/ml-service-deployment.yaml
kubectl apply -f k8s/ml-service.yaml
kubectl apply -f k8s/hpa.yaml

# Check deployment status
kubectl get pods -n interview-ml
kubectl get services -n interview-ml

# View logs
kubectl logs -f deployment/ml-server -n interview-ml
```

## Configuration Management

### 1. Environment-Specific Configurations

#### Development Configuration
```python
# config/development.py
ML_CONFIG = {
    'pose': {
        'model_complexity': 0,  # Lite model for faster development
        'min_detection_confidence': 0.5
    },
    'face': {
        'refine_landmarks': False,  # Faster processing
        'min_detection_confidence': 0.5
    },
    'speech': {
        'enable_offline_fallback': True,
        'confidence_threshold': 0.5
    },
    'performance': {
        'max_concurrent_sessions': 5,
        'analysis_interval': 2.0  # Slower for development
    }
}
```

#### Production Configuration
```python
# config/production.py
ML_CONFIG = {
    'pose': {
        'model_complexity': 1,  # Full model for accuracy
        'min_detection_confidence': 0.7
    },
    'face': {
        'refine_landmarks': True,  # Higher accuracy
        'min_detection_confidence': 0.7
    },
    'speech': {
        'enable_offline_fallback': False,
        'confidence_threshold': 0.7
    },
    'performance': {
        'max_concurrent_sessions': 50,
        'analysis_interval': 1.0  # Real-time
    }
}
```

### 2. Model Configuration

```yaml
# config/models.yaml
models:
  pose_estimation:
    name: "mediapipe_pose"
    version: "0.10.7"
    complexity: 1
    performance_target:
      latency_ms: 50
      accuracy: 0.85
      
  face_analysis:
    name: "mediapipe_face_mesh"
    version: "0.10.7"
    refine_landmarks: true
    performance_target:
      latency_ms: 40
      accuracy: 0.88
      
  speech_recognition:
    name: "google_speech_api"
    version: "latest"
    language: "en-US"
    performance_target:
      latency_ms: 200
      accuracy: 0.92
      
  voice_analysis:
    name: "librosa_features"
    version: "0.10.1"
    sample_rate: 16000
    performance_target:
      latency_ms: 60
      accuracy: 0.80
```

## Performance Optimization

### 1. Model Optimization

#### Quantization
```bash
# Convert models to optimized formats
python -m app.ml.optimization.model_optimizer \
  --input-model models/pose_model.pth \
  --output-dir models/optimized/ \
  --techniques quantization,onnx_conversion \
  --target-latency 50
```

#### ONNX Conversion
```python
# Convert PyTorch models to ONNX
import torch

model = torch.load('models/custom_model.pth')
dummy_input = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model,
    dummy_input,
    'models/optimized/model.onnx',
    opset_version=11,
    do_constant_folding=True
)
```

### 2. System Optimization

#### GPU Configuration
```bash
# Check GPU availability
nvidia-smi

# Configure GPU memory growth
export CUDA_VISIBLE_DEVICES=0
export TF_FORCE_GPU_ALLOW_GROWTH=true
```

#### Memory Optimization
```python
# config/optimization.py
MEMORY_CONFIG = {
    'frame_buffer_size': 10,  # Keep last 10 frames
    'audio_buffer_size': 5,   # Keep last 5 audio chunks
    'analysis_buffer_size': 30,  # Keep last 30 analysis results
    'garbage_collection_interval': 60,  # Seconds
    'memory_limit_mb': 6000  # 6GB limit per session
}
```

## Monitoring Setup

### 1. Prometheus Configuration

```bash
# Start monitoring stack
docker-compose -f monitoring/docker-compose.monitoring.yml up -d

# Access Prometheus
open http://localhost:9090

# Access Grafana
open http://localhost:3001
# Login: admin/admin123
```

### 2. Custom Metrics

```python
# Add custom metrics to your application
from prometheus_client import Counter, Histogram, Gauge

# Define metrics
ANALYSIS_REQUESTS = Counter('analysis_requests_total', 'Total analysis requests')
PROCESSING_TIME = Histogram('processing_time_seconds', 'Processing time')
ACTIVE_SESSIONS = Gauge('active_sessions', 'Number of active sessions')
MODEL_ACCURACY = Gauge('model_accuracy', 'Current model accuracy')

# Use in your code
@PROCESSING_TIME.time()
async def process_frame(frame_data):
    ANALYSIS_REQUESTS.inc()
    # ... processing logic
    ACTIVE_SESSIONS.set(len(active_sessions))
```

### 3. Grafana Dashboards

Import the provided dashboard configuration:
```bash
# Import dashboard
curl -X POST http://admin:admin123@localhost:3001/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d @monitoring/grafana/ml-dashboard.json
```

## Troubleshooting

### Common Issues

#### 1. High Memory Usage
**Symptoms:** Out of memory errors, slow processing
**Solutions:**
```bash
# Check memory usage
docker stats

# Reduce buffer sizes
export FRAME_BUFFER_SIZE=5
export ANALYSIS_BUFFER_SIZE=15

# Enable garbage collection
export ENABLE_AGGRESSIVE_GC=true
```

#### 2. GPU Not Detected
**Symptoms:** CUDA errors, falling back to CPU
**Solutions:**
```bash
# Check GPU availability
nvidia-smi

# Verify CUDA installation
python -c "import torch; print(torch.cuda.is_available())"

# Check Docker GPU support
docker run --gpus all nvidia/cuda:11.8-base nvidia-smi
```

#### 3. High Processing Latency
**Symptoms:** Slow real-time feedback, timeouts
**Solutions:**
```bash
# Enable model optimization
export ENABLE_MODEL_OPTIMIZATION=true

# Reduce analysis frequency
export ANALYSIS_INTERVAL=2.0

# Use lighter models
export MODEL_COMPLEXITY=0
```

#### 4. WebSocket Connection Issues
**Symptoms:** Connection drops, real-time updates failing
**Solutions:**
```bash
# Check WebSocket configuration
curl -i -N -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" \
  -H "Sec-WebSocket-Key: test" \
  http://localhost:8080/session/test/ws

# Increase timeouts
export WEBSOCKET_TIMEOUT=300
export WEBSOCKET_PING_INTERVAL=30
```

### Performance Tuning

#### 1. CPU Optimization
```bash
# Set CPU affinity
taskset -c 0-3 python -m app.ml.deployment.model_server

# Optimize thread count
export OMP_NUM_THREADS=4
export MKL_NUM_THREADS=4
```

#### 2. Memory Optimization
```bash
# Enable memory profiling
pip install memory-profiler
python -m memory_profiler app/ml/core/multimodal_analyzer.py

# Optimize garbage collection
export PYTHONHASHSEED=0
export MALLOC_TRIM_THRESHOLD_=100000
```

#### 3. Network Optimization
```bash
# Optimize network settings
echo 'net.core.rmem_max = 134217728' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 134217728' >> /etc/sysctl.conf
sysctl -p
```

## Security Hardening

### 1. Container Security

```dockerfile
# Use non-root user
FROM nvidia/cuda:11.8-devel-ubuntu20.04
RUN useradd -m -u 1000 mluser
USER mluser

# Minimal attack surface
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.9 \
    && rm -rf /var/lib/apt/lists/*

# Read-only filesystem
docker run --read-only --tmpfs /tmp --tmpfs /var/tmp interview-ml:latest
```

### 2. Network Security

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ml-service-network-policy
  namespace: interview-ml
spec:
  podSelector:
    matchLabels:
      app: ml-server
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: frontend
    ports:
    - protocol: TCP
      port: 8001
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
```

### 3. Secrets Management

```bash
# Create secrets
kubectl create secret generic ml-secrets \
  --from-literal=jwt-secret=your-jwt-secret \
  --from-literal=db-password=your-db-password \
  -n interview-ml

# Use in deployment
env:
- name: JWT_SECRET_KEY
  valueFrom:
    secretKeyRef:
      name: ml-secrets
      key: jwt-secret
```

## Scaling Strategies

### 1. Horizontal Scaling

#### Auto-scaling Configuration
```yaml
# k8s/hpa-advanced.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-server-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-server
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: active_sessions_per_pod
      target:
        type: AverageValue
        averageValue: "5"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```

### 2. Vertical Scaling

#### Resource Optimization
```yaml
# k8s/vertical-pod-autoscaler.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: ml-server-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-server
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: ml-server
      maxAllowed:
        cpu: 8
        memory: 16Gi
      minAllowed:
        cpu: 1
        memory: 2Gi
```

### 3. Load Balancing

#### NGINX Configuration
```nginx
# nginx/nginx-production.conf
upstream ml_backend {
    least_conn;
    server ml-server-1:8001 max_fails=3 fail_timeout=30s weight=1;
    server ml-server-2:8001 max_fails=3 fail_timeout=30s weight=1;
    server ml-server-3:8001 max_fails=3 fail_timeout=30s weight=1;
    
    # Health check
    keepalive 32;
    keepalive_requests 100;
    keepalive_timeout 60s;
}

server {
    listen 80;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=websocket:10m rate=5r/s;
    
    location / {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://ml_backend;
        
        # Optimization headers
        proxy_set_header Connection "";
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_cache off;
        
        # Timeouts
        proxy_connect_timeout 30s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    location /ws {
        limit_req zone=websocket burst=10 nodelay;
        proxy_pass http://ml_backend;
        
        # WebSocket headers
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # WebSocket timeouts
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

## Backup and Recovery

### 1. Data Backup

```bash
# Database backup
pg_dump interview_db > backup/db_$(date +%Y%m%d_%H%M%S).sql

# Model backup
tar -czf backup/models_$(date +%Y%m%d_%H%M%S).tar.gz models/

# Configuration backup
kubectl get configmaps -n interview-ml -o yaml > backup/configmaps.yaml
kubectl get secrets -n interview-ml -o yaml > backup/secrets.yaml
```

### 2. Disaster Recovery

```bash
# Restore database
psql interview_db < backup/db_20240101_120000.sql

# Restore models
tar -xzf backup/models_20240101_120000.tar.gz

# Restore Kubernetes resources
kubectl apply -f backup/configmaps.yaml
kubectl apply -f backup/secrets.yaml
```

## Maintenance Procedures

### 1. Model Updates

```bash
# Update models with zero downtime
kubectl set image deployment/ml-server \
  ml-server=interview-ml:v2.0.0 \
  -n interview-ml

# Monitor rollout
kubectl rollout status deployment/ml-server -n interview-ml

# Rollback if needed
kubectl rollout undo deployment/ml-server -n interview-ml
```

### 2. System Maintenance

```bash
# Drain node for maintenance
kubectl drain node-1 --ignore-daemonsets --delete-emptydir-data

# Update system packages
apt update && apt upgrade -y

# Restart services
kubectl uncordon node-1
```

### 3. Performance Monitoring

```bash
# Check system metrics
kubectl top nodes
kubectl top pods -n interview-ml

# View detailed metrics
curl http://localhost:9090/api/v1/query?query=cpu_usage_percent

# Generate performance report
python scripts/generate_performance_report.py --period 7d
```

## Cost Optimization

### 1. Resource Right-sizing

```bash
# Analyze resource usage
kubectl describe hpa ml-server-hpa -n interview-ml

# Adjust resource requests/limits based on actual usage
kubectl patch deployment ml-server -n interview-ml -p '
{
  "spec": {
    "template": {
      "spec": {
        "containers": [{
          "name": "ml-server",
          "resources": {
            "requests": {"cpu": "1.5", "memory": "3Gi"},
            "limits": {"cpu": "3", "memory": "6Gi"}
          }
        }]
      }
    }
  }
}'
```

### 2. Spot Instance Usage

```yaml
# k8s/spot-instance-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-server-spot
spec:
  replicas: 2
  template:
    spec:
      nodeSelector:
        node-type: spot
      tolerations:
      - key: spot-instance
        operator: Equal
        value: "true"
        effect: NoSchedule
```

## Conclusion

This deployment guide provides comprehensive instructions for deploying the ML Interview Analysis System in various environments. Follow the appropriate sections based on your deployment needs:

- **Development:** Use Docker Compose for quick setup
- **Production:** Use Kubernetes for scalability and reliability
- **Enterprise:** Add advanced monitoring, security, and optimization

Regular monitoring and maintenance ensure optimal performance and user experience. Refer to the troubleshooting section for common issues and solutions.

For additional support, consult the API documentation and system architecture overview.