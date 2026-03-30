import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Flame, CheckCircle2, Timer, PlayCircle, Zap as ZapIcon, Map, History, Medal, ShieldCheck, Target, TrendingUp, Cpu, Microscope, Rocket } from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import StreakBrokenpopup from '../../popup/StreakBrokenpopup';
import styles from './EcoDashboard.module.css';

const EcoDashboard = () => {
  const [showStreakBrokenPopup, setShowStreakBrokenPopup] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(7);

  // Check if streak is broken on component mount (login)
  useEffect(() => {
    // Get last login time from localStorage
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const savedStreak = localStorage.getItem('currentStreak');
    const currentTime = new Date().getTime();
    
    // Convert saved streak to number, default to 7 if not found
    const currentStreak = savedStreak ? parseInt(savedStreak, 10) : 7;
    
    if (lastLoginTime) {
      const lastLogin = parseInt(lastLoginTime, 10);
      const hoursSinceLastLogin = (currentTime - lastLogin) / (1000 * 60 * 60);
      
      // If more than 24 hours passed, streak is broken
      if (hoursSinceLastLogin > 24) {
        setPreviousStreak(currentStreak);
        setShowStreakBrokenPopup(true);
        // Reset streak to 0 in localStorage
        localStorage.setItem('currentStreak', '0');
      }
    }
    
    // Update last login time
    localStorage.setItem('lastLoginTime', currentTime.toString());
  }, []);

  const handleCloseStreakPopup = () => {
    setShowStreakBrokenPopup(false);
  };
  return (
    <div className={`h-screen bg-[#F8FAFC] font-sans text-[#0F172A] overflow-hidden ${showStreakBrokenPopup ? 'opacity-40 grayscale-[0.5]' : ''}`}>
      {showStreakBrokenPopup && (
        <StreakBrokenpopup 
          onClose={handleCloseStreakPopup}
          previousStreak={previousStreak}
        />
      )}
      <SidebarEcoDboard />
      <main className="ml-20 h-full overflow-y-auto bg-[#F8FAFC] p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* SECTION 1: Welcome Banner */}
            <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4EA24E] to-[#68C068] p-8 text-white shadow-lg ${styles.welcomeBanner}`}>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 right-20 -mb-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
                  <p className="text-white/80 max-w-lg">
                    You've completed <span className="font-bold text-white text-lg">12 challenges</span> this week. You're in the top 5% of learners in your school. Keep up the momentum!
                  </p>
                  <button className="mt-6 bg-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-[#4EA24E]">
                    Continue Learning <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 2: Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 ${styles.hoverLift} rounded-[12px] shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-50 text-[#4EA24E] rounded-lg"><Star className="w-6 h-6" /></div>
                  <span className="text-[11px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded">+150 Today</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Total Points</p>
                <h3 className="text-2xl font-bold">1,250</h3>
              </div>
              <div className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 ${styles.hoverLift} rounded-[12px] shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Flame className="w-6 h-6" /></div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">Personal Best</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Daily Streak</p>
                <h3 className="text-2xl font-bold">7 Days</h3>
              </div>
              <div className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 ${styles.hoverLift} rounded-[12px] shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-emerald-50 text-[#10B981] rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">46% Complete</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Challenges</p>
                <h3 className="text-2xl font-bold">23/50</h3>
              </div>
              <div className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-100 ${styles.hoverLift} rounded-[12px] shadow-md`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-50 text-[#4EA24E] rounded-lg"><Star className="w-6 h-6" /></div>
                  <div className="p-2 bg-green-50 text-[#4EA24E] rounded-lg"><Star className="w-6 h-6" /></div>
                </div>
                <p className="text-slate-500 text-sm font-medium">School Rank</p>
                <h3 className="text-2xl font-bold">#45</h3>
              </div>
            </section>

            {/* SECTION 3: Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-6 rounded-2xl border-l-4 border-[#F59E0B] shadow-sm hover:shadow-md transition-all cursor-pointer rounded-[12px] shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Daily Challenge</h4>
                    <p className="text-xs text-slate-500 mt-1">Logic Puzzles • 10 Mins</p>
                  </div>
                  <div className="p-2 bg-amber-50 text-[#F59E0B] rounded-lg group-hover:scale-110 transition-transform"><Timer className="w-5 h-5" /></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#F59E0B]">+50 XP Reward</span>
                  <span className="text-slate-400">Expires in 4h</span>
                </div>
              </div>
              <div className="group bg-white p-6 rounded-2xl border-l-4 border-[#4EA24E] shadow-sm hover:shadow-md transition-all cursor-pointer rounded-[12px] shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Continue Learning</h4>
                    <p className="text-xs text-slate-500 mt-1">Pattern Recognition</p>
                  </div>
                  <div className="p-2 bg-green-50 text-[#4EA24E] rounded-lg group-hover:scale-110 transition-transform"><PlayCircle className="w-5 h-5" /></div>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mb-2">
                  <div className="bg-[#4EA24E] h-1.5 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">60% Through</p>
              </div>
              <div className="group bg-white p-6 rounded-2xl border-l-4 border-[#10B981] shadow-sm hover:shadow-md transition-all cursor-pointer rounded-[12px] shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Weekly Special</h4>
                    <p className="text-xs text-slate-500 mt-1">Team Battle</p>
                  </div>
                  <div className="p-2 bg-emerald-50 text-[#10B981] rounded-lg group-hover:scale-110 transition-transform"><ZapIcon className="w-5 h-5" /></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-[#10B981] text-[10px] font-black px-2 py-0.5 rounded">2X POINTS</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Limited Time</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: Learning Path */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2"><Map className="w-6 h-6 text-[#4EA24E]" /> My Learning Path</h2>
                <a className="text-[#4EA24E] text-sm font-semibold hover:underline" href="#">View All Modules</a>
              </div>
              <div className="relative px-10 py-4 overflow-x-auto">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0 mx-10"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-[#4EA24E] -translate-y-1/2 z-0 mx-10" style={{width: '50%'}}></div>
                <div className="relative z-10 flex justify-between min-w-[600px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-[#4EA24E] text-white rounded-full flex items-center justify-center shadow-lg"><CheckCircle2 className="w-6 h-6" /></div>
                    <span className="text-xs font-bold text-slate-600">Basics</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-[#4EA24E] text-white rounded-full flex items-center justify-center shadow-lg"><CheckCircle2 className="w-6 h-6" /></div>
                    <span className="text-xs font-bold text-slate-600">Logic</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-white border-4 rounded-full flex items-center justify-center shadow-xl animate-pulse ring-8 border-[#4EA24E] text-[#4EA24E] ring-green-50"><Cpu className="w-6 h-6" /></div>
                    <span className="text-xs font-bold text-[#4EA24E]">Patterns</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200"><Microscope className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-slate-400">Analysis</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200"><Rocket className="w-5 h-5" /></div>
                    <span className="text-xs font-bold text-slate-400">Mastery</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: Two-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><History className="w-5 h-5 text-[#4EA24E]" /> Recent Activity</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Badge Earned: <span className="text-purple-600">Logic Master</span></p>
                      <p className="text-xs text-slate-400">2 hours ago • Module: Advanced Logic</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-[#10B981] rounded-full flex items-center justify-center"><Target className="w-5 h-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Challenge Completed: <span className="text-[#10B981]">Quick Math #12</span></p>
                      <p className="text-xs text-slate-400">5 hours ago • Earned 30 XP</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-[#4EA24E] rounded-full flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Rank Up! Moved to <span className="text-[#4EA24E]">#45</span> in School</p>
                      <p className="text-xs text-slate-400">Yesterday • 150 points gained</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Leaderboard Preview */}
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Medal className="w-5 h-5 text-[#F59E0B]" /> Leaderboard</h3>
                  <a className="text-xs font-bold text-slate-400 hover:text-[#4EA24E] transition-colors uppercase" href="#">Full Standings</a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-sm font-bold text-[#F59E0B]">1</span>
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                        <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACFYeC-26AWDHU_xYA0U1HgEgq7u987IWInH-NTxWMixElNRVJeEUBUtgKjjBJtibEZL44YhGBA89MJ4l8QBJYslmiZrJwsQQA_FPoCL6VRSMAo6oykzvrTVFsyxrYeJf7pf9YmXyFlgkHVtCuvAmzyAUpThPX_mPVp2TYpdrZOmdBOHd5LApLL-dT5h_2yWexHfaruBZ8DcjWX3iUWvzUd8ornuu_nDHvYYkp_vJXpgfmZ7KXqUsikE0qSJKytBhNQRTi05YJ3A" />
                      </div>
                      <span className="text-sm font-medium">Sarah Jenkins</span>
                    </div>
                    <span className="text-sm font-bold">2,450 XP</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-sm font-bold text-slate-400">2</span>
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                        <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_BzpDmN64tAzGV6Rb2WKZGhkoaOLaPQ847Hyn4tN-TbiKUAoyJIwhWV_-NWGOzlX8nX3MeeJJcJqB0M9GfziV61dFXZGBPhLBiMxmqj_xpplv18esn6KcE-RRHIKBW3K-kuONALHEA-HEG8vpJAuyL5DNGABnSjHhGk5IcOvoQvM_ujXSWy-sIY1tQCGj28pUwq31siKzx9hcmSdjGY30cK_4hWaOaWcx86Z6vNcE7GpFmp6u6MUvBsNh3mIiPy5b8Q6qIwP_qw" />
                      </div>
                      <span className="text-sm font-medium">Liam Thorne</span>
                    </div>
                    <span className="text-sm font-bold">2,120 XP</span>
                  </div>
                  <div className="border-t border-slate-100 my-2"></div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-sm font-bold text-[#4EA24E]">45</span>
                      <div className="w-8 h-8 rounded-full bg-white border border-[#4EA24E] overflow-hidden">
                        <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA" />
                      </div>
                      <span className="text-sm font-bold text-[#4EA24E]">Alex Rivera (You)</span>
                    </div>
                    <span className="text-sm font-bold text-[#4EA24E]">1,250 XP</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
    </div>
  );
};

export default EcoDashboard;
