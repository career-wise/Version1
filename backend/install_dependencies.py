#!/usr/bin/env python3
"""
Simplified script to install ML dependencies for CareerWise
"""

import subprocess
import sys
import platform
import os

def run_command(command, ignore_errors=False):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, 
                              capture_output=True, text=True)
        print(f"✅ {command}")
        return True
    except subprocess.CalledProcessError as e:
        if not ignore_errors:
            print(f"❌ {command}")
            print(f"Error: {e.stderr}")
        return False

def install_core_dependencies():
    """Install core ML dependencies in the right order"""
    print("🐍 Installing core ML dependencies...")
    
    # Install in specific order to avoid conflicts
    core_packages = [
        "numpy==1.24.3",
        "scipy==1.11.4", 
        "Pillow==10.1.0",
        "opencv-python==4.8.1.78",
        "mediapipe==0.10.21",  # Updated to available version
        "scikit-learn==1.3.2"
    ]
    
    for package in core_packages:
        cmd = f"{sys.executable} -m pip install {package}"
        print(f"📦 Installing {package}...")
        if not run_command(cmd):
            print(f"⚠️ Failed to install {package}, continuing...")

def install_audio_dependencies():
    """Install audio processing dependencies"""
    print("\n🎵 Installing audio dependencies...")
    
    audio_packages = [
        "librosa==0.10.1",
        "pydub==0.25.1", 
        "SpeechRecognition==3.10.0"
    ]
    
    # Try to install PyAudio (may fail on some systems)
    print("📦 Installing PyAudio...")
    if not run_command(f"{sys.executable} -m pip install pyaudio==0.2.11", ignore_errors=True):
        print("⚠️ PyAudio installation failed. This is common on some systems.")
        print("💡 For Windows: pip install pipwin && pipwin install pyaudio")
        print("💡 For macOS: brew install portaudio && pip install pyaudio")
        print("💡 For Linux: sudo apt-get install portaudio19-dev && pip install pyaudio")
    
    for package in audio_packages:
        cmd = f"{sys.executable} -m pip install {package}"
        print(f"📦 Installing {package}...")
        run_command(cmd, ignore_errors=True)

def install_optional_dependencies():
    """Install optional ML frameworks"""
    print("\n🧠 Installing optional ML frameworks...")
    
    # Try CPU-only PyTorch first (smaller download)
    print("📦 Installing PyTorch (CPU)...")
    pytorch_cmd = f"{sys.executable} -m pip install torch==2.1.1+cpu torchvision==0.16.1+cpu torchaudio==2.1.1+cpu --index-url https://download.pytorch.org/whl/cpu"
    
    if not run_command(pytorch_cmd, ignore_errors=True):
        print("⚠️ CPU-only PyTorch failed, trying regular PyTorch...")
        fallback_cmd = f"{sys.executable} -m pip install torch==2.1.1 torchvision==0.16.1 torchaudio==2.1.1"
        run_command(fallback_cmd, ignore_errors=True)
    
    # Install other optional packages
    optional_packages = [
        "websockets==12.0",
        "matplotlib==3.8.2"
    ]
    
    for package in optional_packages:
        cmd = f"{sys.executable} -m pip install {package}"
        print(f"📦 Installing {package}...")
        run_command(cmd, ignore_errors=True)

def verify_installation():
    """Verify that key packages are installed correctly"""
    print("\n🔍 Verifying installation...")
    
    test_imports = [
        ("cv2", "OpenCV"),
        ("mediapipe", "MediaPipe"), 
        ("numpy", "NumPy"),
        ("scipy", "SciPy"),
        ("sklearn", "Scikit-learn")
    ]
    
    # Optional imports
    optional_imports = [
        ("librosa", "Librosa"),
        ("speech_recognition", "SpeechRecognition"),
        ("pydub", "PyDub"),
        ("torch", "PyTorch")
    ]
    
    # Test core imports
    core_success = True
    for module, name in test_imports:
        try:
            __import__(module)
            print(f"✅ {name}")
        except ImportError as e:
            print(f"❌ {name}: {e}")
            core_success = False
    
    # Test optional imports
    print("\nOptional packages:")
    for module, name in optional_imports:
        try:
            __import__(module)
            print(f"✅ {name}")
        except ImportError:
            print(f"⚠️ {name} (optional)")
    
    return core_success

def main():
    """Main installation function"""
    print("🚀 CareerWise ML Dependencies Installer")
    print("=" * 50)
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        sys.exit(1)
    
    print(f"✅ Python {sys.version}")
    
    # Upgrade pip first
    print("📦 Upgrading pip...")
    run_command(f"{sys.executable} -m pip install --upgrade pip", ignore_errors=True)
    
    # Install dependencies in order
    install_core_dependencies()
    install_audio_dependencies() 
    install_optional_dependencies()
    
    # Verify installation
    print("\n" + "="*50)
    if verify_installation():
        print("\n🎉 Core ML dependencies installed successfully!")
        print("\n🎯 You can now use ML-powered interview analysis!")
        print("\nNext steps:")
        print("1. Start your FastAPI server: uvicorn app.main:app --reload")
        print("2. Test the ML analysis endpoints")
        print("3. Try the interview preparation feature in the frontend")
    else:
        print("\n⚠️ Some core dependencies failed to install.")
        print("Please check the error messages above.")
        
    print("\n💡 If you encounter issues:")
    print("- Try installing packages individually")
    print("- Check your Python environment")
    print("- Ensure you have the latest pip version")

if __name__ == "__main__":
    main()