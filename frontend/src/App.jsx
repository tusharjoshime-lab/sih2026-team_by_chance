import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

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
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="/assessment" element={<AuthGuard><SkillAssessment /></AuthGuard>} />
          <Route path="/future-skills" element={<AuthGuard><FutureSkills /></AuthGuard>} />
          <Route path="/skill-gap" element={<AuthGuard><SkillGap /></AuthGuard>} />
          <Route path="/recommendations" element={<AuthGuard><Recommendations /></AuthGuard>} />
          <Route path="/courses" element={<AuthGuard><Courses /></AuthGuard>} />
          <Route path="/course-quiz" element={<AuthGuard><CourseQuiz /></AuthGuard>} />
          <Route path="/material-quiz" element={<AuthGuard><MaterialQuiz /></AuthGuard>} />
          <Route path="/karmayogi" element={<AuthGuard><KarmayogiRedirect /></AuthGuard>} />
          <Route path="/quiz-result" element={<AuthGuard><QuizResult /></AuthGuard>} />
          <Route path="/progress" element={<AuthGuard><Progress /></AuthGuard>} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/admin" element={<AuthGuard><AdminDashboard /></AuthGuard>} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
