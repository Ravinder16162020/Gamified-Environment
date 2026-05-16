import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Book,
  CheckSquare,
  Award,
  Bell,
  Calendar,
  ChevronDown,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import { getProgress } from '../../api';
import styles from './MyProgress.module.css';

const DEFAULT_PROGRESS = {
  user: {
    name: '',
    avatarUrl: '',
    levelLabel: 'Level 1',
    title: 'Eco-Explorer',
    streakLabel: '0 Day Streak',
    points: 0
  },
  stats: {
    totalPoints: 0,
    modulesCompleted: '0/8',
    quizzesTaken: 0,
    averageScore: '0%'
  },
  chart: {
    labels: [],
    values: []
  },
  topicMastery: [],
  heatmap: {
    cells: [],
    sessions: 0
  },
  roadmap: {
    currentLevel: 1,
    currentTitle: 'Eco-Explorer',
    pointsNeeded: 0,
    progress: 0,
    levels: []
  },
  quizHistory: []
};

const PERIOD_OPTIONS = ['30days', '90days', 'all'];

const getPeriodLabel = (period) => {
  if (period === '90days') return 'Last 90 Days';
  if (period === 'all') return 'All Time';
  return 'Last 30 Days';
};

const getStatusBadge = (status) => {
  if (status === 'passed') {
    return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">PASSED</span>;
  }

  return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold">RETRY</span>;
};

const getScoreColor = (score) => {
  const num = parseInt(score, 10);
  if (num >= 80) return 'text-[#4EA24E]';
  if (num >= 60) return 'text-orange-500';
  return 'text-red-500';
};

const getHeatmapColor = (count) => {
  if (count >= 3) return 'bg-green-600';
  if (count === 2) return 'bg-green-400';
  if (count === 1) return 'bg-green-200';
  return 'bg-slate-100';
};

const getInitials = (name = '') => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return initials || 'EP';
};

const PointsChart = ({ values }) => {
  if (!values.length) {
    return <div className="w-full h-full rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-sm text-slate-400">No chart data yet</div>;
  }

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = Math.max(maxValue - minValue, 1);
  const width = 100;
  const height = 100;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4EA24E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4EA24E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGradient)" />
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

