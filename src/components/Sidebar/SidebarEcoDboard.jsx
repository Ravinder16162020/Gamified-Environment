import React from 'react';
import { Zap, LayoutDashboard, BookOpen, Sword, Trophy, LineChart, Award, Bot, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './SidebarEcoDboard.css';

const SidebarEcoDboard = () => {
  return (
    <aside className="group w-20 hover:w-64 bg-white border-r border-slate-200 flex flex-col h-screen overflow-hidden shrink-0 transition-all duration-300 ease-in-out z-50 fixed left-0 top-0 overflow-x-hidden">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-slate-100">
          <div className="bg-sprintPrimary p-1.5 rounded-lg text-white">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-sprintPrimary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            SprintEd
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
          <div className="flex items-center gap-3 px-2 py-4 mb-2 border-b border-slate-100">
            <img 
              alt="Alex Rivera" 
              className="w-8 h-8 rounded-full border border-slate-200 shrink-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA"
            />
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p className="text-xs font-bold truncate text-slate-900">Alex Rivera</p>
              <p className="text-[10px] text-slate-500 truncate">Advanced Learner</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-4 px-2 py-2.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90 logout-button">
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
