import React, { useState } from 'react';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './Leaderboard.module.css';

// SVG Icons
const FireIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 3h15l2.5 5-10 13L2 8l2.5-5z"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const KingIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 4l2 6h16l2-6-6 4V4l-4 6-4-6v4z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14l5-5 5 5z"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5 5 5-5z"/>
  </svg>
);

const MinusIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="11" width="12" height="2"/>
  </svg>
);

const ExpandIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m18 15-6-6-6 6"/>
  </svg>
);

// Leaderboard data
const leaderboardData = {
  week: {
    podium: [
      { rank: 2, name: 'ByteMistress', xp: '4,820', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXlfRoGOxRKom5PYeTIVOJfw9o7GcyQ57w1W2EthoPp4dhVsj6CTXucicelEFl3ZLtyIIEtt1CSFusTZx-Fe3moqLnbwBmMRHYGxc9XmTlVr4N8jBMKvkRxRl9vq4zpnWli0_PVO6QBvsQysEbx81wIJKmZuN3dJOQIamf8N7iAJnYho6XUchDZBWFxFCJFezSVxQKUR_ruB-ztWYpX79eiWZkLedgYgTWkoG3IzdZKcPeI3k5SaFHHwSkx4bZC3jEuRvn0gjmFQ' },
      { rank: 1, name: 'KernelPanic', xp: '5,150', streak: '152 Day Streak', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg9qhG8ivP5ZdqKAy-7ElzjoS9bcqlsUeVMxoHQRQKVRVkTfkndKZVWEahCriMyZzHhJ9VE8TtolqGZyG6aSfuncxd1E0ZUas0waeLtDu0d9g0Zp28tysZtlkhCD07hs-s3YBDVhqhfynQxnoj92Sd6oe54P_J7nZVAudgRA5iBJ9mSWVrNZw4DeUUpFO64I8e8yJhgBpCPJdwXuGY5kfq475rAq4K9RLh_2qpkuE964Dcr3KA2tPPa7k6trd2OCeugAvPjsCSGQ' },
      { rank: 3, name: 'RecursionX', xp: '4,110', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FsPR_24UbOYcDF4CIurGGiBJOzpX4UoDMc_l2MntS5H9ioMkKzNG7OhrmZ16bkTTVr6q788S5b2k6I2FQVKdEIklHE8cm_2lR45ccFVRoGa9cpzwBnAQ-sjWufRGnyZjQtaU1w8FPDHL-iBlYXm0cEtYB2ng8ysaip_Gymu-UEK4bhAnNztG8LKTjwEIfFyXJHJy051E1o1b_i8azvhjUNaOyZ4LHv2DOGJhWu3coo0z8rPzHmFBkLzACRQj3-Nc7XOszw5sWA' }
    ],
    table: [
      { rank: '04', name: 'StackOverflowed', xp: '3,850', streak: '42', change: 'up' },
      { rank: '41', name: 'SyntaxSorcerer', xp: '1,310', streak: '12', change: 'down' },
      { rank: '42', name: 'Felix', xp: '1,250', streak: '12', change: 'up', user: true },
      { rank: '43', name: 'NullPointer', xp: '1,210', streak: '3', change: 'none' },
      { rank: '44', name: 'DataDiva', xp: '1,180', streak: '8', change: 'down' }
    ]
  },
  month: {
    podium: [
      { rank: 2, name: 'KernelPanic', xp: '21,120', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg9qhG8ivP5ZdqKAy-7ElzjoS9bcqlsUeVMxoHQRQKVRVkTfkndKZVWEahCriMyZzHhJ9VE8TtolqGZyG6aSfuncxd1E0ZUas0waeLtDu0d9g0Zp28tysZtlkhCD07hs-s3YBDVhqhfynQxnoj92Sd6oe54P_J7nZVAudgRA5iBJ9mSWVrNZw4DeUUpFO64I8e8yJhgBpCPJdwXuGY5kfq475rAq4K9RLh_2qpkuE964Dcr3KA2tPPa7k6trd2OCeugAvPjsCSGQ' },
      { rank: 1, name: 'BitMaster', xp: '22,450', streak: '88 Day Streak', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQBN1Zd48xMES4XMIIoVRpGkYktsJ4M0zFmQhbrjIZEyt_o-nWuPU246ReyEYEaAeLZhuSsiteXm1izqi_kpfTYe8AfMFCxcjIQcgrhHPGVOPXygwO06MQHowGFExx9clBo0eoCSnxbQT58pvht1iUSFDTOuFFn39Fx6ypADXv-rHz7j2wnaiX8nIlFr__8BWtvOjkx9CC-7_WKmbhqtE5ButGdFhaO4NE2utjMjDRKxWUobDCAeAqvUYYDotwZGlrlDGjMXi7iQ' },
      { rank: 3, name: 'DataDiva', xp: '18,800', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmfTiReYxPhVEYWdvw8rCs0u07JCu6S96kFgjzEFQbFhPGhjtijvzKXZV7GfLw2yKRR30egyVsiQLRJbrDYNR9TZatXcCHg7S_dkTsPbyeITajYihAiV-zMk2bA4AD1r4xafsAf7CDXNmg-QpbPD61lbNVhRWS2pG9FD7MSBp-VPfodgG04_vPI64_Gmd8-iByO8iUF7yaEwjX_s39u5shA5FkihY9Nh-pT7lSuzdYB6-knpnW2-UnY1JwkQNPbFuLbphz85SMtw' }
    ],
    table: [
      { rank: '04', name: 'SyntaxSorcerer', xp: '15,200', streak: '152', change: 'up' },
      { rank: '41', name: 'StackOverflowed', xp: '5,400', streak: '22', change: 'down' },
      { rank: '42', name: 'Felix', xp: '5,100', streak: '12', change: 'up', user: true },
      { rank: '43', name: 'RecursionX', xp: '4,820', streak: '30', change: 'down' }
    ]
  },
  alltime: {
    podium: [
      { rank: 2, name: 'RecursionX', xp: '780,450', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9FsPR_24UbOYcDF4CIurGGiBJOzpX4UoDMc_l2MntS5H9ioMkKzNG7OhrmZ16bkTTVr6q788S5b2k6I2FQVKdEIklHE8cm_2lR45ccFVRoGa9cpzwBnAQ-sjWufRGnyZjQtaU1w8FPDHL-iBlYXm0cEtYB2ng8ysaip_Gymu-UEK4bhAnNztG8LKTjwEIfFyXJHJy051E1o1b_i8azvhjUNaOyZ4LHv2DOGJhWu3coo0z8rPzHmFBkLzACRQj3-Nc7XOszw5sWA' },
      { rank: 1, name: 'LegendaryCoder', xp: '850,200', streak: '1,000 Day Streak', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXlfRoGOxRKom5PYeTIVOJfw9o7GcyQ57w1W2EthoPp4dhVsj6CTXucicelEFl3ZLtyIIEtt1CSFusTZx-Fe3moqLnbwBmMRHYGxc9XmTlVr4N8jBMKvkRxRl9vq4zpnWli0_PVO6QBvsQysEbx81wIJKmZuN3dJOQIamf8N7iAJnYho6XUchDZBWFxFCJFezSVxQKUR_ruB-ztWYpX79eiWZkLedgYgTWkoG3IzdZKcPeI3k5SaFHHwSkx4bZC3jEuRvn0gjmFQ' },
      { rank: 3, name: 'KernelPanic', xp: '750,000', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg9qhG8ivP5ZdqKAy-7ElzjoS9bcqlsUeVMxoHQRQKVRVkTfkndKZVWEahCriMyZzHhJ9VE8TtolqGZyG6aSfuncxd1E0ZUas0waeLtDu0d9g0Zp28tysZtlkhCD07hs-s3YBDVhqhfynQxnoj92Sd6oe54P_J7nZVAudgRA5iBJ9mSWVrNZw4DeUUpFO64I8e8yJhgBpCPJdwXuGY5kfq475rAq4K9RLh_2qpkuE964Dcr3KA2tPPa7k6trd2OCeugAvPjsCSGQ' }
    ],
    table: [
      { rank: '04', name: 'BitMaster', xp: '120,500', streak: '365', change: 'none' },
      { rank: '41', name: 'DataDiva', xp: '85,400', streak: '180', change: 'up' },
      { rank: '42', name: 'Felix', xp: '82,150', streak: '12', change: 'up', user: true },
      { rank: '43', name: 'StackOverflowed', xp: '78,900', streak: '42', change: 'down' }
    ]
  }
};

const ChangeIcon = ({ change }) => {
  if (change === 'up') return <span className="text-[#57dea0]"><ArrowUpIcon /></span>;
  if (change === 'down') return <span className="text-[#ffb4ab]"><ArrowDownIcon /></span>;
  return <span className="text-[#899299]"><MinusIcon /></span>;
};

const Leaderboard = () => {
  const [filter, setFilter] = useState('week');
  
  const currentData = leaderboardData[filter];
  const [silver, gold, bronze] = currentData.podium;

  return (
    <div className="bg-[#121316] text-[#e3e2e6] font-sans h-screen flex overflow-hidden">
      <JourneySidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col ml-16">
        {/* TopAppBar */}
        <header className="sticky top-0 right-0 w-full z-40 bg-[#121316]/70 backdrop-blur-xl border-b border-[#3f484e]/15 px-8 h-20 flex justify-end items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1f1f23] rounded-full">
              <span className="text-[#E85A18] text-sm"><FireIcon /></span>
              <span className="text-sm font-bold">12</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1f1f23] rounded-full">
              <span className="text-[#2087B3] text-sm"><DiamondIcon /></span>
              <span className="text-sm font-bold">2,450</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1f1f23] rounded-full">
              <span className="text-[#FFB800] text-sm"><BoltIcon /></span>
              <span className="text-sm font-bold">480</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="pt-8 pb-12 px-6 max-w-[1600px] mx-auto w-full">
          {/* Hero Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 px-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#FFB800] text-4xl"><TrophyIcon /></span>
                <h2 className="text-4xl font-extrabold tracking-tight">Leaderboard</h2>
              </div>
              <p className="text-[#bec8cf] font-medium">Rank among the finest architects of the Neon Forge.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d2800] text-[#FFB800] rounded-lg border border-[#FFB800]/20 font-bold text-xs tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse"></span>
              Rookie League · Season 1
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 px-2">
            {/* Rank Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#0E4A66] to-[#0a2d40] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2087B3]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="relative z-10">
                <div className="text-[#7bd0ff] text-xs font-bold uppercase tracking-widest mb-1">Your Standing</div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black text-white">#42</span>
                  <span className="text-[#ffb3b0] font-bold text-sm flex items-center">
                    ↑ +5 places
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-white/70 text-sm font-medium">Current XP</span>
                    <span className="text-xl font-bold text-white">1,250 <span className="text-xs text-white/50">XP</span></span>
                  </div>
                  <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#2087B3] h-full w-[65%] shadow-[0_0_8px_rgba(32,135,179,0.6)]"></div>
                  </div>
                  <p className="text-xs text-white/40 italic">750 XP to reach #41</p>
                </div>
              </div>
            </div>

            {/* League Banner / Countdown */}
            <div className="lg:col-span-8 bg-[#1a1b1e] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 border border-[#3f484e]/10">
              <div className="w-24 h-24 bg-[#292a2d] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                <span className="text-[#899299]"><ShieldIcon /></span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Promotion Zone</h3>
                <p className="text-[#bec8cf] text-sm mb-4 leading-relaxed">You are in the top 15% of the Rookie League. Keep your streak to advance to the <span className="text-[#E85A18] font-bold">Vanguard League</span> next season.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="px-4 py-2 bg-[#1f1f23] rounded-lg border border-[#3f484e]/10 flex flex-col items-center">
                    <span className="text-xs text-[#899299] font-bold">DAYS</span>
                    <span className="text-xl font-bold">03</span>
                  </div>
                  <div className="px-4 py-2 bg-[#1f1f23] rounded-lg border border-[#3f484e]/10 flex flex-col items-center">
                    <span className="text-xs text-[#899299] font-bold">HRS</span>
                    <span className="text-xl font-bold">14</span>
                  </div>
                  <div className="px-4 py-2 bg-[#1f1f23] rounded-lg border border-[#3f484e]/10 flex flex-col items-center">
                    <span className="text-xs text-[#899299] font-bold">MINS</span>
                    <span className="text-xl font-bold">22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Podium Section */}
          <div className="mb-16 pt-10">
            <div className="flex flex-col md:flex-row justify-center items-end gap-0 md:gap-4 max-w-4xl mx-auto px-4">
              {/* Silver (#2) */}
              <div className="flex-1 w-full md:w-auto order-2 md:order-1 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-[#C0C0C0] p-1 shadow-[0_0_15px_rgba(192,192,192,0.3)]">
                    <img alt="Silver" className="w-full h-full rounded-full bg-[#292a2d] object-cover" src={silver.img}/>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C0C0C0] text-[#121316] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">#2</div>
                </div>
                <div className="bg-[#292a2d] w-full md:w-48 h-32 rounded-t-xl flex flex-col items-center justify-center p-4 border-t border-x border-[#3f484e]/10">
                  <span className="font-bold text-[#e3e2e6]">{silver.name}</span>
                  <span className="text-xs text-[#899299]">{silver.xp} XP</span>
                </div>
              </div>

              {/* Gold (#1) */}
              <div className="flex-1 w-full md:w-auto order-1 md:order-2 flex flex-col items-center -translate-y-4">
                <div className="relative mb-6">
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"><KingIcon /></span>
                  <div className="w-28 h-28 rounded-full border-4 border-[#FFD700] p-1 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                    <img alt="Gold" className="w-full h-full rounded-full bg-[#292a2d] object-cover" src={gold.img}/>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#121316] text-xs font-black px-3 py-1 rounded-full uppercase">#1</div>
                </div>
                <div className="bg-[#343538] w-full md:w-56 h-48 rounded-t-xl flex flex-col items-center justify-center p-4 shadow-2xl border-t border-x border-[#2087B3]/20">
                  <span className="text-lg font-bold text-white">{gold.name}</span>
                  <span className="text-sm text-[#2087B3] font-bold">{gold.xp} XP</span>
                  {gold.streak && (
                    <div className="mt-4 flex items-center gap-1 text-[10px] text-[#ffb3b0] font-bold uppercase tracking-tighter">
                      <FireIcon /> {gold.streak}
                    </div>
                  )}
                </div>
              </div>

              {/* Bronze (#3) */}
              <div className="flex-1 w-full md:w-auto order-3 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-[#CD7F32] p-1 shadow-[0_0_15px_rgba(205,127,50,0.3)]">
                    <img alt="Bronze" className="w-full h-full rounded-full bg-[#292a2d] object-cover" src={bronze.img}/>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#CD7F32] text-[#121316] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">#3</div>
                </div>
                <div className="bg-[#292a2d] w-full md:w-48 h-24 rounded-t-xl flex flex-col items-center justify-center p-4 border-t border-x border-[#3f484e]/10">
                  <span className="font-bold text-[#e3e2e6]">{bronze.name}</span>
                  <span className="text-xs text-[#899299]">{bronze.xp} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Table */}
          <div className="bg-[#1a1b1e] rounded-3xl overflow-hidden border border-[#3f484e]/10">
            {/* Filter Bar */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#3f484e]/10">
              <div className="flex bg-[#1f1f23] p-1 rounded-xl">
                {['week', 'month', 'alltime'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                      filter === f
                        ? 'bg-[#2087B3] text-white'
                        : 'text-[#899299] hover:text-[#e3e2e6]'
                    }`}
                  >
                    {f === 'week' ? 'This Week' : f === 'month' ? 'This Month' : 'All Time'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#1f1f23] border-none text-sm font-bold py-2 pl-4 pr-10 rounded-xl focus:ring-1 focus:ring-[#2087B3] text-[#e3e2e6]">
                  <option>All Languages</option>
                  <option>Python</option>
                  <option>Rust</option>
                  <option>TypeScript</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#899299] pointer-events-none"><ExpandIcon /></span>
              </div>
            </div>

            {/* Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1f1f23]/50">
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#899299]">Rank</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#899299]">Learner</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#899299]">XP</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#899299] text-center">Streak</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-[#899299] text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3f484e]/5">
                  {currentData.table.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.user 
                        ? 'bg-[#2087B3]/5 border-l-4 border-[#2087B3]' 
                        : 'hover:bg-[#343538]/30 transition-colors group'
                      }
                    >
                      <td className="px-8 py-5">
                        <span className={`text-lg font-bold ${row.user ? 'text-xl font-black text-[#2087B3]' : 'text-[#899299]'}`}>
                          {row.rank}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`rounded-full overflow-hidden ${row.user ? 'w-12 h-12 ring-2 ring-[#2087B3] p-0.5' : 'w-10 h-10 bg-[#292a2d]'}`}>
                            <img alt={row.name} className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQBN1Zd48xMES4XMIIoVRpGkYktsJ4M0zFmQhbrjIZEyt_o-nWuPU246ReyEYEaAeLZhuSsiteXm1izqi_kpfTYe8AfMFCxcjIQcgrhHPGVOPXygwO06MQHowGFExx9clBo0eoCSnxbQT58pvht1iUSFDTOuFFn39Fx6ypADXv-rHz7j2wnaiX8nIlFr__8BWtvOjkx9CC-7_WKmbhqtE5ButGdFhaO4NE2utjMjDRKxWUobDCAeAqvUYYDotwZGlrlDGjMXi7iQ"/>
                          </div>
                          <div>
                            <span className={`font-bold block leading-none ${row.user ? 'text-[#2087B3] text-lg' : 'text-[#e3e2e6] group-hover:text-[#2087B3]'} transition-colors`}>
                              {row.name} {row.user && <span className="text-xs font-normal text-[#e3e2e6]/60 ml-2">(You)</span>}
                            </span>
                            {row.user && <span className="text-[10px] text-[#2087B3]/60 font-black uppercase tracking-widest">Rookie II</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`font-bold ${row.user ? 'text-xl font-black text-[#2087B3]' : ''}`}>{row.xp}</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${row.user ? 'bg-[#2087B3]/20' : 'bg-[#292a2d]'}`}>
                          <span className="text-[#E85A18]"><FireIcon /></span>
                          <span className={`text-xs font-bold ${row.user ? 'text-[#2087B3]' : ''}`}>{row.streak}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {row.user ? (
                          <div className="inline-flex items-center gap-1 text-[#57dea0] font-bold">
                            <ArrowUpIcon /> 5
                          </div>
                        ) : (
                          <ChangeIcon change={row.change} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination / Load More */}
            <div className="p-8 flex justify-center border-t border-[#3f484e]/10">
              <button className="px-8 py-3 bg-[#343538] hover:bg-[#292a2d] rounded-xl font-bold text-sm transition-all border border-[#3f484e]/20 text-[#e3e2e6]">
                Load More Rankings
              </button>
            </div>
          </div>

          {/* Footer Meta */}
          <div className="mt-12 text-center pb-8">
            <p className="text-[#899299] text-xs uppercase tracking-widest font-bold mb-4">You are viewing the global leaderboard for the Rookie League</p>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#ffb3b0]"></span>
                <span className="text-[10px] text-[#bec8cf] font-bold">PROMOTION ZONE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#292a2d]"></span>
                <span className="text-[10px] text-[#bec8cf] font-bold">RELEGATION ZONE</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
