#!/usr/bin/env python3
"""
Fixed script to install ML dependencies for CareerWise interview analysis
"""

import subprocess
import sys
import platform
import os
from typing import Dict  # Added missing import

def run_command(command, ignore_errors=False):
    """Run a shell command and return the result"""
    try:
        print(f"🔄 {command}")
        result = subprocess.run(command, shell=True, check=True, 
                              capture_output=True, text=True)
        print(f"✅ {command}")
        return True
    except subprocess.CalledProcessError as e:
        if not ignore_errors:
            print(f"❌ {command}")
            print(f"Error: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    print("🐍 Checking Python version...")
    
    if sys.version_info < (3, 8):  # Fixed: Use tuple instead of float
        print("❌ Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        return False
    
    print(f"✅ Python {sys.version}")
    return True

def upgrade_build_tools():
    """Upgrade pip, setuptools, and wheel first"""
    print("\n🔧 Upgrading build tools...")
    
    build_tools = [
        "pip>=23.0.0",
        "setuptools>=65.0.0", 
        "wheel>=0.37.0"
    ]
    
    for tool in build_tools:
        cmd = f"{sys.executable} -m pip install --upgrade {tool}"
        if not run_command(cmd, ignore_errors=True):
            print(f"⚠️ Failed to upgrade {tool}, continuing...")
    
    return True

def install_system_dependencies():
    """Install system-level dependencies based on OS"""
    system = platform.system().lower()
    print(f"\n🔧 Installing system dependencies for {system}...")
    
    if system == "linux":
        print("📋 For Ubuntu/Debian, run these commands manually if needed:")
        print("   sudo apt-get update")
        print("   sudo apt-get install -y python3-dev build-essential")
        print("   sudo apt-get install -y libportaudio2 portaudio19-dev")
        print("   sudo apt-get install -y ffmpeg libsndfile1-dev")
        print("   sudo apt-get install -y cmake pkg-config")
        
    elif system == "darwin":  # macOS
        print("📋 For macOS, install with Homebrew if needed:")
        print("   brew install portaudio ffmpeg cmake pkg-config")
        
    elif system == "windows":
        print("📋 For Windows:")
        print("   - Install Microsoft Visual C++ Build Tools")
        print("   - Download FFmpeg and add to PATH")
        print("   - PyAudio may need: pip install pipwin && pipwin install pyaudio")
    
    return True

def install_core_packages():
    """Install core packages in the right order"""
    print("\n📦 Installing core packages...")
    
    # Install setuptools first to fix build issues
    if not run_command(f"{sys.executable} -m pip install --upgrade setuptools>=65.0.0"):
        print("⚠️ Failed to upgrade setuptools")
    
    # Install numpy first (many packages depend on it)
    core_order = [
        "numpy>=1.24.0",
        "scipy>=1.11.0",
        "Pillow>=10.0.0"
    ]
    
    for package in core_order:
        cmd = f"{sys.executable} -m pip install '{package}'"
        if not run_command(cmd):
            print(f"⚠️ Failed to install {package}")
            return False
    
    return True

def install_cv_packages():
    """Install computer vision packages"""
    print("\n👁️ Installing computer vision packages...")
    
    # Use compatible versions
    cv_packages = [
        "opencv-python>=4.8.0",
        "mediapipe>=0.10.13"  # Use available version instead of 0.10.8
    ]
    
    success = True
    for package in cv_packages:
        cmd = f"{sys.executable} -m pip install '{package}'"
        if not run_command(cmd):
            print(f"⚠️ Failed to install {package}")
            success = False
    
    return success

def install_audio_packages():
    """Install audio processing packages"""
    print("\n🎵 Installing audio packages...")
    
    # Install librosa and dependencies
    audio_packages = [
        "librosa>=0.10.0",
        "pydub>=0.25.1"
    ]
    
    success = True
    for package in audio_packages:
        cmd = f"{sys.executable} -m pip install '{package}'"
        if not run_command(cmd):
            print(f"⚠️ Failed to install {package}")
            success = False
    
    # Try to install SpeechRecognition (use available version)
    print("\n🗣️ Installing SpeechRecognition...")
    if not run_command(f"{sys.executable} -m pip install 'SpeechRecognition>=3.8.0'"):
        print("⚠️ SpeechRecognition installation failed")
        success = False
    
    # Try PyAudio (often problematic)
    print("\n🎤 Attempting PyAudio installation...")
    if not run_command(f"{sys.executable} -m pip install pyaudio", ignore_errors=True):
        print("⚠️ PyAudio installation failed (this is common)")
        print("💡 Manual installation may be needed:")
        if platform.system().lower() == "windows":
            print("   pip install pipwin && pipwin install pyaudio")
        elif platform.system().lower() == "darwin":
            print("   brew install portaudio && pip install pyaudio")
        else:
            print("   sudo apt-get install portaudio19-dev && pip install pyaudio")
    
    return success

def install_ml_packages():
    """Install machine learning packages"""
    print("\n🧠 Installing ML packages...")
    
    ml_packages = [
        "scikit-learn>=1.3.0"
    ]
    
    success = True
    for package in ml_packages:
        cmd = f"{sys.executable} -m pip install '{package}'"
        if not run_command(cmd):
            print(f"⚠️ Failed to install {package}")
            success = False
    
    return success

def install_pytorch():
    """Install PyTorch (use compatible versions)"""
    print("\n🔥 Installing PyTorch...")
    
    # Use available versions instead of 2.1.1
    cpu_cmd = f"{sys.executable} -m pip install torch>=2.2.0 torchvision>=0.17.0 torchaudio>=2.2.0 --index-url https://download.pytorch.org/whl/cpu"
    
    if run_command(cpu_cmd, ignore_errors=True):
        print("✅ PyTorch CPU version installed successfully")
        return True
    
    # Fallback to regular PyTorch with compatible versions
    print("⚠️ CPU version failed, trying regular PyTorch...")
    regular_cmd = f"{sys.executable} -m pip install torch>=2.2.0 torchvision>=0.17.0 torchaudio>=2.2.0"
    
    if run_command(regular_cmd, ignore_errors=True):
        print("✅ PyTorch installed successfully")
        return True
    
    print("❌ PyTorch installation failed")
    return False

def install_utilities():
    """Install utility packages"""
    print("\n🛠️ Installing utilities...")
    
    utilities = [
        "websockets>=12.0",
        "matplotlib>=3.8.0"
    ]
    
    for package in utilities:
        cmd = f"{sys.executable} -m pip install '{package}'"
        run_command(cmd, ignore_errors=True)

def verify_installation():
    """Verify that packages are installed correctly"""
    print("\n🔍 Verifying installation...")
    
    # Critical packages
    critical_packages = [
        ("numpy", "NumPy"),
        ("cv2", "OpenCV"),
        ("sklearn", "Scikit-learn")
    ]
    
    # Important packages
    important_packages = [
        ("mediapipe", "MediaPipe"),
        ("librosa", "Librosa"),
        ("scipy", "SciPy"),
        ("PIL", "Pillow")
    ]
    
    # Optional packages
    optional_packages = [
        ("speech_recognition", "SpeechRecognition"),
        ("pydub", "PyDub"),
        ("torch", "PyTorch"),
        ("pyaudio", "PyAudio")
    ]
    
    print("\n📋 Critical packages:")
    critical_success = True
    for module, name in critical_packages:
        try:
            __import__(module)
            print(f"✅ {name}")
        except ImportError as e:
            print(f"❌ {name}: {e}")
            critical_success = False
    
    print("\n📋 Important packages:")
    important_success = True
    for module, name in important_packages:
        try:
            __import__(module)
            print(f"✅ {name}")
        except ImportError as e:
            print(f"⚠️ {name}: {e}")
            important_success = False
    
    print("\n📋 Optional packages:")
    for module, name in optional_packages:
        try:
            __import__(module)
            print(f"✅ {name}")
        except ImportError:
            print(f"⚠️ {name} (optional)")
    
    return critical_success

def get_session_summary() -> Dict[str, float]:
    """Get overall session statistics"""
    # This function was misplaced - it should be in the ML analyzer classes
    # For now, return empty dict
    return {
        'eye_contact_percentage': 0,
        'good_posture_percentage': 0,
        'gesture_activity_percentage': 0,
        'positive_expression_percentage': 0
    }

def main():
    """Main installation function"""
    print("🚀 CareerWise ML Dependencies Installer")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Show system info
    print(f"💻 System: {platform.system()} {platform.release()}")
    print(f"🏗️ Architecture: {platform.machine()}")
    
    # Step-by-step installation
    steps = [
        ("Upgrading build tools", upgrade_build_tools),
        ("System dependencies info", install_system_dependencies),
        ("Installing core packages", install_core_packages),
        ("Installing computer vision packages", install_cv_packages),
        ("Installing audio packages", install_audio_packages),
        ("Installing ML packages", install_ml_packages),
        ("Installing PyTorch", install_pytorch),
        ("Installing utilities", install_utilities)
    ]
    
    failed_steps = []
    
    for step_name, step_func in steps:
        print(f"\n{'='*50}")
        print(f"📋 {step_name}...")
        
        if not step_func():
            failed_steps.append(step_name)
            print(f"⚠️ {step_name} had issues")
        else:
            print(f"✅ {step_name} completed")
    
    # Final verification
    print(f"\n{'='*50}")
    print("🔍 Final verification...")
    
    if verify_installation():
        print("\n🎉 Installation completed successfully!")
        print("\n🎯 You can now use ML-powered interview analysis!")
        
        print("\n📋 Next steps:")
        print("1. Start your FastAPI server:")
        print("   uvicorn app.main:app --reload")
        print("2. Test the ML analysis endpoints")
        print("3. Try the interview preparation feature in the frontend")
        
    else:
        print("\n⚠️ Installation completed with some issues.")
        
        if failed_steps:
            print(f"\n❌ Failed steps: {', '.join(failed_steps)}")
        
        print("\n💡 Troubleshooting tips:")
        print("- Try running the script again")
        print("- Install missing system dependencies manually")
        print("- Check your Python environment and permissions")
        print("- Consider using a virtual environment")
        
        print("\n🔧 Manual installation commands:")
        print("pip install --upgrade pip setuptools wheel")
        print("pip install numpy scipy opencv-python")
        print("pip install 'mediapipe>=0.10.13' scikit-learn")
        print("pip install librosa pydub")

if __name__ == "__main__":
    main()