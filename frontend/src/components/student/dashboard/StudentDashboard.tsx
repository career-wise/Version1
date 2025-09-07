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
import CommunicationSkills from "../skills/CommunicationSkills";
import CreativeSkills from "../skills/CreativeSkills";
import AnalyticalSkills from "../skills/AnalyticalSkills";
import SocialSkills from "../skills/SocialSkills";

// Learning Components
import OnlineCourses from "../learning/OnlineCourses";
import ProjectIdeas from "../learning/ProjectIdeas";
import InternshipPrep from "../learning/InternshipPrep";

// Planning Components
import CareerPathPlanner from "../planning/CareerPathPlanner";
import GoalSetting from "../planning/GoalSetting";

// Resources Components
import CareerLibrary from "../resources/CareerLibrary";
import StudyResources from "../resources/StudyResources";
import FinancialLiteracy from "../resources/FinancialLiteracy";
import DigitalCitizenship from "../resources/DigitalCitizenship";
import CollegeResourceCenter from "../resources/CollegeResourceCenter";

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<StudentDashboardHome />} />

          {/* Exploration Routes */}
          <Route
            path="/exploration/career-explorer"
            element={<CareerExplorer />}
          />

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
          <Route
            path="/skills/communication"
            element={<CommunicationSkills />}
          />
          <Route path="/skills/creative" element={<CreativeSkills />} />
          <Route path="/skills/analytical" element={<AnalyticalSkills />} />
          <Route path="/skills/social" element={<SocialSkills />} />

          {/* Learning Routes */}
          <Route path="/learning/courses" element={<OnlineCourses />} />
          <Route path="/learning/projects" element={<ProjectIdeas />} />

          <Route
            path="/learning/internship-prep"
            element={<InternshipPrep />}
          />

          {/* Planning Routes */}
          <Route path="/planning/career-path" element={<CareerPathPlanner />} />
          <Route path="/planning/goals" element={<GoalSetting />} />


          {/* Resources Routes */}
          <Route path="/resources/career-library" element={<CareerLibrary />} />
          <Route path="/resources/study" element={<StudyResources />} />
          <Route path="/resources/financial" element={<FinancialLiteracy />} />
          <Route path="/resources/digital" element={<DigitalCitizenship />} />
          <Route
            path="/resources/college"
            element={<CollegeResourceCenter />}
          />

        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
