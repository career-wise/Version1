import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentDashboardHome from "./StudentDashboardHome";

// Exploration Components
import CareerExplorer from "../exploration/CareerExplorer";
import InterestAssessment from "../exploration/InterestAssessment";
import PersonalityTest from "../exploration/PersonalityTest";
import StrengthsFinder from "../exploration/StrengthsFinder";
import ValuesAssessment from "../exploration/ValuesAssessment";
import LearningStyleAssessment from "../exploration/LearningStyleAssessment";

// Academic Components
import SubjectExplorer from "../academics/SubjectExplorer";
import GPAGoalSetting from "../academics/GPAGoalSetting";
import StudySkillsTrainer from "../academics/StudySkillsTrainer";
import TimeManagement from "../academics/TimeManagement";
import TestPrepStrategies from "../academics/TestPrepStrategies";
import AcademicGoalTracker from "../academics/AcademicGoalTracker";

// College Components
import CollegeExplorer from "../college/CollegeExplorer";
import MajorExplorer from "../college/MajorExplorer";
import CollegePrep from "../college/CollegePrep";
import ApplicationTimeline from "../college/ApplicationTimeline";
import ScholarshipFinder from "../college/ScholarshipFinder";
import CollegeComparisonTool from "../college/CollegeComparisonTool";

// Skills Components
import SkillDiscovery from "../skills/SkillDiscovery";
import BasicTechSkills from "../skills/BasicTechSkills";
import CommunicationSkills from "../skills/CommunicationSkills";
import CreativeSkills from "../skills/CreativeSkills";
import AnalyticalSkills from "../skills/AnalyticalSkills";
import SocialSkills from "../skills/SocialSkills";

// Learning Components
import LearningPaths from "../learning/LearningPaths";
import OnlineCourses from "../learning/OnlineCourses";
import SkillBuilding from "../learning/SkillBuilding";
import ProjectIdeas from "../learning/ProjectIdeas";
import VolunteerOpportunities from "../learning/VolunteerOpportunities";
import InternshipPrep from "../learning/InternshipPrep";

// Planning Components
import CareerPathPlanner from "../planning/CareerPathPlanner";
import GoalSetting from "../planning/GoalSetting";
import BudgetingBasics from "../planning/BudgetingBasics";
import TimelineBuilder from "../planning/TimelineBuilder";
import DecisionMaking from "../planning/DecisionMaking";
import PrioritizationSkills from "../planning/PrioritizationSkills";

// Networking Components
import MentorFinder from "../networking/MentorFinder";
import PeerGroups from "../networking/PeerGroups";
import CommunityEvents from "../networking/CommunityEvents";
import InformationalInterviews from "../networking/InformationalInterviews";
import NetworkingBasics from "../networking/NetworkingBasics";

// Resources Components
import CareerLibrary from "../resources/CareerLibrary";
import StudyResources from "../resources/StudyResources";
import FinancialLiteracy from "../resources/FinancialLiteracy";
import DigitalCitizenship from "../resources/DigitalCitizenship";
import CollegeResourceCenter from "../resources/CollegeResourceCenter";

// Tools Components
import StudyPlanner from "../tools/StudyPlanner";
import GoalTracker from "../tools/GoalTracker";
import ProgressJournal from "../tools/ProgressJournal";
import CareerQuizzes from "../tools/CareerQuizzes";
import ResourceBookmarks from "../tools/ResourceBookmarks";

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
          <Route
            path="/exploration/interest-assessment"
            element={<InterestAssessment />}
          />
          <Route
            path="/exploration/personality-test"
            element={<PersonalityTest />}
          />
          <Route
            path="/exploration/strengths-finder"
            element={<StrengthsFinder />}
          />
          <Route
            path="/exploration/values-assessment"
            element={<ValuesAssessment />}
          />
          <Route
            path="/exploration/learning-style"
            element={<LearningStyleAssessment />}
          />

          {/* Academic Routes */}
          <Route
            path="/academics/subject-explorer"
            element={<SubjectExplorer />}
          />
          <Route path="/academics/gpa-goals" element={<GPAGoalSetting />} />
          <Route
            path="/academics/study-skills"
            element={<StudySkillsTrainer />}
          />
          <Route
            path="/academics/time-management"
            element={<TimeManagement />}
          />
          <Route path="/academics/test-prep" element={<TestPrepStrategies />} />
          <Route
            path="/academics/goal-tracker"
            element={<AcademicGoalTracker />}
          />

          {/* College Routes */}
          <Route path="/college/explorer" element={<CollegeExplorer />} />
          <Route path="/college/majors" element={<MajorExplorer />} />
          <Route path="/college/prep" element={<CollegePrep />} />
          <Route path="/college/timeline" element={<ApplicationTimeline />} />
          <Route path="/college/scholarships" element={<ScholarshipFinder />} />
          <Route
            path="/college/comparison"
            element={<CollegeComparisonTool />}
          />

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
          <Route path="/learning/paths" element={<LearningPaths />} />
          <Route path="/learning/courses" element={<OnlineCourses />} />
          <Route path="/learning/skill-building" element={<SkillBuilding />} />
          <Route path="/learning/projects" element={<ProjectIdeas />} />
          <Route
            path="/learning/volunteer"
            element={<VolunteerOpportunities />}
          />
          <Route
            path="/learning/internship-prep"
            element={<InternshipPrep />}
          />

          {/* Planning Routes */}
          <Route path="/planning/career-path" element={<CareerPathPlanner />} />
          <Route path="/planning/goals" element={<GoalSetting />} />
          <Route path="/planning/budgeting" element={<BudgetingBasics />} />
          <Route path="/planning/timeline" element={<TimelineBuilder />} />
          <Route path="/planning/decisions" element={<DecisionMaking />} />
          <Route
            path="/planning/priorities"
            element={<PrioritizationSkills />}
          />

          {/* Networking Routes */}
          <Route path="/networking/mentors" element={<MentorFinder />} />
          <Route path="/networking/peers" element={<PeerGroups />} />
          <Route path="/networking/events" element={<CommunityEvents />} />
          <Route
            path="/networking/interviews"
            element={<InformationalInterviews />}
          />
          <Route path="/networking/basics" element={<NetworkingBasics />} />

          {/* Resources Routes */}
          <Route path="/resources/career-library" element={<CareerLibrary />} />
          <Route path="/resources/study" element={<StudyResources />} />
          <Route path="/resources/financial" element={<FinancialLiteracy />} />
          <Route path="/resources/digital" element={<DigitalCitizenship />} />
          <Route
            path="/resources/college"
            element={<CollegeResourceCenter />}
          />

          {/* Tools Routes */}
          <Route path="/tools/study-planner" element={<StudyPlanner />} />
          <Route path="/tools/goal-tracker" element={<GoalTracker />} />
          <Route path="/tools/journal" element={<ProgressJournal />} />
          <Route path="/tools/quizzes" element={<CareerQuizzes />} />
          <Route path="/tools/bookmarks" element={<ResourceBookmarks />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
