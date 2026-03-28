import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, BookOpen, Award, Users, 
  ChevronRight, Play, Zap, BookOpenCheck, HelpCircle, 
  Flame, ZapOff, TrendingUp, Droplets, ThermometerSun, 
  BatteryCharging, Gem, ShieldCheck, Calendar, Waves, 
  Check, Lock, X, Share2
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './Bages.module.css';

// User data
const userData = {
  name: "Alex Rivers",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNMfXpoOdvvFO2m6QcyEVB-irCxe43MnI5Fgcxvem6un9nE5LrPzkC6tC_cxDBGXKbmXyK9qC-tOpAv6xJjT7f1JLsPbkLS2jf03wvE_wQdJLxyZLfEUBRqcf-i62gNeXOUNbtaZiTeIwcHaIggLYVS29aVwWMu8csfo_gdGAbImLIE8EFSI8BkVKBoNy35EV9NO8uNywBUuQn1HcXBEqb5CdVz_WK82W2cRA0Q45mB4EKRnPijo_HWXALK_Xhgwye9kvjFH4C1A",
  earnedCount: 7,
  totalCount: 20,
  completionPercentage: 35
};

// Badge categories for tabs
const categories = [
  { id: 'all', name: 'All' },
  { id: 'Learning', name: 'Learning' },
  { id: 'Quiz', name: 'Quiz' },
  { id: 'Streak', name: 'Streak' },
  { id: 'Topic', name: 'Topic' },
  { id: 'Level', name: 'Level' },
  { id: 'Daily', name: 'Daily' }
];

// Badges data
const badges = [
  { id: 1, name: "First Steps", category: "Learning", icon: Play, earned: true, color: "bg-blue-50 text-blue-600" },
  { id: 2, name: "Quick Learner", category: "Learning", icon: Zap, earned: true, color: "bg-blue-50 text-blue-600" },
  { id: 3, name: "Module Master", category: "Learning", icon: BookOpenCheck, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 4, name: "Quiz Starter", category: "Quiz", icon: HelpCircle, earned: true, color: "bg-purple-50 text-purple-600" },
  { id: 5, name: "Perfectionist", category: "Quiz", icon: Check, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 6, name: "Green Streak 3", category: "Streak", icon: Flame, earned: true, color: "bg-orange-50 text-orange-600" },
  { id: 7, name: "Green Streak 7", category: "Streak", icon: ZapOff, earned: true, color: "bg-orange-50 text-orange-600" },
  { id: 8, name: "Green Streak 30", category: "Streak", icon: TrendingUp, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 9, name: "Water Warrior", category: "Topic", icon: Droplets, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 10, name: "Climate Aware", category: "Topic", icon: ThermometerSun, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 11, name: "Energy Saver", category: "Topic", icon: BatteryCharging, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 12, name: "Eco Champion", category: "Level", icon: Gem, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 13, name: "Environmental Hero", category: "Level", icon: ShieldCheck, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 14, name: "Daily Warrior", category: "Daily", icon: Calendar, earned: false, color: "bg-slate-100 text-slate-400" },
  { id: 15, name: "Water Wise", category: "Topic", icon: Waves, earned: false, color: "bg-slate-100 text-slate-400" }
];

// Recently earned badges
const recentBadges = [
  { icon: Zap, color: "bg-orange-100 text-orange-600", title: "Green Streak 7" },
  { icon: BookOpenCheck, color: "bg-blue-100 text-blue-600", title: "Quick Learner" },
  { icon: HelpCircle, color: "bg-purple-100 text-purple-600", title: "Quiz Starter" }
];