const MyProgress = () => {
  const navigate = useNavigate();
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [progressData, setProgressData] = useState(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeFilter, setTimeFilter] = useState('30days');

  useEffect(() => {
    const loadProgress = async () => {
      const email = String(localStorage.getItem('userEmail') || '').trim();
      if (!email) {
        setLoading(false);
        setError('No signed in user found.');
        return;
      }

      try {
        setLoading(true);
        setError('');
        const data = await getProgress(email, timeFilter);
        setProgressData({
          ...DEFAULT_PROGRESS,
          ...data,
          user: {
            ...DEFAULT_PROGRESS.user,
            ...(data.user || {})
          },
          stats: {
            ...DEFAULT_PROGRESS.stats,
            ...(data.stats || {})
          },
          chart: {
            labels: Array.isArray(data.chart?.labels) ? data.chart.labels : [],
            values: Array.isArray(data.chart?.values) ? data.chart.values : []
          },
          topicMastery: Array.isArray(data.topicMastery) ? data.topicMastery : [],
          heatmap: {
            cells: Array.isArray(data.heatmap?.cells) ? data.heatmap.cells : [],
            sessions: Number(data.heatmap?.sessions || 0)
          },
          roadmap: {
            ...DEFAULT_PROGRESS.roadmap,
            ...(data.roadmap || {}),
            levels: Array.isArray(data.roadmap?.levels) ? data.roadmap.levels : []
          },
          quizHistory: Array.isArray(data.quizHistory) ? data.quizHistory : []
        });
      } catch (loadError) {
        setError(loadError?.message || 'Failed to load progress.');
        setProgressData(DEFAULT_PROGRESS);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [timeFilter]);

  useEffect(() => {
    const target = Number(progressData.stats.totalPoints || 0);
    let current = 0;
    const duration = 1200;
    const steps = Math.max(Math.floor(duration / 16), 1);
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedPoints(target);
        clearInterval(timer);
      } else {
        setAnimatedPoints(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [progressData.stats.totalPoints]);

  const progressBars = useMemo(
    () => progressData.topicMastery.map((item) => item.percentage),
    [progressData.topicMastery]
  );

  const roadmapProgress = Number(progressData.roadmap.progress || 0);
  const heatmapSessions = Number(progressData.heatmap.sessions || 0);

  const onCyclePeriod = () => {
    setTimeFilter((current) => {
      const index = PERIOD_OPTIONS.indexOf(current);
      return PERIOD_OPTIONS[(index + 1) % PERIOD_OPTIONS.length];
    });
  };

  const userInitials = getInitials(progressData.user.name);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />

      <main className="flex-1 ml-20">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="text-sm">Welcome back, <strong>{progressData.user.name || 'Learner'}</strong></span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
              <div className="text-right">
                <p className="text-xs font-semibold">{progressData.user.name || 'Learner'}</p>
                <p className="text-[10px] text-slate-500">{progressData.user.levelLabel}</p>
              </div>
              {progressData.user.avatarUrl ? (
                <img alt="Profile" className="w-10 h-10 rounded-full border border-slate-200 object-cover" src={progressData.user.avatarUrl} />
              ) : (
                <div className="w-10 h-10 rounded-full border border-slate-200 bg-[#4EA24E] text-white flex items-center justify-center text-sm font-bold">
                  {userInitials}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">My Progress</h1>
              <p className="text-slate-500 text-sm">Track your journey to becoming a sustainability expert.</p>
            </div>
            <button onClick={onCyclePeriod} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">{getPeriodLabel(timeFilter)}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {loading && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              Loading your progress...
            </div>
          )}

          {error && !loading && (
            <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
              {error}
            </div>
          )}

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
                <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.modulesCompleted}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Quizzes Taken</p>
                <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.quizzesTaken}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Average Score</p>
                <h3 className="text-2xl font-bold text-slate-800">{progressData.stats.averageScore}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
                <PointsChart values={progressData.chart.values} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6">Topic Mastery</h3>
              <div className="space-y-4">
                {progressData.topicMastery.map((item, index) => (
                  <div key={`${item.topic}-${index}`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{item.topic}</span>
                      <span className="font-bold text-[#4EA24E]">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#4EA24E] h-full transition-all duration-1000 ease-in-out"
                        style={{ width: `${progressBars[index] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {!progressData.topicMastery.length && (
                  <p className="text-sm text-slate-500">No topic mastery data yet.</p>
                )}
              </div>
              <button className="w-full mt-6 py-2 text-sm text-[#4EA24E] font-semibold border border-[#4EA24E] rounded-lg hover:bg-green-50 transition-colors">
                View Detailed Breakdown
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Learning Activity</h3>
              <span className="text-xs text-slate-500">{heatmapSessions} sessions in the last year</span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex flex-wrap gap-1 min-w-[800px]">
                {(progressData.heatmap.cells || []).map((count, index) => (
                  <div key={index} className={`w-3 h-3 rounded-sm ${getHeatmapColor(count)}`}></div>
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

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-slate-800">{progressData.roadmap.currentLevel === 1 ? 'Eco-Seed' : `Eco-Guardian Level ${progressData.roadmap.currentLevel}`}</h3>
                <p className="text-sm text-slate-500">
                  {progressData.roadmap.pointsNeeded} points until Level {Math.min(progressData.roadmap.currentLevel + 1, 10)}
                </p>
              </div>
              <div className="mt-4 md:mt-0 px-4 py-2 bg-[#4EA24E]/10 text-[#4EA24E] rounded-full text-sm font-bold">
                Current Title: {progressData.roadmap.currentTitle}
              </div>
            </div>
            <div className="relative py-10">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-[#4EA24E] -translate-y-1/2 transition-all duration-1000"
                style={{ width: `${roadmapProgress}%` }}
              ></div>
              <div className="relative flex justify-between z-10">
                {(progressData.roadmap.levels || []).map((level) => (
                  <div key={level.num} className={`flex flex-col items-center ${level.active ? 'scale-125' : ''}`}>
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                        ${level.completed
                          ? 'bg-[#4EA24E] text-white shadow-lg shadow-green-200'
                          : level.active
                            ? 'bg-white border-2 border-[#4EA24E] text-[#4EA24E] ring-4 ring-green-50'
                            : 'bg-slate-100 text-slate-400'
                        }
                      `}
                    >
                      {level.num}
                    </div>
                    <span className={`text-[10px] mt-2 font-semibold ${level.active ? 'text-[#4EA24E] font-bold uppercase' : 'text-slate-400'}`}>
                      {level.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                  {progressData.quizHistory.map((quiz, index) => (
                    <tr key={`${quiz.name}-${index}`} className="hover:bg-slate-50 transition-colors">
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
                  {!progressData.quizHistory.length && (
                    <tr>
                      <td className="px-6 py-8 text-sm text-slate-500" colSpan={5}>
                        No quiz history yet.
                      </td>
                    </tr>
                  )}
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