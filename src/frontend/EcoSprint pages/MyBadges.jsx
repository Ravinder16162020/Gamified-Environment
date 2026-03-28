import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, LayoutDashboard, BookOpen, LineChart, Trophy, Users, 
  Settings, Search, Lock, Check, Star, Zap, Leaf, Droplets, 
  TreeDeciduous, Sun, Wind, Recycle, Globe, Target, Clock,
  TrendingUp, Share2
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './MyBadges.module.css';

// User stats
const userStats = {
  name: "Alex Rivera",
  title: "Eco-Guardian Level 4",
  totalBadges: 12,
  totalPossible: 24,
  ecoPoints: 1250,
  nextBadge: "Water Warrior",
  pointsToNext: 50,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA"
};

// Badge categories with badges
const badgeCategories = [
  {
    id: "learning",
    name: "Learning & Mastery",
    icon: BookOpen,
    badges: [
      { id: 1, name: "First Steps", description: "Complete your first module", icon: Check, unlocked: true, rarity: "common", date: "Oct 1, 2023" },
      { id: 2, name: "Knowledge Seeker", description: "Complete 5 modules", icon: Star, unlocked: true, rarity: "common", date: "Oct 15, 2023" },
      { id: 3, name: "Expert Scholar", description: "Complete 10 modules", icon: Award, unlocked: false, rarity: "rare", progress: 50 },
      { id: 4, name: "Quiz Whiz", description: "Score 100% on 3 quizzes", icon: Target, unlocked: true, rarity: "rare", date: "Oct 20, 2023" },
      { id: 5, name: "Perfect Streak", description: "Get 5 perfect scores in a row", icon: Zap, unlocked: false, rarity: "epic", progress: 40 }
    ]
  },
  {
    id: "engagement",
    name: "Engagement & Streaks",
    icon: Clock,
    badges: [
      { id: 6, name: "Daily Starter", description: "Complete 7 daily challenges", icon: Sun, unlocked: true, rarity: "common", date: "Oct 8, 2023" },
      { id: 7, name: "Week Warrior", description: "Maintain a 7-day streak", icon: Clock, unlocked: true, rarity: "common", date: "Oct 14, 2023" },
      { id: 8, name: "Monthly Master", description: "Maintain a 30-day streak", icon: CalendarIcon, unlocked: false, rarity: "rare", progress: 23 },
      { id: 9, name: "Unstoppable", description: "Maintain a 100-day streak", icon: TrendingUp, unlocked: false, rarity: "legendary", progress: 12 }
    ]
  },
  {
    id: "environmental",
    name: "Environmental Impact",
    icon: Leaf,
    badges: [
      { id: 10, name: "Tree Planter", description: "Learn about reforestation", icon: TreeDeciduous, unlocked: true, rarity: "common", date: "Oct 5, 2023" },
      { id: 11, name: "Ocean Guardian", description: "Complete ocean conservation module", icon: Droplets, unlocked: false, rarity: "rare", progress: 75 },
      { id: 12, name: "Solar Pioneer", description: "Master renewable energy", icon: Sun, unlocked: true, rarity: "rare", date: "Oct 18, 2023" },
      { id: 13, name: "Wind Warrior", description: "Complete wind energy quiz", icon: Wind, unlocked: true, rarity: "common", date: "Oct 22, 2023" },
      { id: 14, name: "Waste Reducer", description: "Master waste management", icon: Recycle, unlocked: false, rarity: "rare", progress: 30 }
    ]
  },
  {
    id: "community",
    name: "Community & Social",
    icon: Users,
    badges: [
      { id: 15, name: "Team Player", description: "Join a study group", icon: Users, unlocked: true, rarity: "common", date: "Oct 3, 2023" },
      { id: 16, name: "Helper", description: "Answer 10 questions in community", icon: Share2, unlocked: false, rarity: "rare", progress: 60 },
      { id: 17, name: "Eco Influencer", description: "Share 5 achievements", icon: Globe, unlocked: false, rarity: "epic", progress: 20 },
      { id: 18, name: "Mentor", description: "Help 5 students complete modules", icon: Star, unlocked: false, rarity: "legendary", progress: 0 }
    ]
  }
];

// Calendar icon component
function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

