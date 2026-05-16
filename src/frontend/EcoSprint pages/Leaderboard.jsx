import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Trophy,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Flame,
  Users,
  School,
  Globe,
  Search,
  ChevronUp,
  ChevronDown,
  Droplet,
  Leaf,
  Award
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import { getLeaderboard } from '../../api';
import styles from './Leaderboard.module.css';

const BADGE_VISUALS = {
  streak: { icon: Flame, color: 'bg-orange-100', iconColor: 'text-orange-600' },
  energy: { icon: Zap, color: 'bg-amber-100', iconColor: 'text-amber-600' },
  water: { icon: Droplet, color: 'bg-blue-100', iconColor: 'text-blue-600' },
  leaf: { icon: Leaf, color: 'bg-green-100', iconColor: 'text-green-600' },
  shield: { icon: ShieldCheck, color: 'bg-slate-100', iconColor: 'text-slate-500' },
  award: { icon: Award, color: 'bg-indigo-100', iconColor: 'text-indigo-600' }
};

const scopeLabels = {
  class: 'My Class',
  school: 'My School',
  all: 'All Schools'
};

const periodLabels = {
  week: 'This Week',
  month: 'This Month',
  all: 'All Time'
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

const renderAvatar = (member, className, fallbackClassName) => {
  if (member?.avatarUrl) {
    return <img alt={member.name} className={className} src={member.avatarUrl} />;
  }

  return (
    <div className={fallbackClassName}>
      {member?.initials || getInitials(member?.name)}
    </div>
  );
};

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

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('class');
  const [timeFilter, setTimeFilter] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboard, setLeaderboard] = useState({
    members: [],
    currentUser: null,
    totalCount: 0,
    scopeLabel: scopeLabels.class,
    periodLabel: periodLabels.week,
    loading: true,
    error: ''
  });

  const currentEmail = useMemo(
    () => String(localStorage.getItem('userEmail') || '').trim(),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      if (!currentEmail) {
        setLeaderboard((prev) => ({
          ...prev,
          loading: false,
          error: 'No signed in user found.'
        }));
        return;
      }

      try {
        setLeaderboard((prev) => ({ ...prev, loading: true, error: '' }));
        const data = await getLeaderboard({
          email: currentEmail,
          scope: activeTab,
          period: timeFilter
        });

        if (!isMounted) {
          return;
        }

        setLeaderboard({
          members: Array.isArray(data.members) ? data.members : [],
          currentUser: data.currentUser || null,
          totalCount: Number(data.totalCount || 0),
          scopeLabel: data.scopeLabel || scopeLabels[activeTab] || scopeLabels.class,
          periodLabel: data.periodLabel || periodLabels[timeFilter] || periodLabels.week,
          loading: false,
          error: ''
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setLeaderboard((prev) => ({
          ...prev,
          loading: false,
          error: error?.message || 'Failed to load leaderboard.'
        }));
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [activeTab, timeFilter, currentEmail]);

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return leaderboard.members;
    }

    return leaderboard.members.filter((member) => {
      const haystack = [member.name, member.school, member.className]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [leaderboard.members, searchQuery]);

  const podiumMembers = useMemo(() => {
    return [filteredMembers[1], filteredMembers[0], filteredMembers[2]].filter(Boolean);
  }, [filteredMembers]);

  const tableRows = useMemo(() => filteredMembers.slice(3, 10), [filteredMembers]);

  const currentUser = leaderboard.currentUser;
  const userChangeLabel = currentUser
    ? currentUser.change > 0
      ? `+${currentUser.change} places ${leaderboard.periodLabel.toLowerCase()}`
      : currentUser.change < 0
        ? `${currentUser.change} places ${leaderboard.periodLabel.toLowerCase()}`
        : 'No rank change this period'
    : '';

  const getBadgeVisual = (badgeType) => BADGE_VISUALS[badgeType] || BADGE_VISUALS.award;

  const showLoading = leaderboard.loading;
  const showEmpty = !showLoading && !leaderboard.error && filteredMembers.length === 0;

  const showingStart = filteredMembers.length === 0 ? 0 : filteredMembers.length > 3 ? 4 : 1;
  const showingEnd = filteredMembers.length === 0 ? 0 : Math.min(filteredMembers.length, 10);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />

      <main className={`ml-20 h-screen w-[calc(100%-5rem)] transition-all duration-300 py-8 px-6 overflow-y-auto ${styles.mainScrollbar}`}>
        <div className="w-full mb-8">
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

        <div className="w-full mb-8">
          <div className="bg-gradient-to-r from-[#4EA24E] to-[#68C068] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-green-50 uppercase tracking-wider text-xs font-bold mb-1">Your Current Rank</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">#{currentUser?.rank || '--'}</span>
                  <span className="flex items-center text-green-100 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {userChangeLabel || 'Loading rank change...'}
                  </span>
                </div>
              </div>
              <div className="h-12 w-px bg-white/20 hidden md:block"></div>
              <div className="text-center md:text-left">
                <p className="text-green-50 uppercase tracking-wider text-xs font-bold mb-1">Eco-Points</p>
                <div className="text-4xl font-black">{currentUser?.points?.toLocaleString?.() || '0'}</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold">{currentUser?.levelLabel || 'Level 1'}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-bold">{currentUser?.streakLabel || '0 Day Streak'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="flex border-b border-slate-100">
            {[
              { key: 'class', icon: Users, label: 'My Class' },
              { key: 'school', icon: School, label: 'My School' },
              { key: 'all', icon: Globe, label: 'All Schools' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#4EA24E] text-[#4EA24E] bg-[#F0F9F0]/30'
                    : 'border-transparent text-slate-500 hover:text-[#4EA24E] hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {[
                { key: 'week', label: 'This Week' },
                { key: 'month', label: 'This Month' },
                { key: 'all', label: 'All Time' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                    timeFilter === filter.key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
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

          {leaderboard.error && (
            <div className="px-6 pt-6">
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {leaderboard.error}
              </div>
            </div>
          )}

          {showLoading ? (
            <div className="p-12 text-center text-slate-500">Loading leaderboard...</div>
          ) : (
            <>
              <div className="bg-slate-50/50 p-8 flex justify-center items-end gap-2 md:gap-8 min-h-[320px]">
                {podiumMembers.map((member, index) => {
                  const podiumConfig = [
                    { medal: 2, size: 'w-16 h-16 md:w-20 md:h-20', platform: 'h-24', ring: 'border-slate-300', base: 'bg-slate-200', badge: 'bg-slate-300 text-slate-800' },
                    { medal: 1, size: 'w-20 h-20 md:w-28 md:h-28', platform: 'h-40', ring: 'border-yellow-400', base: 'bg-yellow-100', badge: 'bg-yellow-400 text-white', champion: true },
                    { medal: 3, size: 'w-16 h-16 md:w-20 md:h-20', platform: 'h-16', ring: 'border-orange-400', base: 'bg-orange-50', badge: 'bg-orange-400 text-white' }
                  ][index];

                  if (!podiumConfig) {
                    return null;
                  }

                  return (
                    <div key={member.email || index} className="flex flex-col items-center hover:-translate-y-1 transition-transform">
                      <div className="relative mb-4">
                        {member.rank === 1 && (
                          <Trophy className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-500 fill-yellow-500" />
                        )}
                        {renderAvatar(
                          member,
                          `${podiumConfig.size} rounded-full border-4 ${podiumConfig.ring} object-cover shadow-xl`,
                          `${podiumConfig.size} rounded-full border-4 ${podiumConfig.ring} ${podiumConfig.base} flex items-center justify-center font-black text-slate-500 shadow-xl`
                        )}
                        <div className={`absolute -bottom-2 -right-2 ${podiumConfig.badge} ${member.rank === 1 ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'} rounded-full flex items-center justify-center font-bold ${member.rank === 1 ? 'shadow-lg' : ''}`}>
                          {member.rank}
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <p className={`font-bold ${member.rank === 1 ? 'text-slate-900 text-base md:text-lg' : 'text-slate-800 text-sm md:text-base'}`}>{member.name}</p>
                        {activeTab === 'all' && <p className="text-slate-500 text-[10px]">{member.school}</p>}
                        <p className="text-[#4EA24E] font-semibold text-xs md:text-sm">{member.points.toLocaleString()} pts</p>
                      </div>
                      <div className={`w-24 md:w-32 ${podiumConfig.base} ${podiumConfig.platform} rounded-t-xl flex items-center justify-center shadow-inner ${member.rank === 1 ? 'flex-col pt-8 border-x border-t border-yellow-200' : ''}`}>
                        {member.rank === 1 ? (
                          <>
                            <Award className="text-yellow-500 w-12 h-12 mb-2" />
                            <span className="text-yellow-700 font-bold text-xs uppercase tracking-widest">Champion</span>
                          </>
                        ) : (
                          <Award className="text-slate-400 w-8 h-8 opacity-40" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

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
                    {tableRows.map((row) => (
                      <tr
                        key={row.email}
                        className={`hover:bg-slate-50 transition-colors ${row.isCurrentUser ? 'bg-[#4EA24E]/10 border-l-4 border-[#4EA24E]' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <span className={`font-bold ${row.isCurrentUser ? 'text-[#4EA24E]' : 'text-slate-700'}`}>{row.rank}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {renderAvatar(
                              row,
                              'w-8 h-8 rounded-full object-cover border border-slate-200',
                              'w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500'
                            )}
                            <div>
                              <span className="font-semibold text-slate-900">{row.name}{row.isCurrentUser ? ' (You)' : ''}</span>
                              {row.isCurrentUser && (
                                <span className="ml-2 px-2 py-0.5 bg-[#4EA24E] text-white text-[10px] rounded uppercase tracking-tighter">Pro</span>
                              )}
                              {activeTab === 'all' && <span className="block text-[10px] text-slate-500">{row.school}</span>}
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-right ${row.isCurrentUser ? 'font-bold text-[#4EA24E]' : ''}`}>
                          <span className={`font-bold ${row.isCurrentUser ? 'text-[#4EA24E]' : 'text-slate-700'}`}>{row.points.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-1">
                            {(row.badgeTypes || ['award']).slice(0, 3).map((badgeType, index) => {
                              const BadgeIcon = getBadgeVisual(badgeType).icon;
                              const badgeStyle = getBadgeVisual(badgeType);
                              return (
                                <div key={`${badgeType}-${index}`} className={`w-6 h-6 ${badgeStyle.color} rounded-full flex items-center justify-center`}>
                                  <BadgeIcon className={`w-3.5 h-3.5 ${badgeStyle.iconColor}`} />
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-medium text-sm flex items-center justify-end ${getChangeColor(row.changeType)}`}>
                            {getChangeIcon(row.changeType)} {row.change > 0 ? row.change : '0'}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {!tableRows.length && !showLoading && (
                      <tr>
                        <td className="px-6 py-10 text-center text-slate-500" colSpan={5}>
                          No leaderboard matches found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing ranks {showingStart} to {showingEnd} of {leaderboard.totalCount} students in {leaderboard.scopeLabel.toLowerCase()}.
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;