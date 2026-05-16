import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Flame, CheckCircle2, Timer, PlayCircle, Zap as ZapIcon, Map, History, Medal, ShieldCheck, Target, TrendingUp, Cpu, Microscope } from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import StreakBrokenpopup from '../../popup/StreakBrokenpopup';
import { getEcoDashboard } from '../../api';
import styles from './EcoDashboard.module.css';

const EcoDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showStreakBrokenPopup, setShowStreakBrokenPopup] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);

  const user = dashboard?.user || {};
  const overview = dashboard?.overview || {};
  const stats = dashboard?.stats || {};
  const quickActions = dashboard?.quickActions || {};
  const learningPath = dashboard?.learningPath || {};
  const recentActivity = Array.isArray(dashboard?.recentActivity) ? dashboard.recentActivity : [];
  const leaderboardPreview = Array.isArray(dashboard?.leaderboardPreview) ? dashboard.leaderboardPreview : [];

  useEffect(() => {
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const savedStreak = localStorage.getItem('currentStreak');
    const currentTime = Date.now();
    const currentStreak = savedStreak ? parseInt(savedStreak, 10) : 7;

    if (lastLoginTime) {
      const previousLogin = parseInt(lastLoginTime, 10);
      const hoursSinceLastLogin = (currentTime - previousLogin) / (1000 * 60 * 60);

      if (hoursSinceLastLogin > 24) {
        setPreviousStreak(Number.isNaN(currentStreak) ? 0 : currentStreak);
        setShowStreakBrokenPopup(true);
        localStorage.setItem('currentStreak', '0');
      }
    }

    localStorage.setItem('lastLoginTime', String(currentTime));
  }, []);

  useEffect(() => {
    const userEmail = String(localStorage.getItem('userEmail') || '').trim();

    if (!userEmail) {
      setLoadError('Missing user session. Please log in again.');
      setIsLoading(false);
      return;
    }

    const loadDashboard = async () => {
      try {
        const data = await getEcoDashboard(userEmail);
        setDashboard(data);
        localStorage.setItem('xp', String(data?.stats?.totalPoints || 0));
        window.dispatchEvent(new CustomEvent('ecoSprintProfileUpdated', { detail: data?.user || {} }));
      } catch (error) {
        setLoadError(error.message || 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleCloseStreakPopup = () => {
    setShowStreakBrokenPopup(false);
  };

  return (
    <div className={`h-screen bg-[#F8FAFC] font-sans text-[#0F172A] overflow-hidden ${showStreakBrokenPopup ? 'opacity-40 grayscale-[0.5]' : ''}`}>
      {showStreakBrokenPopup && <StreakBrokenpopup onClose={handleCloseStreakPopup} previousStreak={previousStreak} />}
      <SidebarEcoDboard />
      <main className="ml-20 h-full w-[calc(100%-5rem)] overflow-y-auto bg-[#F8FAFC] px-6 py-6">
        <div className="w-full space-y-8">
          {isLoading ? (
            <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4EA24E]">Loading EcoSprint</p>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">Preparing your dashboard</h1>
              <p className="mt-2 text-sm text-slate-500">We are pulling your real progress, rank, and activity from the backend.</p>
            </section>
          ) : loadError ? (
            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm">
              <h1 className="text-2xl font-bold">Dashboard unavailable</h1>
              <p className="mt-2 text-sm">{loadError}</p>
            </section>
          ) : (
            <>
              <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4EA24E] to-[#68C068] p-8 text-white shadow-lg ${styles.welcomeBanner}`}>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 animate-pulse"></div>
                <div className="absolute bottom-0 right-20 -mb-10 h-40 w-40 rounded-full bg-white/5 animate-pulse"></div>
                <div className="relative z-10 flex flex-col gap-6 md:items-start">
                  <div>
                    <h1 className="mb-2 text-3xl font-bold">{overview.welcomeMessage || `Welcome back, ${user.name || 'Learner'}!`} 👋</h1>
                    <p className="max-w-lg text-white/80">
                      You completed <span className="text-lg font-bold text-white">{overview.completedThisWeek || 0} challenges</span> this week. Your current school rank is <span className="font-bold text-white">{overview.rankLabel || `#${stats.schoolRank || '--'}`}</span>.
                    </p>
                    <button type="button" onClick={() => navigate('/modules')} className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#4EA24E] shadow-xl transition-all hover:bg-slate-50">
                      Continue Learning <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className={`rounded-[12px] border border-slate-100 bg-white p-5 shadow-md ${styles.hoverLift}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-green-50 p-2 text-[#4EA24E]"><Star className="h-6 w-6" /></div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#059669]">Live</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Total Points</p>
                  <h3 className="text-2xl font-bold">{Number(stats.totalPoints || 0).toLocaleString()}</h3>
                </div>
                <div className={`rounded-[12px] border border-slate-100 bg-white p-5 shadow-md ${styles.hoverLift}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-orange-50 p-2 text-orange-500"><Flame className="h-6 w-6" /></div>
                    <span className="rounded bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-400">Personal Best</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Daily Streak</p>
                  <h3 className="text-2xl font-bold">{Number(stats.streakDays || 0)} Days</h3>
                </div>
                <div className={`rounded-[12px] border border-slate-100 bg-white p-5 shadow-md ${styles.hoverLift}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-emerald-50 p-2 text-[#10B981]"><CheckCircle2 className="h-6 w-6" /></div>
                    <span className="rounded bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-400">From history</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Challenges</p>
                  <h3 className="text-2xl font-bold">{Number(stats.challengesCompleted || 0)}</h3>
                </div>
                <div className={`rounded-[12px] border border-slate-100 bg-white p-5 shadow-md ${styles.hoverLift}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-green-50 p-2 text-[#4EA24E]"><Star className="h-6 w-6" /></div>
                    <div className="rounded-lg bg-green-50 p-2 text-[#4EA24E]"><Star className="h-6 w-6" /></div>
                  </div>
                  <p className="text-sm font-medium text-slate-500">School Rank</p>
                  <h3 className="text-2xl font-bold">#{stats.schoolRank || '--'}</h3>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="group rounded-[12px] border-l-4 border-[#F59E0B] bg-white p-6 shadow-md transition-all hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{quickActions.dailyChallenge?.title || 'Daily Challenge'}</h4>
                      <p className="mt-1 text-xs text-slate-500">{quickActions.dailyChallenge?.question || 'Your next challenge is waiting.'}</p>
                    </div>
                    <div className="rounded-lg bg-amber-50 p-2 text-[#F59E0B] transition-transform group-hover:scale-110"><Timer className="h-5 w-5" /></div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F59E0B]">+{quickActions.dailyChallenge?.reward || 0} XP Reward</span>
                    <span className="text-slate-400">{quickActions.dailyChallenge?.expiresLabel || 'Available now'}</span>
                  </div>
                </div>
                <div className="group rounded-[12px] border-l-4 border-[#4EA24E] bg-white p-6 shadow-md transition-all hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{quickActions.continueLearning?.title || 'Continue Learning'}</h4>
                      <p className="mt-1 text-xs text-slate-500">{quickActions.continueLearning?.subtitle || 'Resume your path'}</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-2 text-[#4EA24E] transition-transform group-hover:scale-110"><PlayCircle className="h-5 w-5" /></div>
                  </div>
                  <div className="mb-2 h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 rounded-full bg-[#4EA24E]" style={{ width: `${Math.min(100, Math.max(0, Number(quickActions.continueLearning?.progress || 0)))}%` }}></div>
                  </div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">{Math.round(Number(quickActions.continueLearning?.progress || 0))}% Through</p>
                </div>
                <div className="group rounded-[12px] border-l-4 border-[#10B981] bg-white p-6 shadow-md transition-all hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{quickActions.weeklySpecial?.title || 'Weekly Special'}</h4>
                      <p className="mt-1 text-xs text-slate-500">{quickActions.weeklySpecial?.note || 'Limited time'}</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-2 text-[#10B981] transition-transform group-hover:scale-110"><ZapIcon className="h-5 w-5" /></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-[#10B981]">{quickActions.weeklySpecial?.reward || '2X POINTS'}</span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">Limited Time</span>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xl font-bold"><Map className="h-6 w-6 text-[#4EA24E]" /> {learningPath.title || 'My Learning Path'}</h2>
                  <button type="button" onClick={() => navigate('/modules')} className="text-sm font-semibold text-[#4EA24E] hover:underline">View All Modules</button>
                </div>
                <div className="overflow-x-auto px-10 py-4">
                  <div className="relative z-10 flex min-w-[600px] justify-between">
                    {(learningPath.steps || [
                      { label: 'Basics', completed: true },
                      { label: 'Logic', completed: true },
                      { label: 'Patterns', active: true },
                      { label: 'Analysis', completed: false },
                      { label: 'Mastery', completed: false }
                    ]).map((step) => {
                      const isActive = Boolean(step.active);
                      const isCompleted = Boolean(step.completed);
                      return (
                        <div key={step.label} className="flex flex-col items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${isCompleted ? 'bg-[#4EA24E] text-white' : isActive ? 'animate-pulse border-4 border-[#4EA24E] bg-white text-[#4EA24E] ring-8 ring-green-50' : 'border-2 border-dashed border-slate-200 bg-slate-100 text-slate-400'}`}>
                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : isActive ? <Cpu className="h-6 w-6" /> : <Microscope className="h-5 w-5" />}
                          </div>
                          <span className={`text-xs font-bold ${isActive ? 'text-[#4EA24E]' : 'text-slate-600'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-6 flex items-center gap-2 text-lg font-bold"><History className="h-5 w-5 text-[#4EA24E]" /> Recent Activity</h3>
                  <div className="space-y-6">
                    {recentActivity.length ? recentActivity.map((item, index) => (
                      <div className="flex gap-4" key={`${item.title}-${index}`}>
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${item.tone === 'success' ? 'bg-emerald-100 text-[#10B981]' : item.tone === 'warning' ? 'bg-amber-100 text-[#F59E0B]' : 'bg-slate-100 text-slate-500'}`}>
                          {item.tone === 'success' ? <ShieldCheck className="h-5 w-5" /> : item.tone === 'warning' ? <Target className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.detail}</p>
                        </div>
                      </div>
                    )) : <p className="text-sm text-slate-500">No recent activity yet.</p>}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-lg font-bold"><Medal className="h-5 w-5 text-[#F59E0B]" /> Leaderboard</h3>
                    <button type="button" onClick={() => navigate('/leaderboard')} className="text-xs font-bold uppercase text-slate-400 transition-colors hover:text-[#4EA24E]">Full Standings</button>
                  </div>
                  <div className="space-y-3">
                    {leaderboardPreview.length ? leaderboardPreview.map((member) => (
                      <div className={`flex items-center justify-between rounded-xl p-3 ${member.isCurrentUser ? 'border border-[#4EA24E] bg-green-50' : 'bg-slate-50'}`} key={`${member.name}-${member.rank}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-6 text-sm font-bold ${member.rank === 1 ? 'text-[#F59E0B]' : 'text-slate-400'}`}>{member.rank}</span>
                          {member.avatarUrl ? (
                            <img alt={member.name} className="h-8 w-8 rounded-full border border-slate-200 object-cover" src={member.avatarUrl} />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">{(member.name || 'EP').split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div>
                          )}
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${member.isCurrentUser ? 'text-[#4EA24E]' : 'text-slate-800'}`}>{member.points.toLocaleString()} XP</span>
                      </div>
                    )) : <p className="text-sm text-slate-500">No leaderboard entries yet.</p>}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EcoDashboard;