import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import CourseQuiz from "./pages/CourseQuiz";
import AdminDashboard from "./pages/AdminDashboard";
import SkillAssessment from "./pages/SkillAssessment";
import SkillGap from "./pages/SkillGap";
import Recommendations from "./pages/Recommendations";
import Courses from "./pages/Courses";
import QuizResult from "./pages/QuizResult";
import Progress from "./pages/Progress";
import MaterialQuiz from "./pages/MaterialQuiz";
import FutureSkills from "./pages/FutureSkills";
import KarmayogiRedirect from "./pages/KarmayogiRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assessment" element={<SkillAssessment />} />
        <Route path="/future-skills" element={<FutureSkills />} />
        <Route path="/skill-gap" element={<SkillGap />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-quiz" element={<CourseQuiz />} />
        <Route path="/material-quiz" element={<MaterialQuiz />} />
        <Route path="/karmayogi" element={<KarmayogiRedirect />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
