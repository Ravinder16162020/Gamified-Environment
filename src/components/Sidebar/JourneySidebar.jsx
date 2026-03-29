import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Map, Swords, Flag, Target, Trophy, LogOut, Code2 } from 'lucide-react';
import styles from './JourneySidebar.module.css';

const JourneySidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { to: '/journey', icon: Map, label: 'Journey', active: true },
    { to: '/practice', icon: Swords, label: 'Practice' },
    { to: '/goals', icon: Flag, label: 'Goals' },
    { to: '/code/challenges', icon: Target, label: 'Challenges' },
    { to: '/code/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <>
      {/* Spacer */}
      <div className="w-16 shrink-0 h-full"></div>
      
      {/* Sidebar */}
      <aside className="group w-16 hover:w-56 bg-[#252627] border-r border-[#424548] flex flex-col h-full overflow-hidden shrink-0 transition-all duration-300 ease-in-out z-50 fixed left-0 top-0 overflow-x-hidden">
        {/* Header/Logo */}
        <div className="px-4 py-5 border-b border-[#424548] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-[#2087B3] rounded-lg text-white flex items-center justify-center flex-shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-[#2087B3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">CodeSprint</span>
        </div>

        {/* Main Nav */}
        <nav className={`flex-1 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden ${styles.customScrollbar}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                const isJourneyActive = item.to === '/journey' && 
                  (location.pathname === '/journey' || 
                   location.pathname === '/codeeditor' || 
                   location.pathname === '/quiztheory');
                const active = isActive || isJourneyActive;
                return `flex items-center gap-4 px-5 py-3 transition-colors ${
                  active 
                    ? `${styles.sidebarActive} bg-[#0E4A66] text-[#2087B3] border-r-[3px] border-[#2087B3] font-bold` 
                    : 'text-[rgba(255,255,255,0.6)] hover:bg-[#2d2e2f] hover:text-white'
                }`;
              }}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 group-hover:p-4 border-t border-[#424548] shrink-0">
          <NavLink 
            to="/code/profile"
            className={({ isActive }) => {
              const baseClasses = 'flex items-center justify-center group-hover:justify-start gap-3 mb-4 cursor-pointer w-full h-12 px-0 group-hover:px-4 rounded-lg transition-colors';
              if (isActive) {
                return `${baseClasses} bg-[#0E4A66] text-[#2087B3] border-l-4 border-[#2087B3] font-bold`;
              }
              return `${baseClasses} text-[rgba(255,255,255,0.6)] hover:bg-[#2d2e2f] hover:text-white`;
            }}
          >
            <img 
              alt="Avatar" 
              className="w-7 h-7 rounded-full flex-shrink-0 object-cover ring-2 ring-[#3f484e]/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsYOkwu9KfW0qsazgwq3G5XEcsuD_vKnzaqj8nXtStJB5Q_y9eiHec2jlbQxjufktLwmqr15LxSYjs2w_CGJzXyRcHdHePePiIno12TyTi4G98fxThtXxcKDgu9sr7vgGCC6rJfG4rwbdWvo_s42ISM6FFscduNwDDywV_kktQqXjOIbbjhusiu0Vi7a3MzCFwgGs9WHUiJJMp6ViAZrTTWkd8J6ab4By2OeCkfelsa7_-qNWofa2i0-_in77LJo1DEn9wnYti3g"
            />
            <div className="flex flex-col hidden group-hover:flex transition-all duration-300 whitespace-nowrap">
              <span className="text-sm font-bold text-white">Alex Rivera</span>
              <span className="text-xs text-white/40">Gold League</span>
            </div>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="w-full bg-[#a90404] hover:bg-red-700 text-white rounded-lg p-2 flex items-center justify-center transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="ml-2 hidden group-hover:inline text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default JourneySidebar;
