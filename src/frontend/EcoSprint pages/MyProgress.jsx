import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, BookOpen, LineChart, Trophy, Users, 
  Settings, Bell, Calendar, ChevronDown, Zap, Book, CheckSquare, 
  Award, Eye, RefreshCw
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './MyProgress.module.css';

// User data
const userData = {
  name: "Alex Johnson",
  level: "Level 4 Eco-Guardian",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaCwoap09JM6-jTa1ngELbX9uilyEg69IJNhQPA1RjRVBOI2qBhIs9dou3v7TRmNoF7H-6ofTUNry8Oh6KXjVnFcm0WtKpoiytPfImUma4L6svpQc5S4REWJElDIVyJmnvgO7dnQbXCAWLBg4rW78B8Dcmx3-ho2z7Tu-zaURvqafDG9_iJ1wPe3_Qt5fg4OumMjxHBQX4c1Yngf__40-T-WcTPg_S2Gos8uxDq1Nnq6olam5QTLkB9UlaixsHo1R_HRnp6317PQ"
};

// Stats data
const statsData = {
  totalPoints: 1250,
  modulesCompleted: "5/8",
  quizzesTaken: 5,
  averageScore: "76%"
};

// Topic mastery data
const topicMastery = [
  { topic: "Climate Change", percentage: 100 },
  { topic: "Renewable Energy", percentage: 65 },
  { topic: "Waste Management", percentage: 40 },
  { topic: "Water Conservation", percentage: 20 },
  { topic: "Biodiversity", percentage: 0 }
];

// Quiz history data
const quizHistory = [
  { name: "Intro to Climate Change", date: "Oct 12, 2023", score: "100%", status: "passed" },
  { name: "Solar Power Fundamentals", date: "Oct 08, 2023", score: "85%", status: "passed" },
  { name: "Ocean Conservation Basics", date: "Oct 05, 2023", score: "60%", status: "retry" }
];

// Chart data - points over time (last 30 days)
const chartData = Array.from({length: 30}, (_, i) => 950 + (i * 10.3));

// Heatmap data (52 weeks x 7 days = 364 cells)
const generateHeatmapData = () => {
  return Array.from({ length: 52 * 7 }, () => {
    const rand = Math.random();
    if (rand > 0.8) return 'bg-green-600';
    if (rand > 0.6) return 'bg-green-400';
    if (rand > 0.4) return 'bg-green-200';
    return 'bg-slate-100';
  });
};

// Level roadmap data
const levels = [
  { num: 1, name: "Seed", completed: true },
  { num: 2, name: "Sprout", completed: true },
  { num: 3, name: "Sapling", completed: true },
  { num: 4, name: "Hero", completed: true, active: true },
  { num: 5, name: "Ranger", completed: false },
  { num: 6, name: "Warrior", completed: false },
  { num: 7, name: "Guardian", completed: false },
  { num: 8, name: "Elder", completed: false },
  { num: 9, name: "Sage", completed: false },
  { num: 10, name: "Master", completed: false }
];

