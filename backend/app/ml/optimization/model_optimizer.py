"""
Model Optimization and Acceleration
Performance optimization techniques for real-time inference
"""

import torch
import torch.nn as nn
import onnx
import onnxruntime as ort
import numpy as np
from typing import Dict, List, Optional, Tuple
import time
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class ModelOptimizer:
    """
    Comprehensive model optimization for production deployment
    Includes quantization, pruning, and acceleration techniques
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.optimization_techniques = config.get('techniques', [
            'quantization', 'onnx_conversion', 'tensorrt_optimization'
        ])
        
    def optimize_model(self, model_path: str, optimization_config: Dict) -> Dict:
        """
        Apply comprehensive optimization to a model
        
        Args:
            model_path: Path to the original model
            optimization_config: Optimization configuration
            
        Returns:
            Optimization results and performance metrics
        """
        results = {
            'original_model': model_path,
            'optimized_models': {},
            'performance_comparison': {},
            'recommendations': []
        }
        
        try:
            # Load original model
            original_model = self._load_model(model_path)
            
            # Benchmark original model
            original_metrics = self._benchmark_model(original_model, "original")
            results['performance_comparison']['original'] = original_metrics
            
            # Apply optimizations
            for technique in self.optimization_techniques:
                if technique in optimization_config: 
                    optimized_model, optimized_path = self._apply_optimization(
                        original_model, technique, optimization_config[technique]
                    )
                    
                    if optimized_model:
                        # Benchmark optimized model
                        optimized_metrics = self._benchmark_model(optimized_model, technique)
                        results['performance_comparison'][technique] = optimized_metrics
                        results['optimized_models'][technique] = optimized_path
                        
                        # Calculate improvement
                        improvement = self._calculate_improvement(original_metrics, optimized_metrics)
                        results['performance_comparison'][f'{technique}_improvement'] = improvement
            
            # Generate recommendations
            results['recommendations'] = self._generate_optimization_recommendations(
                results['performance_comparison']
            )
            
            return results
            
        except Exception as e:
            logger.error(f"Model optimization failed: {e}")
            return {"status": "error", "message": str(e)}
    
    def _apply_optimization(self, model, technique: str, config: Dict) -> Tuple[Optional[object], Optional[str]]:
        """Apply specific optimization technique"""
        
        if technique == 'quantization':
            return self._apply_quantization(model, config)
        elif technique == 'onnx_conversion':
            return self._convert_to_onnx(model, config)
        elif technique == 'tensorrt_optimization':
            return self._optimize_with_tensorrt(model, config)
        elif technique == 'pruning':
            return self._apply_pruning(model, config)
        else:
            logger.warning(f"Unknown optimization technique: {technique}")
            return None, None
    
    def _apply_quantization(self, model, config: Dict) -> Tuple[Optional[object], Optional[str]]:
        """Apply model quantization"""
        try:
            if isinstance(model, torch.nn.Module):
                # PyTorch quantization
                model.eval()
                
                # Post-training quantization
                quantized_model = torch.quantization.quantize_dynamic(
                    model, 
                    {torch.nn.Linear, torch.nn.Conv2d}, 
                    dtype=torch.qint8
                )
                
                # Save quantized model
                output_path = config.get('output_path', 'models/quantized_model.pth')
                torch.save(quantized_model.state_dict(), output_path)
                
                return quantized_model, output_path
            
        except Exception as e:
            logger.error(f"Quantization failed: {e}")
            return None, None
    
    def _convert_to_onnx(self, model, config: Dict) -> Tuple[Optional[object], Optional[str]]:
        """Convert model to ONNX format"""
        try:
            if isinstance(model, torch.nn.Module):
                model.eval()
                
                # Create dummy input
                input_shape = config.get('input_shape', (1, 3, 224, 224))
                dummy_input = torch.randn(input_shape)
                
                # Export to ONNX
                output_path = config.get('output_path', 'models/model.onnx')
                torch.onnx.export(
                    model,
                    dummy_input,
                    output_path,
                    export_params=True,
                    opset_version=11,
                    do_constant_folding=True,
                    input_names=['input'],
                    output_names=['output'],
                    dynamic_axes={
                        'input': {0: 'batch_size'},
                        'output': {0: 'batch_size'}
                    }
                )
                
                # Load ONNX model for inference
                onnx_session = ort.InferenceSession(
                    output_path,
                    providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
                )
                
                return onnx_session, output_path
                
        except Exception as e:
            logger.error(f"ONNX conversion failed: {e}")
            return None, None
    
    def _optimize_with_tensorrt(self, model, config: Dict) -> Tuple[Optional[object], Optional[str]]:
        """Optimize model with TensorRT"""
        try:
            # This would implement TensorRT optimization
            # Requires TensorRT installation and ONNX model
            logger.info("TensorRT optimization not implemented in this demo")
            return None, None
            
        except Exception as e:
            logger.error(f"TensorRT optimization failed: {e}")
            return None, None
    
    def _apply_pruning(self, model, config: Dict) -> Tuple[Optional[object], Optional[str]]:
        """Apply model pruning"""
        try:
            if isinstance(model, torch.nn.Module):
                import torch.nn.utils.prune as prune
                
                # Apply structured pruning
                for name, module in model.named_modules():
                    if isinstance(module, torch.nn.Conv2d):
                        prune.l1_unstructured(module, name='weight', amount=0.2)
                    elif isinstance(module, torch.nn.Linear):
                        prune.l1_unstructured(module, name='weight', amount=0.4)
                
                # Make pruning permanent
                for name, module in model.named_modules():
                    if isinstance(module, (torch.nn.Conv2d, torch.nn.Linear)):
                        prune.remove(module, 'weight')
                
                # Save pruned model
                output_path = config.get('output_path', 'models/pruned_model.pth')
                torch.save(model.state_dict(), output_path)
                
                return model, output_path
                
        except Exception as e:
            logger.error(f"Pruning failed: {e}")
            return None, None
    
    def _benchmark_model(self, model, model_name: str) -> Dict:
        """Benchmark model performance"""
        metrics = {
            'model_name': model_name,
            'inference_times': [],
            'memory_usage': 0,
            'model_size_mb': 0,
            'accuracy_metrics': {}
        }
        
        try:
            # Measure inference time
            dummy_input = self._create_dummy_input(model)
            
            # Warm up
            for _ in range(10):
                _ = self._run_inference(model, dummy_input)
            
            # Benchmark
            inference_times = []
            for _ in range(100):
                start_time = time.time()
                _ = self._run_inference(model, dummy_input)
                end_time = time.time()
                inference_times.append((end_time - start_time) * 1000)  # Convert to ms
            
            metrics['inference_times'] = inference_times
            metrics['avg_inference_time_ms'] = np.mean(inference_times)
            metrics['p95_inference_time_ms'] = np.percentile(inference_times, 95)
            metrics['p99_inference_time_ms'] = np.percentile(inference_times, 99)
            
            # Measure model size
            if hasattr(model, 'state_dict'):
                # PyTorch model
                model_size = sum(p.numel() * p.element_size() for p in model.parameters())
                metrics['model_size_mb'] = model_size / (1024 * 1024)
            
            # Memory usage (simplified)
            import psutil
            process = psutil.Process()
            metrics['memory_usage'] = process.memory_info().rss / (1024 * 1024)  # MB
            
        except Exception as e:
            logger.error(f"Benchmarking failed for {model_name}: {e}")
            metrics['error'] = str(e)
        
        return metrics
    
    def _create_dummy_input(self, model) -> object:
        """Create dummy input for benchmarking"""
        # This would create appropriate dummy input based on model type
        # For now, return a generic tensor
        return torch.randn(1, 3, 224, 224)
    
    def _run_inference(self, model, input_data) -> object:
        """Run model inference"""
        if isinstance(model, torch.nn.Module):
            with torch.no_grad():
                return model(input_data)
        elif isinstance(model, ort.InferenceSession):
            # ONNX Runtime inference
            input_name = model.get_inputs()[0].name
            return model.run(None, {input_name: input_data.numpy()})
        else:
            # Generic inference
            return model(input_data)
    
    def _calculate_improvement(self, original_metrics: Dict, optimized_metrics: Dict) -> Dict:
        """Calculate improvement metrics"""
        improvement = {}
        
        # Inference time improvement
        if 'avg_inference_time_ms' in both metrics:
            original_time = original_metrics['avg_inference_time_ms']
            optimized_time = optimized_metrics['avg_inference_time_ms']
            improvement['inference_speedup'] = original_time / optimized_time
            improvement['inference_time_reduction_percent'] = (
                (original_time - optimized_time) / original_time * 100
            )
        
        # Model size reduction
        if 'model_size_mb' in both metrics:
            original_size = original_metrics['model_size_mb']
            optimized_size = optimized_metrics['model_size_mb']
            improvement['size_reduction_percent'] = (
                (original_size - optimized_size) / original_size * 100
            )
        
        # Memory usage improvement
        if 'memory_usage' in both metrics:
            original_memory = original_metrics['memory_usage']
            optimized_memory = optimized_metrics['memory_usage']
            improvement['memory_reduction_percent'] = (
                (original_memory - optimized_memory) / original_memory * 100
            )
        
        return improvement
    
    def _generate_optimization_recommendations(self, performance_comparison: Dict) -> List[str]:
        """Generate optimization recommendations"""
        recommendations = []
        
        # Analyze performance improvements
        best_technique = None
        best_speedup = 0
        
        for technique, metrics in performance_comparison.items():
            if technique.endswith('_improvement'):
                speedup = metrics.get('inference_speedup', 0)
                if speedup > best_speedup:
                    best_speedup = speedup
                    best_technique = technique.replace('_improvement', '')
        
        if best_technique:
            recommendations.append(f"Use {best_technique} for best performance ({best_speedup:.2f}x speedup)")
        
        # Check if further optimization is needed
        original_metrics = performance_comparison.get('original', {})
        avg_inference_time = original_metrics.get('avg_inference_time_ms', 0)
        
        if avg_inference_time > 100:
            recommendations.append("Consider additional optimization - target <100ms inference time")
        
        if avg_inference_time > 200:
            recommendations.append("Critical: Inference time too high for real-time use")
        
        # Memory recommendations
        memory_usage = original_metrics.get('memory_usage', 0)
        if memory_usage > 4000:  # 4GB
            recommendations.append("High memory usage - consider model compression")
        
        return recommendations
    
    def create_optimization_pipeline(self, models_config: Dict) -> Dict:
        """Create complete optimization pipeline for all models"""
        pipeline = {
            'stages': [],
            'estimated_time': 0,
            'expected_improvements': {}
        }
        
        # Define optimization stages
        stages = [
            {
                'name': 'Model Analysis',
                'description': 'Analyze model architecture and identify optimization opportunities',
                'estimated_time_minutes': 10,
                'techniques': ['profiling', 'bottleneck_analysis']
            },
            {
                'name': 'Quantization',
                'description': 'Apply dynamic and static quantization',
                'estimated_time_minutes': 30,
                'techniques': ['dynamic_quantization', 'static_quantization']
            },
            {
                'name': 'ONNX Conversion',
                'description': 'Convert models to ONNX format for cross-platform deployment',
                'estimated_time_minutes': 20,
                'techniques': ['onnx_export', 'onnx_optimization']
            },
            {
                'name': 'Hardware Acceleration',
                'description': 'Optimize for specific hardware (GPU, CPU)',
                'estimated_time_minutes': 45,
                'techniques': ['tensorrt_optimization', 'openvino_optimization']
            },
            {
                'name': 'Validation',
                'description': 'Validate optimized models maintain accuracy',
                'estimated_time_minutes': 25,
                'techniques': ['accuracy_validation', 'performance_testing']
            }
        ]
        
        pipeline['stages'] = stages
        pipeline['estimated_time'] = sum(stage['estimated_time_minutes'] for stage in stages)
        
        # Expected improvements (based on typical results)
        pipeline['expected_improvements'] = {
            'inference_speedup': '2-5x',
            'memory_reduction': '30-60%',
            'model_size_reduction': '50-75%',
            'accuracy_retention': '>95%'
        }
        
        return pipeline

class RealTimeOptimizer:
    """
    Real-time optimization for live inference
    Dynamic optimization based on current system load
    """
    
    def __init__(self):
        self.current_load = 0
        self.optimization_level = 'balanced'
        self.adaptive_settings = {
            'low_load': {
                'model_complexity': 'high',
                'analysis_frequency': 1.0,
                'batch_size': 1
            },
            'medium_load': {
                'model_complexity': 'medium',
                'analysis_frequency': 1.5,
                'batch_size': 2
            },
            'high_load': {
                'model_complexity': 'low',
                'analysis_frequency': 2.0,
                'batch_size': 4
            }
        }
    
    def adapt_to_load(self, cpu_usage: float, memory_usage: float, 
                     active_sessions: int) -> Dict:
        """Adapt optimization settings based on current system load"""
        
        # Calculate overall load score
        load_score = (cpu_usage + memory_usage) / 2 + (active_sessions * 5)
        
        # Determine optimization level
        if load_score < 40:
            self.optimization_level = 'low_load'
        elif load_score < 70:
            self.optimization_level = 'medium_load'
        else:
            self.optimization_level = 'high_load'
        
        # Get adaptive settings
        settings = self.adaptive_settings[self.optimization_level]
        
        return {
            'optimization_level': self.optimization_level,
            'load_score': load_score,
            'adaptive_settings': settings,
            'recommendations': self._get_load_recommendations(load_score)
        }
    
    def _get_load_recommendations(self, load_score: float) -> List[str]:
        """Get recommendations based on current load"""
        recommendations = []
        
        if load_score > 80:
            recommendations.extend([
                "Consider scaling horizontally (add more instances)",
                "Reduce analysis frequency to maintain real-time performance",
                "Use lower complexity models temporarily"
            ])
        elif load_score > 60:
            recommendations.extend([
                "Monitor performance closely",
                "Consider optimizing models further",
                "Prepare for potential scaling"
            ])
        else:
            recommendations.append("System running optimally")
        
        return recommendations

# Optimization utilities
def create_optimization_config() -> Dict:
    """Create default optimization configuration"""
    return {
        'quantization': {
            'output_path': 'models/quantized/',
            'dtype': 'int8',
            'calibration_dataset_size': 100
        },
        'onnx_conversion': {
            'output_path': 'models/onnx/',
            'opset_version': 11,
            'optimize_for_inference': True
        },
        'tensorrt_optimization': {
            'output_path': 'models/tensorrt/',
            'precision': 'fp16',
            'max_workspace_size': 1 << 30  # 1GB
        },
        'pruning': {
            'output_path': 'models/pruned/',
            'sparsity': 0.3,
            'structured': False
        }
    }

def benchmark_optimization_techniques(model_path: str) -> Dict:
    """Benchmark all available optimization techniques"""
    
    config = create_optimization_config()
    optimizer = ModelOptimizer({'techniques': list(config.keys())})
    
    results = optimizer.optimize_model(model_path, config)
    
    # Generate summary report
    summary = {
        'optimization_summary': results,
        'best_technique': None,
        'production_recommendation': None
    }
    
    # Find best technique
    best_speedup = 0
    best_technique = None
    
    for technique, metrics in results['performance_comparison'].items():
        if technique.endswith('_improvement'):
            speedup = metrics.get('inference_speedup', 0)
            if speedup > best_speedup:
                best_speedup = speedup
                best_technique = technique.replace('_improvement', '')
    
    summary['best_technique'] = best_technique
    summary['best_speedup'] = best_speedup
    
    # Production recommendation
    if best_speedup >= 3:
        summary['production_recommendation'] = f"Deploy with {best_technique} optimization"
    elif best_speedup >= 2:
        summary['production_recommendation'] = f"Consider {best_technique} optimization"
    else:
        summary['production_recommendation'] = "Evaluate hardware upgrade options"
    
    return summary

if __name__ == "__main__":
    # Example optimization run
    model_path = "models/interview_analyzer.pth"
    results = benchmark_optimization_techniques(model_path)
    
    print("Optimization Results:")
    print(f"Best technique: {results['best_technique']}")
    print(f"Best speedup: {results['best_speedup']:.2f}x")
    print(f"Recommendation: {results['production_recommendation']}")