import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  ChevronRight,
  Play,
  Zap,
  BookOpenCheck,
  HelpCircle,
  Check,
  Flame,
  ZapOff,
  TrendingUp,
  Droplets,
  ThermometerSun,
  BatteryCharging,
  Gem,
  ShieldCheck,
  Calendar,
  Waves,
  Lock,
  X,
  Share2,
  Leaf
} from 'lucide-react';
import { getEcoBadges } from '../../api';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';

const BADGE_ICON_REGISTRY = {
  play: Play,
  zap: Zap,
  bookOpenCheck: BookOpenCheck,
  helpCircle: HelpCircle,
  check: Check,
  flame: Flame,
  zapOff: ZapOff,
  trendingUp: TrendingUp,
  droplets: Droplets,
  thermometerSun: ThermometerSun,
  batteryCharging: BatteryCharging,
  gem: Gem,
  shieldCheck: ShieldCheck,
  calendar: Calendar,
  waves: Waves,
  leaf: Leaf
};

const DEFAULT_BADGE_DATA = {
  user: {
    name: 'Learner',
    avatarUrl: '',
    school: 'Greenview High School',
    className: '11-B',
    earnedCount: 0,
    totalCount: 0,
    completionPercentage: 0,
    points: 0,
    levelLabel: 'Level 1',
    streakLabel: '0 Day Streak'
  },
  badges: [],
  categorySummary: [],
  recentBadges: []
};

