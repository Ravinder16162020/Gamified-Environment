import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Sword, Trophy, LineChart, Award, Bot, LogOut } from 'lucide-react';
import './SidebarEcoDboard.css';
import SprintIcon from '../../assets/sprinticon.svg';
import { getProfile } from '../../api';

const PROFILE_STORAGE_KEY = 'ecoSprintProfile';

const SidebarEcoDboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}');
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    const syncProfile = () => {
      try {
        setProfile(JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || '{}'));
      } catch (error) {
        setProfile({});
      }
    };

    syncProfile();
    window.addEventListener('storage', syncProfile);
    window.addEventListener('ecoSprintProfileUpdated', syncProfile);

    const email = String(localStorage.getItem('userEmail') || '').trim();
    if (email) {
      getProfile(email)
        .then((data) => {
          const nextProfile = {
            name: data?.name || '',
            initials: data?.initials || '',
            school: data?.school || '',
            bio: data?.bio || '',
            interests: Array.isArray(data?.interests) ? data.interests : [],
            avatarUrl: data?.avatarUrl || '',
            stats: data?.stats || {},
            appearanceMode: data?.appearanceMode || 'light',
            volume: typeof data?.volume === 'number' ? data.volume : 70,
            notifications: data?.notifications || { dailyChallenge: true, newModule: true },
            dailyGoal: typeof data?.dailyGoal === 'number' ? data.dailyGoal : 50,
            reminderTime: data?.reminderTime || '16:00',
            email: data?.email || email
          };

          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
          window.dispatchEvent(new CustomEvent('ecoSprintProfileUpdated', { detail: nextProfile }));
          setProfile(nextProfile);
        })
        .catch(() => {
          // Keep the existing local snapshot if the backend request fails.
        });
    }

    return () => {
      window.removeEventListener('storage', syncProfile);
      window.removeEventListener('ecoSprintProfileUpdated', syncProfile);
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const profileName = profile?.name || 'Your Profile';
  const profileLevel = profile?.stats?.level || 'Learner';
  const profileAvatar = profile?.avatarUrl || '';
  const profileInitials = useMemo(() => {
    return (profileName || 'EP')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'EP';
  }, [profileName]);

  return (
    <aside className="group w-20 hover:w-64 bg-white border-r border-slate-200 flex flex-col h-screen overflow-hidden shrink-0 transition-all duration-300 ease-in-out z-50 fixed left-0 top-0 overflow-x-hidden">
        <div className="flex items-center py-6 border-b border-slate-100 transition-all duration-300 group-hover:px-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sprintPrimary text-white ml-[20px] group-hover:ml-0 transition-all duration-300">
            <img src={SprintIcon} alt="Sprint icon" className="w-6 h-6 block object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-sprintPrimary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            EcoSprint
          </span>
        </div>
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <LayoutDashboard className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Dashboard</span>
          </NavLink>
          <NavLink to="/modules" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <BookOpen className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Modules</span>
          </NavLink>
          <NavLink to="/challenges" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <Sword className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Challenges</span>
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <Trophy className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Leaderboard</span>
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <LineChart className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">My Progress</span>
          </NavLink>
          <NavLink to="/badges" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <Award className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Badges</span>
          </NavLink>
          <NavLink to="/ecobot" className={({ isActive }) => `flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-sprintPrimary sidebar-link ${isActive ? 'sidebar-active' : 'text-slate-500'}`}>
            <Bot className="w-6 h-6 shrink-0" /> 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">EcoBot</span>
          </NavLink>
        </nav>
        <div className="p-4 mt-auto">
          <NavLink 
            to="/profile"
            className={({ isActive }) => `flex items-center gap-3 px-2 py-4 mb-2 border-b border-slate-100 cursor-pointer hover:bg-slate-50 rounded-xl transition-colors ${isActive ? 'sidebar-active bg-slate-50' : ''}`}
          >
            {profileAvatar ? (
              <img
                alt={profileName}
                className="w-8 h-8 rounded-full border border-slate-200 shrink-0 object-cover"
                src={profileAvatar}
              />
            ) : (
              <div className="w-8 h-8 rounded-full border border-slate-200 shrink-0 bg-[#4EA24E] text-white flex items-center justify-center text-xs font-bold">
                {profileInitials}
              </div>
            )}
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="text-xs font-bold truncate text-slate-900">{profileName}</p>
              <p className="text-[10px] text-slate-500 truncate">{profileLevel}</p>
            </div>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-4 px-2 py-2.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90 logout-button"
          >
            <div className="w-6 h-6 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5" />
            </div> 
            <span className="hidden group-hover:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>
  );
};

export default SidebarEcoDboard;