const MyBadges = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Calculate stats
  const unlockedCount = badgeCategories.reduce((acc, cat) => 
    acc + cat.badges.filter(b => b.unlocked).length, 0
  );
  const totalCount = badgeCategories.reduce((acc, cat) => acc + cat.badges.length, 0);
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Get rarity color
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'rare': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'epic': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'legendary': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  // Filter badges
  const getFilteredBadges = () => {
    let allBadges = [];
    badgeCategories.forEach(cat => {
      cat.badges.forEach(badge => {
        allBadges.push({ ...badge, category: cat.name });
      });
    });

    if (activeCategory !== 'all') {
      const category = badgeCategories.find(c => c.id === activeCategory);
      allBadges = category ? category.badges.map(b => ({ ...b, category: category.name })) : [];
    }

    if (searchQuery) {
      allBadges = allBadges.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allBadges;
  };

  const filteredBadges = getFilteredBadges();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="ml-20 min-h-screen">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">My Badges</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search badges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-[#4EA24E] focus:border-[#4EA24E] outline-none w-64"
              />
            </div>
            <div className="flex items-center gap-3">
              <img src={userStats.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" />
              <span className="text-sm font-medium text-slate-700">{userStats.name}</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#4EA24E]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#4EA24E]" />
                </div>
                <span className="text-sm text-slate-500">Total Badges</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{unlockedCount}/{totalCount}</p>
              <p className="text-xs text-slate-400 mt-1">{completionPercentage}% Complete</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-sm text-slate-500">Rare Badges</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">3</p>
              <p className="text-xs text-slate-400 mt-1">Keep collecting!</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <span className="text-sm text-slate-500">Epic+ Badges</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">1</p>
              <p className="text-xs text-slate-400 mt-1">Almost there!</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-sm text-slate-500">Next Badge</span>
              </div>
              <p className="text-lg font-bold text-slate-800 truncate">{userStats.nextBadge}</p>
              <p className="text-xs text-slate-400 mt-1">{userStats.pointsToNext} pts to unlock</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Badge Collection Progress</span>
              <span className="text-sm font-bold text-[#4EA24E]">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#4EA24E] to-[#68C068] h-full rounded-full transition-all duration-1000"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#4EA24E] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Badges
            </button>
            {badgeCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#4EA24E] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`relative bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:-translate-y-1 ${
                  badge.unlocked 
                    ? 'border-slate-200 shadow-sm hover:shadow-md' 
                    : 'border-slate-100 opacity-75 grayscale'
                }`}
              >
                {/* Rarity Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${getRarityColor(badge.rarity)}`}>
                  {getRarityLabel(badge.rarity)}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  badge.unlocked 
                    ? 'bg-[#4EA24E]/10 text-[#4EA24E]' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {badge.unlocked ? (
                    <badge.icon className="w-8 h-8" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-bold text-slate-800 mb-1">{badge.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{badge.description}</p>

                {/* Progress or Date */}
                {badge.unlocked ? (
                  <div className="flex items-center gap-2 text-xs text-[#4EA24E]">
                    <Check className="w-4 h-4" />
                    <span>Unlocked {badge.date}</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-slate-300 h-full rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-4 ${
                selectedBadge.unlocked 
                  ? 'bg-[#4EA24E]/10 text-[#4EA24E]' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {selectedBadge.unlocked ? (
                  <selectedBadge.icon className="w-12 h-12" />
                ) : (
                  <Lock className="w-12 h-12" />
                )}
              </div>

              {/* Rarity */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border mb-3 ${getRarityColor(selectedBadge.rarity)}`}>
                {getRarityLabel(selectedBadge.rarity)} Badge
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedBadge.name}</h2>
              <p className="text-slate-500 mb-6">{selectedBadge.description}</p>

              {/* Status */}
              {selectedBadge.unlocked ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 w-full">
                  <div className="flex items-center gap-2 text-[#4EA24E] mb-1">
                    <Check className="w-5 h-5" />
                    <span className="font-bold">Unlocked!</span>
                  </div>
                  <p className="text-sm text-slate-600">Achieved on {selectedBadge.date}</p>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full">
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <Lock className="w-5 h-5" />
                    <span className="font-bold">Locked</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">Complete the required tasks to unlock this badge</p>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#4EA24E] h-full rounded-full transition-all duration-500"
                      style={{ width: `${selectedBadge.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-right">{selectedBadge.progress}% Complete</p>
                </div>
              )}

              {/* Category */}
              <div className="mt-4 text-sm text-slate-400">
                Category: <span className="text-slate-600 font-medium">{selectedBadge.category}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBadges;
