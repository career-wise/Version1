# CareerWise Project Handoff to Claude

## Project Overview
CareerWise is a comprehensive AI-powered career guidance platform that helps users at different career stages (high school students, recent graduates, working professionals, aspiring entrepreneurs) with personalized career advice, resume building, interview preparation, assessments, and learning paths.

## Current Project Status
The project is a full-stack application with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: FastAPI + Python with Supabase integration
- **Database**: Supabase (PostgreSQL)
- **ML Features**: Real-time interview analysis using MediaPipe, OpenCV, and Librosa
- **Authentication**: Custom JWT-based auth with Supabase

## Architecture Overview

### Frontend Structure (`src/`)
```
src/
├── components/
│   ├── auth/AuthPage.tsx - Complete authentication system
│   ├── dashboard/
│   │   ├── Dashboard.tsx - Main dashboard with stats and quick actions
│   │   └── DashboardLayout.tsx - Layout with sidebar navigation and auth protection
│   ├── interview/
│   │   ├── InterviewPrep.tsx - Interview practice with ML analysis integration
│   │   └── MLInterviewAnalysis.tsx - Real-time ML analysis component
│   ├── onboarding/OnboardingFlow.tsx - Multi-step user onboarding
│   ├── resume/ResumeBuilder.tsx - Resume creation and ATS scoring
│   ├── assessments/AssessmentCenter.tsx - Career assessments
│   ├── learning/LearningPaths.tsx - Skill development courses
│   ├── goals/CareerGoals.tsx - Goal setting and tracking
│   ├── analytics/PersonalAnalytics.tsx - Progress tracking
│   └── ui/ - Reusable UI components (Button, Card, Modal, etc.)
├── lib/
│   ├── auth.ts - Authentication service with full CRUD operations
│   ├── supabase.ts - Supabase client configuration
│   └── utils.ts - Utility functions including ATS scoring
├── hooks/
│   ├── useAuth.ts - Authentication hook
│   ├── useToast.ts - Toast notification system
│   ├── useKeyboardShortcuts.ts - Global keyboard shortcuts
│   └── useMLAnalysis.ts - ML analysis integration hook
├── services/
│   └── mlAnalysisService.ts - ML analysis service for real-time processing
└── types/index.ts - TypeScript type definitions
```

### Backend Structure (`backend/`)
```
backend/
├── app/
│   ├── api/endpoints/
│   │   ├── auth.py - Complete authentication endpoints (signup, signin, profile)
│   │   └── ml_analysis.py - Real ML analysis endpoints with MediaPipe/OpenCV
│   ├── core/
│   │   ├── auth.py - JWT authentication middleware
│   │   └── config.py - Application configuration
│   ├── ml/
│   │   ├── body_language_analyzer.py - MediaPipe-based body language analysis
│   │   ├── speech_analyzer.py - Librosa-based speech analysis
│   │   └── utils.py - ML utility functions
│   └── main.py - FastAPI application setup
├── requirements.txt - All dependencies including ML packages
├── install_ml_dependencies_fixed.py - ML dependency installer script
└── main.py - Application entry point
```

## Key Features Implemented

### 1. Authentication System ✅
- **Frontend**: Complete auth flow with form validation, error handling
- **Backend**: JWT-based auth with Supabase integration
- **Features**: Sign up, sign in, sign out, profile management, protected routes
- **Files**: `src/lib/auth.ts`, `backend/app/api/endpoints/auth.py`

### 2. User Onboarding ✅
- **Multi-step flow**: User type → Career stage → Goals → Industries → Experience → Additional info
- **Dynamic content**: Different questions based on user type (student, graduate, professional, entrepreneur)
- **Profile integration**: Saves onboarding data to user profile
- **Files**: `src/components/onboarding/OnboardingFlow.tsx`

### 3. Dashboard System ✅
- **Protected routes**: Authentication-required dashboard layout
- **Sidebar navigation**: Clean navigation with active states
- **Stats overview**: Progress tracking and metrics
- **Quick actions**: Easy access to main features
- **Files**: `src/components/dashboard/DashboardLayout.tsx`, `src/components/dashboard/Dashboard.tsx`

### 4. ML-Powered Interview Analysis ✅
- **Real-time analysis**: Live body language and speech analysis during practice
- **WebSocket integration**: Real-time feedback via WebSocket connections
- **Comprehensive scoring**: Eye contact, posture, gestures, speech clarity, pace, confidence
- **Demo mode fallback**: Works with or without ML backend
- **Files**: `src/components/interview/MLInterviewAnalysis.tsx`, `backend/app/ml/`

### 5. Resume Builder ✅
- **ATS scoring**: Real-time ATS compatibility scoring
- **Multiple sections**: Personal info, experience, education, skills, projects
- **Live preview**: Modal preview of formatted resume
- **Export functionality**: PDF download capability
- **Files**: `src/components/resume/ResumeBuilder.tsx`

### 6. Assessment Center ✅
- **Multiple assessment types**: Personality, skills, interests, values
- **Progress tracking**: Completion status and scores
- **Detailed results**: Comprehensive feedback and recommendations
- **Files**: `src/components/assessments/AssessmentCenter.tsx`