const MyProgress = () => {
  const navigate = useNavigate();
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [progressBars, setProgressBars] = useState(topicMastery.map(() => 0));
  const [roadmapProgress, setRoadmapProgress] = useState(0);
  const [heatmapData] = useState(generateHeatmapData());
  const [timeFilter, setTimeFilter] = useState('30days');

  // Animate stats count-up
  useEffect(() => {
    const duration = 2000;
    const steps = duration / 16;
    const increment = statsData.totalPoints / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= statsData.totalPoints) {
        setAnimatedPoints(statsData.totalPoints);
        clearInterval(timer);
      } else {
        setAnimatedPoints(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  // Animate progress bars
  useEffect(() => {
    setTimeout(() => {
      setProgressBars(topicMastery.map(t => t.percentage));
    }, 500);
  }, []);

  // Animate roadmap progress
  useEffect(() => {
    setTimeout(() => {
      setRoadmapProgress(35);
    }, 500);
  }, []);

  // Simple SVG chart component
  const PointsChart = () => {
    const maxValue = Math.max(...chartData);
    const minValue = Math.min(...chartData);
    const range = maxValue - minValue;
    const width = 100;
    const height = 100;
    
    const points = chartData.map((value, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4EA24E" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4EA24E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon 
          points={`0,100 ${points} 100,100`} 
          fill="url(#chartGradient)" 
        />
        <polyline 
          points={points} 
          fill="none" 
          stroke="#4EA24E" 
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'passed') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">
          PASSED
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold">
        RETRY
      </span>
    );
  };

  const getScoreColor = (score) => {
    const num = parseInt(score);
    if (num >= 80) return 'text-[#4EA24E]';
    if (num >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-20">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-sm">Welcome back, <strong>{userData.name}</strong></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="text-right">
                <p className="text-xs font-semibold">{userData.name}</p>
                <p className="text-[10px] text-slate-500">{userData.level}</p>
              </div>
              <img alt="Profile" className="w-10 h-10 rounded-full border border-slate-200" src={userData.avatar} />
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">My Progress</h1>
              <p className="text-slate-500 text-sm">Track your journey to becoming a sustainability expert.</p>
            </div>
            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Last 30 Days</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 text-[#4EA24E] rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Eco-Points</p>
                <h3 className="text-2xl font-bold text-slate-800">{animatedPoints.toLocaleString()}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Modules Completed</p>
                <h3 className="text-2xl font-bold text-slate-800">{statsData.modulesCompleted}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Quizzes Taken</p>
                <h3 className="text-2xl font-bold text-slate-800">{statsData.quizzesTaken}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Average Score</p>
                <h3 className="text-2xl font-bold text-slate-800">{statsData.averageScore}</h3>
              </div>
            </div>
          </div>

          {/* Points Chart & Topic Mastery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Points Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800">Points Over Time</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-[#4EA24E]"></span> Cumulative Growth
                  </span>
                </div>
              </div>
              <div className="h-64">
                <PointsChart />
              </div>
            </div>

            {/* Topic Mastery */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Topic Mastery</h3>
              <div className="space-y-4">
                {topicMastery.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{item.topic}</span>
                      <span className="font-bold text-[#4EA24E]">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#4EA24E] h-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${progressBars[index]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-sm text-[#4EA24E] font-semibold border border-[#4EA24E] rounded-lg hover:bg-green-50 transition-colors">
                View Detailed Breakdown
              </button>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Learning Activity</h3>
              <span className="text-xs text-slate-500">243 sessions in the last year</span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex flex-wrap gap-1 min-w-[800px]">
                {heatmapData.map((color, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-sm ${color}`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-slate-400 uppercase tracking-wider">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
              <div className="w-3 h-3 rounded-sm bg-green-200"></div>
              <div className="w-3 h-3 rounded-sm bg-green-400"></div>
              <div className="w-3 h-3 rounded-sm bg-green-600"></div>
              <span>More</span>
            </div>
          </div>

          {/* Level Progress Roadmap */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-slate-800">Eco-Guardian Level 4</h3>
                <p className="text-sm text-slate-500">125 points until Level 5</p>
              </div>
              <div className="mt-4 md:mt-0 px-4 py-2 bg-[#4EA24E]/10 text-[#4EA24E] rounded-full text-sm font-bold">
                Current Title: Eco-Advocate
              </div>
            </div>
            <div className="relative py-10">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-[#4EA24E] -translate-y-1/2 transition-all duration-1000"
                style={{ width: `${roadmapProgress}%` }}
              ></div>
              {/* Level Dots */}
              <div className="relative flex justify-between z-10">
                {levels.map((level) => (
                  <div key={level.num} className={`flex flex-col items-center ${level.active ? 'scale-125' : ''}`}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${level.completed 
                        ? 'bg-[#4EA24E] text-white shadow-lg shadow-green-200' 
                        : level.active 
                          ? 'bg-white border-2 border-[#4EA24E] text-[#4EA24E] ring-4 ring-green-50'
                          : 'bg-slate-100 text-slate-400'
                      }
                    `}>
                      {level.num}
                    </div>
                    <span className={`text-[10px] mt-2 font-semibold ${
                      level.active ? 'text-[#4EA24E] font-bold uppercase' : 'text-slate-400'
                    }`}>
                      {level.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz History Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Quiz History</h3>
              <button className="text-sm text-[#4EA24E] font-medium">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Module Name</th>
                    <th className="px-6 py-4">Date Completed</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quizHistory.map((quiz, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">{quiz.name}</td>
                      <td className="px-6 py-4 text-slate-500">{quiz.date}</td>
                      <td className={`px-6 py-4 font-bold ${getScoreColor(quiz.score)}`}>{quiz.score}</td>
                      <td className="px-6 py-4">{getStatusBadge(quiz.status)}</td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-[#4EA24E]">
                          {quiz.status === 'passed' ? <Eye className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button className="text-xs font-semibold text-slate-500 hover:text-slate-800">View All Records</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProgress;
