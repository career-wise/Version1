import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentDashboardHome from "./StudentDashboardHome";

// Exploration Components
import CareerExplorer from "../exploration/CareerExplorer";

// Academic Components
import SubjectExplorer from "../academics/SubjectExplorer";
import StudySkillsTrainer from "../academics/StudySkillsTrainer";
import TestPrepStrategies from "../academics/TestPrepStrategies";
import AcademicGoalTracker from "../academics/AcademicGoalTracker";

// College Components
import CollegeExplorer from "../college/CollegeExplorer";
import MajorExplorer from "../college/MajorExplorer";

// Skills Components
import SkillDiscovery from "../skills/SkillDiscovery";
import BasicTechSkills from "../skills/BasicTechSkills";
import SoftSkills from "../skills/SoftSkills";
import CreativeSkills from "../skills/CreativeSkills";

// Learning Components
import OnlineCourses from "../learning/OnlineCourses";
import ProjectIdeas from "../learning/ProjectIdeas";
import InterviewPreparation from "../learning/InterviewPreparation";

// Planning Components
import CareerPathPlanner from "../planning/CareerPathPlanner";
import { GoalSetting } from "../planning/GoalSetting";

// Resources Components
import StudyResources from "../resources/StudyResources";
import DocumentManager from "../resources/DocumentManager";

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<StudentDashboardHome />} />

          {/* Exploration Routes */}
          {/* Academic Routes */}
          <Route
            path="/academics/subject-explorer"
            element={<SubjectExplorer />}
          />

          <Route path="/academics/test-prep" element={<TestPrepStrategies />} />
          <Route
            path="/academics/goal-tracker"
            element={<AcademicGoalTracker />}
          />

          {/* College Routes */}
          <Route path="/college/explorer" element={<CollegeExplorer />} />
          <Route path="/college/majors" element={<MajorExplorer />} />

          {/* Skills Routes */}
          <Route path="/skills/discovery" element={<SkillDiscovery />} />
          <Route path="/skills/tech" element={<BasicTechSkills />} />
          <Route path="/skills/soft" element={<SoftSkills />} />
          <Route path="/skills/creative" element={<CreativeSkills />} />

          {/* Learning Routes */}
          <Route path="/learning/courses" element={<OnlineCourses />} />
          <Route path="/learning/projects" element={<ProjectIdeas />} />

          <Route
            path="/learning/interview-prep"
            element={<InterviewPreparation />}
          />

          {/* Planning Routes */}
          <Route path="/planning/career-path" element={<CareerPathPlanner />} />
          <Route path="/planning/goals" element={<GoalSetting />} />


          {/* Resources Routes */}
          <Route path="/resources/document-manager" element={<DocumentManager />} />

          <Route path="/resources/study" element={<StudyResources />} />

        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