### 7. Learning Paths ✅
- **Course catalog**: Structured learning journeys
- **Progress tracking**: Module completion and overall progress
- **Skill development**: Technology, business, design, marketing paths
- **Enrollment system**: Course enrollment and management
- **Files**: `src/components/learning/LearningPaths.tsx`

### 8. Goal Management ✅
- **SMART goals**: Specific, measurable career objectives
- **Progress tracking**: Visual progress bars and milestone tracking
- **Categories**: Career, skill, education, salary, network goals
- **Deadline management**: Due date tracking and urgency indicators
- **Files**: `src/components/goals/CareerGoals.tsx`

### 9. Analytics Dashboard ✅
- **Personal metrics**: Activity tracking, completion rates, time spent
- **Skill progress**: Individual skill development tracking
- **Achievement system**: Badges and accomplishments
- **Visual charts**: Progress visualization and trends
- **Files**: `src/components/analytics/PersonalAnalytics.tsx`

## Technical Implementation Details

### Authentication Flow
1. **Frontend**: `authService` handles all auth operations
2. **Token storage**: localStorage with automatic cleanup
3. **Route protection**: Dashboard routes require authentication
4. **Profile management**: Complete CRUD operations for user profiles
5. **Onboarding integration**: Seamless flow from signup to onboarding

### ML Analysis System
1. **Real ML**: Uses MediaPipe for body language, Librosa for speech analysis
2. **WebSocket**: Real-time analysis feedback during recording
3. **Fallback system**: Demo mode when ML backend unavailable
4. **Comprehensive scoring**: Multiple metrics with detailed feedback
5. **Session management**: Complete analysis sessions with results storage

### Database Schema (Supabase)
```sql
-- User profiles table
user_profiles (
  id uuid PRIMARY KEY,
  full_name text,
  current_position text,
  industry text,
  experience_level text,
  career_goals text[], -- JSON array
  skills text[], -- JSON array
  interests text[], -- JSON array
  values text[], -- JSON array
  linkedin_url text,
  portfolio_url text,
  created_at timestamp,
  updated_at timestamp
)
```

### UI/UX Design System
- **Design language**: Apple-inspired clean aesthetics
- **Color system**: Primary, secondary, accent colors with proper contrast
- **Typography**: Inter font with proper hierarchy
- **Components**: Consistent button, card, modal, input components
- **Responsive**: Mobile-first design with proper breakpoints
- **Animations**: Smooth transitions and micro-interactions

## Current Issues & Context

### ML Analysis Problem
The ML backend is implemented and working, but there was an issue where the analysis was returning the same scores (77-79%) repeatedly. This suggests:

1. **Possible causes**:
   - ML models not loading properly despite backend running
   - Input data not being processed correctly by ML pipeline
   - MediaPipe/OpenCV not detecting features properly
   - Audio processing pipeline issues with Librosa

2. **Current status**:
   - Backend server runs successfully
   - ML dependencies are installed
   - WebSocket connections work
   - But actual ML analysis may not be functioning correctly

3. **Files to investigate**:
   - `backend/app/ml/body_language_analyzer.py` - MediaPipe implementation
   - `backend/app/ml/speech_analyzer.py` - Librosa implementation
   - `backend/app/api/endpoints/ml_analysis.py` - API endpoints

### What Works vs What Needs Investigation
✅ **Working**:
- Complete authentication system
- User onboarding and profile management
- Dashboard and navigation
- All UI components and pages
- Backend API structure
- Database integration
- WebSocket connections

❓ **Needs Investigation**:
- Actual ML model functionality (MediaPipe, Librosa)
- Real-time analysis accuracy
- Audio/video processing pipeline
- ML dependency compatibility

## Environment Setup

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
```

### Running the Project
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python install_ml_dependencies_fixed.py  # Install ML dependencies
uvicorn app.main:app --reload
```

## Next Steps for Claude

1. **Investigate ML Analysis Issue**:
   - Debug why ML models return consistent scores
   - Verify MediaPipe and Librosa are actually processing data
   - Check if input data (video frames, audio) is being received correctly
   - Test individual ML components in isolation

2. **Potential Improvements**:
   - Add more sophisticated ML model training
   - Implement better error handling for ML failures
   - Add more detailed logging for ML pipeline
   - Consider alternative ML approaches if current ones are problematic

3. **Feature Enhancements**:
   - Add more assessment types
   - Implement job matching algorithms
   - Add social features (networking, mentorship)
   - Integrate with external job boards
   - Add mobile responsiveness improvements

4. **Production Readiness**:
   - Add comprehensive error handling
   - Implement proper logging and monitoring
   - Add rate limiting and security measures
   - Optimize performance and loading times
   - Add comprehensive testing

## Key Files to Focus On

For ML debugging:
- `backend/app/ml/body_language_analyzer.py`
- `backend/app/ml/speech_analyzer.py`
- `backend/app/api/endpoints/ml_analysis.py`
- `src/components/interview/MLInterviewAnalysis.tsx`

For feature development:
- `src/components/dashboard/Dashboard.tsx`
- `backend/app/api/endpoints/`
- `src/lib/auth.ts`

This project represents a comprehensive career guidance platform with real ML capabilities. The main challenge is ensuring the ML analysis actually works as intended rather than returning mock/consistent data.