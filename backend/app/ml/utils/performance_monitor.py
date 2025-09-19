"""
Performance Monitoring and Optimization Utilities
Tracks system performance and provides optimization insights
"""

import time
import psutil
import threading
from typing import Dict, List
from dataclasses import dataclass
from collections import deque
import numpy as np

@dataclass
class PerformanceMetrics:
    """System performance metrics"""
    cpu_usage: float
    memory_usage: float
    gpu_usage: float
    processing_latency: float
    throughput: float
    error_rate: float

class PerformanceMonitor:
    """
    Real-time performance monitoring for ML pipeline
    Tracks resource usage and processing efficiency
    """
    
    def __init__(self, window_size: int = 100):
        self.window_size = window_size
        
        # Metrics storage
        self.cpu_history = deque(maxlen=window_size)
        self.memory_history = deque(maxlen=window_size)
        self.latency_history = deque(maxlen=window_size)
        self.throughput_history = deque(maxlen=window_size)
        self.error_history = deque(maxlen=window_size)
        
        # Timing
        self.last_update = time.time()
        self.frame_count = 0
        self.error_count = 0
        
        # Monitoring thread
        self.monitoring_active = False
        self.monitor_thread = None
        
    def start_monitoring(self):
        """Start background performance monitoring"""
        self.monitoring_active = True
        self.monitor_thread = threading.Thread(target=self._monitor_loop)
        self.monitor_thread.daemon = True
        self.monitor_thread.start()
    
    def stop_monitoring(self):
        """Stop background monitoring"""
        self.monitoring_active = False
        if self.monitor_thread:
            self.monitor_thread.join()
    
    def _monitor_loop(self):
        """Background monitoring loop"""
        while self.monitoring_active:
            try:
                # Collect system metrics
                cpu_percent = psutil.cpu_percent(interval=1)
                memory_percent = psutil.virtual_memory().percent
                
                # Store metrics
                self.cpu_history.append(cpu_percent)
                self.memory_history.append(memory_percent)
                
                time.sleep(1)
                
            except Exception as e:
                print(f"Monitoring error: {e}")
                time.sleep(1)
    
    def record_processing_time(self, start_time: float, end_time: float):
        """Record processing latency"""
        latency = (end_time - start_time) * 1000  # Convert to milliseconds
        self.latency_history.append(latency)
        self.frame_count += 1
        
        # Calculate throughput
        current_time = time.time()
        if current_time - self.last_update >= 1.0:  # Update every second
            throughput = self.frame_count / (current_time - self.last_update)
            self.throughput_history.append(throughput)
            self.frame_count = 0
            self.last_update = current_time
    
    def record_error(self):
        """Record processing error"""
        self.error_count += 1
        current_time = time.time()
        
        # Calculate error rate over last minute
        if current_time - self.last_update >= 60:
            error_rate = self.error_count / 60  # Errors per second
            self.error_history.append(error_rate)
            self.error_count = 0
    
    def get_metrics(self) -> PerformanceMetrics:
        """Get current performance metrics"""
        return PerformanceMetrics(
            cpu_usage=np.mean(list(self.cpu_history)) if self.cpu_history else 0,
            memory_usage=np.mean(list(self.memory_history)) if self.memory_history else 0,
            gpu_usage=self._get_gpu_usage(),
            processing_latency=np.mean(list(self.latency_history)) if self.latency_history else 0,
            throughput=np.mean(list(self.throughput_history)) if self.throughput_history else 0,
            error_rate=np.mean(list(self.error_history)) if self.error_history else 0
        )
    
    def _get_gpu_usage(self) -> float:
        """Get GPU usage (placeholder - would use nvidia-ml-py in production)"""
        try:
            # This would use nvidia-ml-py for actual GPU monitoring
            # For now, return 0 as placeholder
            return 0.0
        except:
            return 0.0
    
    def get_optimization_suggestions(self) -> List[str]:
        """Get performance optimization suggestions"""
        suggestions = []
        metrics = self.get_metrics()
        
        if metrics.cpu_usage > 80:
            suggestions.append("High CPU usage detected - consider reducing analysis frequency")
        
        if metrics.memory_usage > 85:
            suggestions.append("High memory usage - consider reducing buffer sizes")
        
        if metrics.processing_latency > 200:  # 200ms threshold
            suggestions.append("High processing latency - consider model optimization")
        
        if metrics.throughput < 10:  # Less than 10 FPS
            suggestions.append("Low throughput - consider reducing model complexity")
        
        if metrics.error_rate > 0.1:  # More than 0.1 errors per second
            suggestions.append("High error rate detected - check input data quality")
        
        return suggestions
    
    def export_metrics(self) -> Dict:
        """Export all collected metrics for analysis"""
        return {
            'cpu_history': list(self.cpu_history),
            'memory_history': list(self.memory_history),
            'latency_history': list(self.latency_history),
            'throughput_history': list(self.throughput_history),
            'error_history': list(self.error_history),
            'current_metrics': self.get_metrics().__dict__,
            'optimization_suggestions': self.get_optimization_suggestions()
        }