const Bages = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [badgeData, setBadgeData] = useState(DEFAULT_BADGE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    let cancelled = false;

    const loadBadges = async () => {
      if (!userEmail) {
        setErrorMessage('Please log in again to load your badges.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');
        const response = await getEcoBadges(userEmail);

        if (cancelled) {
          return;
        }

        setBadgeData({
          ...DEFAULT_BADGE_DATA,
          ...response,
          user: {
            ...DEFAULT_BADGE_DATA.user,
            ...(response.user || {})
          },
          badges: Array.isArray(response.badges) ? response.badges : [],
          categorySummary: Array.isArray(response.categorySummary) ? response.categorySummary : [],
          recentBadges: Array.isArray(response.recentBadges) ? response.recentBadges : []
        });
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message || 'Failed to load badge collection.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadBadges();

    return () => {
      cancelled = true;
    };
  }, [userEmail]);

  useEffect(() => {
    if (activeCategory !== 'all' && !badgeData.categorySummary.some((category) => category.id === activeCategory)) {
      setActiveCategory('all');
    }
  }, [activeCategory, badgeData.categorySummary]);

  const categoryTabs = useMemo(() => {
    return [
      { id: 'all', name: 'All' },
      ...badgeData.categorySummary.map((category) => ({
        id: category.id,
        name: category.name
      }))
    ];
  }, [badgeData.categorySummary]);

  const filteredBadges = useMemo(() => {
    if (activeCategory === 'all') {
      return badgeData.badges;
    }

    return badgeData.badges.filter((badge) => badge.category === activeCategory);
  }, [activeCategory, badgeData.badges]);

  const openModal = (badge) => {
    setSelectedBadge(badge);
    setModalType(badge.earned ? 'earned' : 'locked');
  };

  const closeModal = () => {
    setSelectedBadge(null);
    setModalType(null);
  };

  const getBadgeIcon = (iconKey) => BADGE_ICON_REGISTRY[iconKey] || Leaf;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />

      <main className="ml-20 flex-1 overflow-y-auto p-8 transition-all duration-300">
        <header className="mb-8">
          <nav className="mb-2 flex items-center space-x-2 text-sm text-slate-500">
            <button onClick={() => navigate('/dashboard')} className="transition-colors hover:text-[#4EA24E]">
              Dashboard
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-[#4EA24E]">Badges</span>
          </nav>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Badges & Achievements</h1>
              <p className="mt-1 text-slate-600">Track your progress and showcase your environmental impact.</p>
            </div>
            <div className="flex items-center space-x-2 rounded-full border border-[#4EA24E]/20 bg-[#4EA24E]/10 px-4 py-2 text-sm font-semibold text-[#4EA24E] shadow-sm">
              <Award className="h-4 w-4" />
              <span>{badgeData.user.earnedCount} of {badgeData.user.totalCount} Badges Earned</span>
            </div>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="border-r border-slate-100 p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Your Badge Collection</h2>
                <span className="text-sm font-bold text-[#4EA24E]">{badgeData.user.completionPercentage}% Complete</span>
              </div>
              <div className="mb-6 h-3 w-full rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-[#4EA24E] transition-all duration-1000"
                  style={{ width: `${badgeData.user.completionPercentage}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {badgeData.categorySummary.map((category) => (
                  <span
                    key={category.id}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                      category.id === 'Learning'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : category.id === 'Quiz'
                          ? 'bg-purple-50 text-purple-700 border-purple-100'
                          : category.id === 'Streak'
                            ? 'bg-orange-50 text-orange-700 border-orange-100'
                            : category.id === 'Level'
                              ? 'bg-slate-50 text-slate-700 border-slate-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}
                  >
                    {category.earned} {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50/50 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Recently Earned</h3>
              <div className="flex flex-wrap gap-4">
                {badgeData.recentBadges.length === 0 && (
                  <p className="text-sm text-slate-500">Earn your first badge to see it here.</p>
                )}
                {badgeData.recentBadges.map((badge) => {
                  const Icon = getBadgeIcon(badge.iconKey);
                  return (
                    <div
                      key={badge.id}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${badge.color} shadow-sm`}
                      title={badge.title}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {isLoading && (
          <section className="mb-6 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading your live badge collection...
          </section>
        )}

        {!isLoading && errorMessage && (
          <section className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
            {errorMessage}
          </section>
        )}

        {!isLoading && !errorMessage && (
          <>
            <nav className="mb-6 flex space-x-1 overflow-x-auto pb-1">
              {categoryTabs.map((cat) => (
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

            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredBadges.map((badge) => {
                const Icon = getBadgeIcon(badge.iconKey);
                return (
                  <button
                    key={badge.id}
                    onClick={() => openModal(badge)}
                    className="group relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-transform hover:-translate-y-1"
                  >
                    <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${badge.color} ${!badge.earned ? 'grayscale opacity-70' : ''}`}>
                      <Icon className="h-10 w-10" />
                    </div>

                    <div className={`absolute right-4 top-4 ${badge.earned ? 'text-[#4EA24E]' : 'text-slate-400'}`}>
                      {badge.earned ? <Check className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                    </div>

                    <h4 className={`text-sm font-bold ${badge.earned ? 'text-slate-800' : 'text-slate-400'}`}>
                      {badge.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">{badge.category}</p>
                  </button>
                );
              })}
            </section>
          </>
        )}
      </main>

      {selectedBadge && modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="relative w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all scale-100"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-6 w-6" />
            </button>

            {modalType === 'earned' ? (
              <div className="text-center">
                <div className={`mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full ${selectedBadge.color} ring-8 ring-blue-50/50`}>
                  {React.createElement(getBadgeIcon(selectedBadge.iconKey), { className: 'h-16 w-16' })}
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#4EA24E]/10 px-3 py-1 text-xs font-bold text-[#4EA24E]">
                    <Check className="mr-1 h-3 w-3" /> Badge Earned
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedBadge.name}</h2>
                <p className="mt-2 text-slate-600">{selectedBadge.description}</p>
                <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-left text-sm text-emerald-700">
                  {selectedBadge.progressLabel}
                </div>
                <div className="mt-8 border-t border-slate-100 pt-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Earned On</p>
                      <p className="text-sm font-medium text-slate-700">{selectedBadge.earnedAtLabel || 'Recently'}</p>
                    </div>
                    <button className="flex items-center space-x-2 rounded-lg bg-[#4EA24E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3D8C3D]">
                      <Share2 className="h-4 w-4" />
                      <span>Share Badge</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
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
                <p className="mt-2 text-slate-600">{selectedBadge.description}</p>
                <div className="mt-8 border-t border-slate-100 pt-6 text-left">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">How to Unlock</p>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{selectedBadge.progressLabel}</span>
                    <span className="font-bold text-[#4EA24E]">{selectedBadge.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-[#4EA24E]" style={{ width: `${selectedBadge.progressPercent}%` }} />
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{selectedBadge.unlockText}</p>
                  <button onClick={() => navigate('/modules')} className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
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
