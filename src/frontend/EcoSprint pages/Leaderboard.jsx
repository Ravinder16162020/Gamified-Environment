import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Trophy, ChevronRight, TrendingUp, ShieldCheck, 
  Flame, Users, School, Globe, Search, ChevronUp, 
  ChevronDown, Droplet, Leaf, Award
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './Leaderboard.module.css';

// Leaderboard data for different views
const leaderboardData = {
  class: {
    podium: [
      { rank: 2, name: "Rohan M.", points: 2140, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLieaTzcHOA_Ycz2ZBV7b2MZxVQ2B6hvqxgpQ-euNOjWe6mPBjNYNBqosiUVQ1wERDM6KXoWuqRp3jlEPf-xlfmqYYp7ckX28v-yP1RqjGYzo9lApC57pzJLQXAY_HiLyn-wiikNYJ0RG4aa3K4iwXEcDm6-ESfEkuZgsvWP4Pwx0JoHQv7mNdSl_ki1_cIio8Z5ldCp02Pa55UlpK1A7DY_IkcjI3iFigbJoxFvbVura-h9Qx1eUQYIxo59YZPd5hKr_sIpw20g", borderColor: "border-slate-300", bgColor: "bg-slate-200", height: "h-24" },
      { rank: 1, name: "Priya S.", points: 2850, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcr59IORE-27B8m3JTW3UNc9EfrSKo8L4S5ux3lUwz1Weod5M9h2Z-rZWnp20xZDuNr6k-I-_N36r2KnZkWvoD59dJ6vKCn8CybhYwY5PZzDZ_FBneWQ5KRo-s7P0UHL2Onv5KBIbaaqaqUY64krw7IqJ2QalERQ3U9Aw5EXMUPjnkm0OZ4A6NrO13eWD-_7nrw6KxRDAxVu8pmZDMDAAraTImHFhvPs7pvaJe9HQICmwJWtT14-T8DKYAQYxDzxhCKRoiPthWyg", borderColor: "border-yellow-400", bgColor: "bg-yellow-100", height: "h-40", isChampion: true },
      { rank: 3, name: "Leo Chen", points: 1980, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc-48vNcz1sfM4tbecZ8HBWSYx4T3orKi9gkuRFgpSKxdlDEGtURGn3-bWQ8G4h7wnCJ_qQ2quPzz0zKlOty6GRxgK1ZeCLPrQgC1vr2aa_JqC5oZBfDuS1UUtTcpfNNvEzXDktaMthzbo0n217PnWisx0NCBmk23ple6lLChv9wcLAEdy3I0o0fKirZiwjkL9ktlgBxkQj-l6jI7pbIxM6zTGNLMZ4aHJQtd7Z5Zj_ktiUaelonwni7V_JBeKb4uF47Knl8PXMQ", borderColor: "border-orange-400", bgColor: "bg-orange-50", height: "h-16" }
    ],
    rows: [
      { rank: 4, name: "Sarah Jenkins", points: 1840, change: 2, changeType: "up", badges: [{ icon: Droplet, color: "bg-blue-100", iconColor: "text-blue-600" }, { icon: Leaf, color: "bg-green-100", iconColor: "text-green-600" }] },
      { rank: 5, name: "Marcus Wright", points: 1795, change: 1, changeType: "down", badges: [{ icon: Zap, color: "bg-amber-100", iconColor: "text-amber-600" }] }
    ],
    userRank: { rank: 42, points: 1250, change: 5, changeType: "up" }
  },
  school: {
    podium: [
      { rank: 2, name: "Meera K.", points: 4600, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtS8B7UohKjOJx5BAY1u5Af71cWN3qLrBYrku1sjEhTaD9PMbVduJ1kXkIix-WuSOOZdGyzODb86D998Qc_Mbr9mZqDZ46OeQMtCrC-b4LfqhAN-QKIv2khwh33EJRm9b_lCi5tnMWzqQomOWRop3LZAZM4KVGU6C2OS77traHW-6EbuK2qtfzJMDXVqVflI_I2mOEfajP5kWTSrtk3OCD04vZFYFAgSH84d5hzm8Iy8fDGmG-47h3h6EgT2I0yX9cTqEmnF2pYA", borderColor: "border-slate-300", bgColor: "bg-slate-200", height: "h-24" },
      { rank: 1, name: "Aryan V.", points: 4850, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeWHFZTufS-AhwaeBOYnX1VHPvphhpWWu1LRjvCLNH_JqeI5Ljfyynu9vNYjs-342VnfKElvkvMEXTD1ai1nxEAfIdVSadwYz9IYHN2V1xO5Iq6UablQByoSbTkuDdDNOzRK1EGTQAAYr08qfU3LkVoCN98-A1N3XF-cGtTbMJUMKza1eMsuwpgyAoBeZgI0uGGJkdJQIhtAr7Mc1ZfNuFDWejGTtKj5TIqxwHugTrX7c3nHI9gotnYIQWi3VPIWFW5akgoxClig", borderColor: "border-yellow-400", bgColor: "bg-yellow-100", height: "h-40", isChampion: true },
      { rank: 3, name: "Sam T.", points: 4400, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLOfeKHGY9DK7E9lROQ_BjzbDEIAM0pXHl-406efHA8bDGTn6x3d-AP-ac8Iioq8ALrKR4c-obE-cVA6GG6oPiP1S307u3tNOye8h972HiHNnsAJ0yCSudEH_vyoMftYqovwQrvVxsw0bBSSranxiMtKgD5RTer7ex6S3T9Smy9baxndbYQ2dRIsVYNctDI2KTmB293MG_bNu6oPhN6mgjH1cE2q2PnFPzzcu6xQkSTbSjRqZjArUcsHOPhYheXEqC7Y5r0G5LZA", borderColor: "border-orange-400", bgColor: "bg-orange-50", height: "h-16" }
    ],
    rows: [
      { rank: 155, name: "Taylor W.", points: 1260, change: 0, changeType: "same", badges: [] }
    ],
    userRank: { rank: 156, points: 1250, change: 0, changeType: "same" }
  },
  all: {
    podium: [
      { rank: 2, name: "Sarah J.", school: "Green Valley", points: 11900, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLOfeKHGY9DK7E9lROQ_BjzbDEIAM0pXHl-406efHA8bDGTn6x3d-AP-ac8Iioq8ALrKR4c-obE-cVA6GG6oPiP1S307u3tNOye8h972HiHNnsAJ0yCSudEH_vyoMftYqovwQrvVxsw0bBSSranxiMtKgD5RTer7ex6S3T9Smy9baxndbYQ2dRIsVYNctDI2KTmB293MG_bNu6oPhN6mgjH1cE2q2PnFPzzcu6xQkSTbSjRqZjArUcsHOPhYheXEqC7Y5r0G5LZA", borderColor: "border-slate-300", bgColor: "bg-slate-200", height: "h-24" },
      { rank: 1, name: "Chen L.", school: "Global High School", points: 12400, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcr59IORE-27B8m3JTW3UNc9EfrSKo8L4S5ux3lUwz1Weod5M9h2Z-rZWnp20xZDuNr6k-I-_N36r2KnZkWvoD59dJ6vKCn8CybhYwY5PZzDZ_FBneWQ5KRo-s7P0UHL2Onv5KBIbaaqaqUY64krw7IqJ2QalERQ3U9Aw5EXMUPjnkm0OZ4A6NrO13eWD-_7nrw6KxRDAxVu8pmZDMDAAraTImHFhvPs7pvaJe9HQICmwJWtT14-T8DKYAQYxDzxhCKRoiPthWyg", borderColor: "border-yellow-400", bgColor: "bg-yellow-100", height: "h-40", isChampion: true },
      { rank: 3, name: "Hiroshi M.", school: "Tokyo Eco", points: 11500, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc-48vNcz1sfM4tbecZ8HBWSYx4T3orKi9gkuRFgpSKxdlDEGtURGn3-bWQ8G4h7wnCJ_qQ2quPzz0zKlOty6GRxgK1ZeCLPrQgC1vr2aa_JqC5oZBfDuS1UUtTcpfNNvEzXDktaMthzbo0n217PnWisx0NCBmk23ple6lLChv9wcLAEdy3I0o0fKirZiwjkL9ktlgBxkQj-l6jI7pbIxM6zTGNLMZ4aHJQtd7Z5Zj_ktiUaelonwni7V_JBeKb4uF47Knl8PXMQ", borderColor: "border-orange-400", bgColor: "bg-orange-50", height: "h-16" }
    ],
    rows: [
      { rank: 1401, name: "Kim L.", points: 1255, change: 0, changeType: "same", badges: [] }
    ],
    userRank: { rank: 1402, points: 1250, change: 0, changeType: "same" }
  }
};

const userData = {
  name: "Alex Rivera",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-RwQ-E08hsyKJ4PE3Dgx0x30VxiypNsmeFSW3221qV-r0XYE5xACt-d8576vWOCB-2T3cnCbU4PliVwHGoSQ4VuewmhxGHk9hKoTipDks6o3okLJ3UM0gWUGarr-Sxl5VtiI7yuAbmOuaYNZP-LHenEW0X1_cjuWXRzHZ6NPU9hhyuRw6SLuL0BDPFgICJLjfZ8xUatHWQ09ApqmM2B-bFnJsisV38kj4EtYMVuIQBR5Vn4OnAfOIq-M9Zvo4AFugAGVgd6aEJA",
  currentRank: 42,
  points: 1250,
  level: "Level 4 Climate Aware",
  streak: "7 Day Streak",
  change: 5
};

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('class');
  const [timeFilter, setTimeFilter] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  const currentData = leaderboardData[activeTab];

  const getChangeIcon = (changeType) => {
    if (changeType === 'up') return <ChevronUp className="w-4 h-4" />;
    if (changeType === 'down') return <ChevronDown className="w-4 h-4" />;
    return null;
  };

  const getChangeColor = (changeType) => {
    if (changeType === 'up') return 'text-emerald-500';
    if (changeType === 'down') return 'text-rose-500';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="ml-20 min-h-screen transition-all duration-300 py-8 px-4 sm:px-8 overflow-y-auto">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <nav className="flex text-sm text-slate-400 mb-2">
                <button onClick={() => navigate('/dashboard')} className="hover:text-[#4EA24E] transition-colors">Dashboard</button>
                <ChevronRight className="w-4 h-4 mx-1.5 self-center" />
                <span className="text-[#4EA24E] font-medium">Leaderboard</span>
              </nav>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-[#4EA24E]" />
                <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
              </div>
              <p className="text-slate-500 mt-1">See how you rank across class, school, and all schools.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                Season 1 · Active
              </div>
              <p className="text-slate-500 text-sm font-medium">Resets in 12 days</p>
            </div>
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="max-w-7xl mx-auto mb-8 px-4">
          <div className="bg-gradient-to-r from-[#4EA24E] to-[#68C068] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-green-50 uppercase tracking-wider text-xs font-bold mb-1">Your Current Rank</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">#{userData.currentRank}</span>
                  <span className="flex items-center text-green-100 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{userData.change} places this week
                  </span>
                </div>
              </div>
              <div className="h-12 w-px bg-white/20 hidden md:block"></div>
              <div className="text-center md:text-left">
                <p className="text-green-50 uppercase tracking-wider text-xs font-bold mb-1">Eco-Points</p>
                <div className="text-4xl font-black">{userData.points.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold">{userData.level}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-bold">{userData.streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mx-4 mb-8">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('class')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'class' 
                  ? 'border-[#4EA24E] text-[#4EA24E] bg-[#F0F9F0]/30' 
                  : 'border-transparent text-slate-500 hover:text-[#4EA24E] hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" /> My Class
            </button>
            <button 
              onClick={() => setActiveTab('school')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'school' 
                  ? 'border-[#4EA24E] text-[#4EA24E] bg-[#F0F9F0]/30' 
                  : 'border-transparent text-slate-500 hover:text-[#4EA24E] hover:bg-slate-50'
              }`}
            >
              <School className="w-4 h-4" /> My School
            </button>
            <button 
              onClick={() => setActiveTab('all')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'all' 
                  ? 'border-[#4EA24E] text-[#4EA24E] bg-[#F0F9F0]/30' 
                  : 'border-transparent text-slate-500 hover:text-[#4EA24E] hover:bg-slate-50'
              }`}
            >
              <Globe className="w-4 h-4" /> All Schools
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setTimeFilter('week')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  timeFilter === 'week' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                This Week
              </button>
              <button 
                onClick={() => setTimeFilter('month')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  timeFilter === 'month' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                This Month
              </button>
              <button 
                onClick={() => setTimeFilter('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  timeFilter === 'all' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All Time
              </button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-[#4EA24E] focus:border-[#4EA24E] outline-none"
              />
            </div>
          </div>

          {/* Podium Section */}
          <div className="bg-slate-50/50 p-8 flex justify-center items-end gap-2 md:gap-8 min-h-[320px]">
            {/* 2nd Place */}
            <div className="flex flex-col items-center hover:-translate-y-1 transition-transform">
              <div className="relative mb-4">
                <img 
                  alt="Silver Medalist" 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${currentData.podium[0].borderColor} object-cover`}
                  src={currentData.podium[0].avatar}
                />
                <div className="absolute -bottom-2 -right-2 bg-slate-300 text-slate-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              </div>
              <div className="text-center mb-4">
                <p className="font-bold text-slate-800 text-sm md:text-base">{currentData.podium[0].name}</p>
                {activeTab === 'all' && <p className="text-slate-500 text-[10px]">{currentData.podium[0].school}</p>}
                <p className="text-[#4EA24E] font-semibold text-xs md:text-sm">{currentData.podium[0].points.toLocaleString()} pts</p>
              </div>
              <div className={`w-24 md:w-32 ${currentData.podium[0].bgColor} h-24 rounded-t-xl flex items-center justify-center shadow-inner`}>
                <Award className="text-slate-400 w-8 h-8 opacity-40" />
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center hover:-translate-y-1 transition-transform">
              <div className="relative mb-4">
                <Trophy className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-500 fill-yellow-500" />
                <img 
                  alt="Gold Medalist" 
                  className={`w-20 h-20 md:w-28 md:h-28 rounded-full border-4 ${currentData.podium[1].borderColor} object-cover shadow-xl`}
                  src={currentData.podium[1].avatar}
                />
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-lg">1</div>
              </div>
              <div className="text-center mb-4">
                <p className="font-bold text-slate-900 text-base md:text-lg">{currentData.podium[1].name}</p>
                {activeTab === 'all' && <p className="text-slate-500 text-[10px]">{currentData.podium[1].school}</p>}
                <p className="text-[#4EA24E] font-bold text-sm md:text-base">{currentData.podium[1].points.toLocaleString()} pts</p>
              </div>
              <div className={`w-28 md:w-40 bg-yellow-100 h-40 rounded-t-xl flex flex-col items-center pt-8 shadow-inner border-x border-t border-yellow-200`}>
                <Award className="text-yellow-500 w-12 h-12 mb-2" />
                <span className="text-yellow-700 font-bold text-xs uppercase tracking-widest">Champion</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center hover:-translate-y-1 transition-transform">
              <div className="relative mb-4">
                <img 
                  alt="Bronze Medalist" 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 ${currentData.podium[2].borderColor} object-cover`}
                  src={currentData.podium[2].avatar}
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              </div>
              <div className="text-center mb-4">
                <p className="font-bold text-slate-800 text-sm md:text-base">{currentData.podium[2].name}</p>
                {activeTab === 'all' && <p className="text-slate-500 text-[10px]">{currentData.podium[2].school}</p>}
                <p className="text-[#4EA24E] font-semibold text-xs md:text-sm">{currentData.podium[2].points.toLocaleString()} pts</p>
              </div>
              <div className={`w-24 md:w-32 bg-orange-50 h-16 rounded-t-xl flex items-center justify-center shadow-inner`}>
                <Award className="text-orange-300 w-8 h-8 opacity-40" />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Eco-Points</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Badges</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Other rows */}
                {currentData.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-700">{row.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img alt="Avatar" className="w-8 h-8 rounded-full" src={row.avatar || currentData.podium[0].avatar} />
                        <span className="font-semibold text-slate-900">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-slate-700">{row.points.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        {row.badges.map((badge, i) => (
                          <div key={i} className={`w-6 h-6 ${badge.color} rounded-full flex items-center justify-center`}>
                            <badge.icon className={`w-3.5 h-3.5 ${badge.iconColor}`} />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-medium text-sm flex items-center justify-end ${getChangeColor(row.changeType)}`}>
                        {getChangeIcon(row.changeType)} {row.change > 0 ? row.change : ''}
                      </span>
                    </td>
                  </tr>
                ))}

                {/* CURRENT USER HIGHLIGHT */}
                <tr className="bg-[#4EA24E]/10 border-l-4 border-[#4EA24E]">
                  <td className="px-6 py-4">
                    <span className="font-black text-[#4EA24E]">{currentData.userRank.rank}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img alt="Alex Rivera" className="w-8 h-8 rounded-full border-2 border-[#4EA24E]" src={userData.avatar} />
                      <div>
                        <span className="font-bold text-slate-900">{userData.name} (You)</span>
                        <span className="ml-2 px-2 py-0.5 bg-[#4EA24E] text-white text-[10px] rounded uppercase tracking-tighter">Pro</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-[#4EA24E]">{currentData.userRank.points.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#4EA24E]" />
                      </div>
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <Flame className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-bold text-sm flex items-center justify-end ${getChangeColor(currentData.userRank.changeType)}`}>
                      <ChevronUp className="w-4 h-4" /> {currentData.userRank.change}
                    </span>
                  </td>
                </tr>

                {/* Next user after current user */}
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-700">{currentData.userRank.rank + 1}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img alt="Avatar" className="w-8 h-8 rounded-full" src={currentData.podium[0].avatar} />
                      <span className="font-semibold text-slate-900">
                        {activeTab === 'class' ? "Jamie Smith" : activeTab === 'school' ? "Taylor W." : "Kim L."}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-700">
                      {activeTab === 'class' ? "1,210" : activeTab === 'school' ? "1,260" : "1,255"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                        <Award className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-slate-400 font-medium text-sm">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination/Footer */}
          <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Showing 1 to 10 of {activeTab === 'class' ? 42 : activeTab === 'school' ? 156 : 1402} students</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50">Previous</button>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
