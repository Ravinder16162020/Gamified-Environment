import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import LoginPage from './LoginPage';
import EcoDashboard from './frontend/EcoSprint pages/EcoDashboard';
import LearningModulemain from './frontend/EcoSprint pages/LearningModulemain';
import ClimateChangeModule from './frontend/EcoSprint pages/ClimateChangeModule';
import ClimateChangeLesson from './frontend/EcoSprint pages/ClimateChangeLesson';
import ModuleContent from './frontend/EcoSprint pages/ModuleContent';
import QuizPage from './frontend/EcoSprint pages/QuizPage';
import QuizResult from './frontend/EcoSprint pages/QuizResult';
import DailyChallenge from './frontend/EcoSprint pages/DailyChallenge';
import Leaderboard from './frontend/CodeSprint pages/Leaderboard';
import MyProgress from './frontend/EcoSprint pages/MyProgress';
import MyBadges from './frontend/EcoSprint pages/MyBadges';
import Bages from './frontend/EcoSprint pages/Bages';
import EcoBot from './frontend/EcoSprint pages/EcoBot';
import Profile from './frontend/CodeSprint pages/Profile';
import Onboarding1 from './frontend/CodeSprint pages/Onboarding1';
import Onboarding2 from './frontend/CodeSprint pages/Onboarding2';
import Onboarding3 from './frontend/CodeSprint pages/Onboarding3';
import Onboarding4 from './frontend/CodeSprint pages/Onboarding4';
import Onboarding5 from './frontend/CodeSprint pages/Onboarding5';
import Journey from './frontend/CodeSprint pages/Journey';
import CodeEditor from './frontend/CodeSprint pages/CodeEditor';
import JyQuizTheory from './frontend/CodeSprint pages/JyQuizTheory';
import Practice from './frontend/CodeSprint pages/Practice';
import Goals from './frontend/CodeSprint pages/Goals';
import Challenges from './frontend/CodeSprint pages/Challenges';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<EcoDashboard />} />
        <Route path="/modules" element={<LearningModulemain />} />
        <Route path="/modules/:moduleId" element={<ClimateChangeModule />} />
        <Route path="/modules/:moduleId/learn" element={<ModuleContent />} />
        <Route path="/modules/:moduleId/quiz" element={<QuizPage />} />
        <Route path="/modules/:moduleId/quiz/result" element={<QuizResult />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/badges" element={<Bages />} />
        <Route path="/ecobot" element={<EcoBot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
        <Route path="/onboarding4" element={<Onboarding4 />} />
        <Route path="/onboarding5" element={<Onboarding5 />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/codeeditor" element={<CodeEditor />} />
        <Route path="/quiztheory" element={<JyQuizTheory />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/modules/climate-change/learn" element={<ClimateChangeLesson />} />
      </Routes>
    </Router>
  );
}

export default App;

