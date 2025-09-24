import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentDashboardHome from "./StudentDashboardHome";

// Components that exist
import CollegeExplorer from "../explorer&discover/CollegeExplorer";
import MajorExplorer from "../explorer&discover/MajorExplorer";
import BasicTechSkills from "../learn&develop/BasicTechSkills";
import SoftSkills from "../learn&develop/SoftSkills";
import CreativeSkills from "../learn&develop/CreativeSkills";
import OnlineCourses from "../learn&develop/OnlineCourses";
import ProjectIdeas from "../learn&develop/ProjectIdeas";
import InterviewPreparation from "../prepareforfuture/InterviewPreparation";
import CareerPathPlanner from "../prepareforfuture/CareerPathPlanner";
import { GoalSetting } from "../study&succeed/GoalSetting";
import StudyResources from "../study&succeed/StudyResources";
import DocumentManager from "../resources/DocumentManager";
import SubjectExplorer from "../study&succeed/SubjectExplorer";
import StudySkillsTrainer from "../study&succeed/StudySkillsTrainer";
import TestPrepStrategies from "../study&succeed/TestPrepStrategies";

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <StudentSidebar />

      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<StudentDashboardHome />} />

          {/* Academic Routes */}
          <Route path="/academics/study-skills" element={<StudySkillsTrainer />} />
          <Route path="/academics/test-prep" element={<TestPrepStrategies />} />
          <Route path="/resources/study" element={<StudyResources />} />
          <Route path="/academics/study-resources" element={<StudyResources />} />

          {/* College Routes */}
          <Route path="/college/explorer" element={<CollegeExplorer />} />
          <Route path="/college/majors" element={<MajorExplorer />} />

          {/* Skills Routes */}
          <Route path="/skills/tech" element={<BasicTechSkills />} />
          <Route path="/skills/soft" element={<SoftSkills />} />
          <Route path="/skills/creative" element={<CreativeSkills />} />

          {/* Learning Routes */}
          <Route path="/learning/courses" element={<OnlineCourses />} />
          <Route path="/learning/projects" element={<ProjectIdeas />} />
          <Route path="/learning/interview-prep" element={<InterviewPreparation />} />

          {/* Planning Routes */}
          <Route path="/planning/career-path" element={<CareerPathPlanner />} />
          <Route path="/planning/goals" element={<GoalSetting />} />
          
          {/* Resources Routes */}
          <Route path="/resources/document-manager" element={<DocumentManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
