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
        <Route path="/challenges" element={<DailyChallenge />} />
        <Route path="/modules/climate-change/learn" element={<ClimateChangeLesson />} />
      </Routes>
    </Router>
  );
}

export default App;

