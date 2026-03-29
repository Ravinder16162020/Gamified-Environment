import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
import EcoLeaderboard from './frontend/EcoSprint pages/Leaderboard';
import EcoProfile from './frontend/EcoSprint pages/Profile';
import Leaderboard from './frontend/CodeSprint pages/CodeLeaderboard';
import MyProgress from './frontend/EcoSprint pages/MyProgress';
import MyBadges from './frontend/EcoSprint pages/MyBadges';
import Bages from './frontend/EcoSprint pages/Bages';
import EcoBot from './frontend/EcoSprint pages/EcoBot';
import Profile from './frontend/CodeSprint pages/CodeProfile';
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
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* EcoSprint Routes - Only for ecosprint users */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRole="ecosprint">
            <EcoDashboard />
          </ProtectedRoute>
        } />
        <Route path="/modules" element={
          <ProtectedRoute allowedRole="ecosprint">
            <LearningModulemain />
          </ProtectedRoute>
        } />
        <Route path="/modules/:moduleId" element={
          <ProtectedRoute allowedRole="ecosprint">
            <ClimateChangeModule />
          </ProtectedRoute>
        } />
        <Route path="/modules/:moduleId/learn" element={
          <ProtectedRoute allowedRole="ecosprint">
            <ModuleContent />
          </ProtectedRoute>
        } />
        <Route path="/modules/:moduleId/quiz" element={
          <ProtectedRoute allowedRole="ecosprint">
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/modules/:moduleId/quiz/result" element={
          <ProtectedRoute allowedRole="ecosprint">
            <QuizResult />
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute allowedRole="ecosprint">
            <MyProgress />
          </ProtectedRoute>
        } />
        <Route path="/badges" element={
          <ProtectedRoute allowedRole="ecosprint">
            <Bages />
          </ProtectedRoute>
        } />
        <Route path="/ecobot" element={
          <ProtectedRoute allowedRole="ecosprint">
            <EcoBot />
          </ProtectedRoute>
        } />
        <Route path="/challenges" element={
          <ProtectedRoute allowedRole="ecosprint">
            <DailyChallenge />
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute allowedRole="ecosprint">
            <EcoLeaderboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRole="ecosprint">
            <EcoProfile />
          </ProtectedRoute>
        } />

        {/* CodeSprint Routes - Only for codesprint users */}
        <Route path="/journey" element={
          <ProtectedRoute allowedRole="codesprint">
            <Journey />
          </ProtectedRoute>
        } />
        <Route path="/codeeditor" element={
          <ProtectedRoute allowedRole="codesprint">
            <CodeEditor />
          </ProtectedRoute>
        } />
        <Route path="/quiztheory" element={
          <ProtectedRoute allowedRole="codesprint">
            <JyQuizTheory />
          </ProtectedRoute>
        } />
        <Route path="/practice" element={
          <ProtectedRoute allowedRole="codesprint">
            <Practice />
          </ProtectedRoute>
        } />
        <Route path="/goals" element={
          <ProtectedRoute allowedRole="codesprint">
            <Goals />
          </ProtectedRoute>
        } />
        <Route path="/code/challenges" element={
          <ProtectedRoute allowedRole="codesprint">
            <Challenges />
          </ProtectedRoute>
        } />
        <Route path="/code/leaderboard" element={
          <ProtectedRoute allowedRole="codesprint">
            <Leaderboard />
          </ProtectedRoute>
        } />
        <Route path="/code/profile" element={
          <ProtectedRoute allowedRole="codesprint">
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/onboarding1" element={
          <ProtectedRoute allowedRole="codesprint">
            <Onboarding1 />
          </ProtectedRoute>
        } />
        <Route path="/onboarding2" element={
          <ProtectedRoute allowedRole="codesprint">
            <Onboarding2 />
          </ProtectedRoute>
        } />
        <Route path="/onboarding3" element={
          <ProtectedRoute allowedRole="codesprint">
            <Onboarding3 />
          </ProtectedRoute>
        } />
        <Route path="/onboarding4" element={
          <ProtectedRoute allowedRole="codesprint">
            <Onboarding4 />
          </ProtectedRoute>
        } />
        <Route path="/onboarding5" element={
          <ProtectedRoute allowedRole="codesprint">
            <Onboarding5 />
          </ProtectedRoute>
        } />

        {/* Shared/Old Routes - redirect based on role */}
        <Route path="/modules/climate-change/learn" element={
          <ProtectedRoute allowedRole="ecosprint">
            <ClimateChangeLesson />
          </ProtectedRoute>
        } />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