const Bages = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalType, setModalType] = useState(null);

  // Filter badges
  const filteredBadges = activeCategory === 'all' 
    ? badges 
    : badges.filter(b => b.category === activeCategory);

  const openModal = (badge, type) => {
    setSelectedBadge(badge);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedBadge(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="ml-20 flex-1 overflow-y-auto p-8 transition-all duration-300">
        {/* Header Section */}
        <header className="mb-8">
          <nav className="mb-2 flex items-center space-x-2 text-sm text-slate-500">
            <button onClick={() => navigate('/dashboard')} className="hover:text-[#4EA24E] transition-colors">Dashboard</button>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-[#4EA24E]">Badges</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Badges & Achievements</h1>
              <p className="text-slate-600 mt-1">Track your progress and showcase your environmental impact.</p>
            </div>
            <div className="flex items-center space-x-2 rounded-full bg-[#4EA24E]/10 px-4 py-2 text-sm font-semibold text-[#4EA24E] border border-[#4EA24E]/20 shadow-sm">
              <Award className="h-4 w-4" />
              <span>{userData.earnedCount} of {userData.totalCount} Badges Earned</span>
            </div>
          </div>
        </header>

        {/* Progress Banner */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left: Progress Bar */}
            <div className="p-6 lg:col-span-2 border-r border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Your Badge Collection</h2>
                <span className="text-sm font-bold text-[#4EA24E]">{userData.completionPercentage}% Complete</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 mb-6">
                <div 
                  className="h-3 rounded-full bg-[#4EA24E] transition-all duration-1000"
                  style={{ width: `${userData.completionPercentage}%` }}
                ></div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                  3 Learning
                </span>
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 border border-orange-100">
                  2 Streak
                </span>
                <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 border border-purple-100">
                  2 Quiz
                </span>
              </div>
            </div>
            {/* Right: Recently Earned */}
            <div className="bg-slate-50/50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Recently Earned</h3>
              <div className="flex space-x-4">
                {recentBadges.map((badge, index) => (
                  <div 
                    key={index}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${badge.color} shadow-sm`}
                    title={badge.title}
                  >
                    <badge.icon className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <nav className="mb-6 flex space-x-1 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#4EA24E] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Badge Grid */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredBadges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => openModal(badge, badge.earned ? 'earned' : 'locked')}
              className="group relative flex flex-col items-center rounded-2xl bg-white border border-slate-200 p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${badge.color} ${!badge.earned && 'grayscale opacity-70'}`}>
                <badge.icon className="h-10 w-10" />
              </div>
              
              {/* Checkmark or Lock */}
              <div className={`absolute top-4 right-4 ${badge.earned ? 'text-[#4EA24E]' : 'text-slate-400'}`}>
                {badge.earned ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </div>
              
              <h4 className={`text-sm font-bold ${badge.earned ? 'text-slate-800' : 'text-slate-400'}`}>{badge.name}</h4>
              <p className="mt-1 text-xs text-slate-500">{badge.category}</p>
            </button>
          ))}
        </section>
      </main>

      {/* Badge Modal */}
      {selectedBadge && modalType && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {modalType === 'earned' ? (
              /* Earned Variant */
              <div className="text-center">
                <div className={`mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full ${selectedBadge.color} ring-8 ring-blue-50/50`}>
                  <selectedBadge.icon className="h-16 w-16" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#4EA24E]/10 px-3 py-1 text-xs font-bold text-[#4EA24E]">
                    <Check className="mr-1 h-3 w-3" /> Badge Earned
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedBadge.name}</h2>
                <p className="mt-2 text-slate-600">Completed 5 educational modules in record time. You're showing incredible dedication!</p>
                <div className="mt-8 border-t border-slate-100 pt-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Earned On</p>
                      <p className="text-sm font-medium text-slate-700">October 14, 2023</p>
                    </div>
                    <button className="flex items-center space-x-2 rounded-lg bg-[#4EA24E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3D8C3D]">
                      <Share2 className="h-4 w-4" />
                      <span>Share Badge</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Locked Variant */
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 text-slate-400 ring-8 ring-slate-50">
                  <Lock className="h-16 w-16" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                    Locked
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedBadge.name}</h2>
                <p className="mt-2 text-slate-600">Complete all introductory environmental modules to unlock this achievement.</p>
                <div className="mt-8 border-t border-slate-100 pt-6 text-left">
                  <p className="mb-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">How to Unlock</p>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">8 of 12 Modules Done</span>
                    <span className="text-[#4EA24E] font-bold">66%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#4EA24E]" style={{ width: '66%' }}></div>
                  </div>
                  <button className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    View Related Modules
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bages;
