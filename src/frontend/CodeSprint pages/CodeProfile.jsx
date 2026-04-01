import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import EditProfilepopup from '../../CodeSprintpopups/EditProfilepopup';
import Logoutpop from '../../CodeSprintpopups/Logoutpop';
import styles from './CodeProfile.module.css';

// SVG Icons
const MapIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 21 18 21 2 14 6 6 2 1 6"/>
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m4 17 6-6-6-6M12 19h8"/>
  </svg>
);

const EmojiEventsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const PersonIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
);

const FireIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);

const MedalIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const ManageAccountsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 8v6l4-3-4-3zm1-8v3h3v-3h-3zM8 4h8v4h-8V4zm10 8h6v6h-6v-6zm-8 2h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h8v2h-8v-2z"/>
  </svg>
);

const NotificationsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h20v-1l-2-2z"/>
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const CameraIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="3.2"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
);

const QuizIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.55 12c-.42-.66-.98-1.24-1.64-1.68-.3-.2-.48-.52-.48-.87V9c0-.55.45-1 1-1s1 .45 1 1v.09c.49.36.85.85 1.04 1.41-.36.14-.71.33-1.04.57-.11.08-.19.17-.26.26-.28.4-.27.94.06 1.31l1.62 1.88c.38.44.62.99.68 1.57l.43 4.28c.06.57.52 1.02 1.1 1.08l.06.01c.58.06 1.1-.34 1.23-.91l.67-3.2c.15-.74-.13-1.5-.71-1.99l-1.94-1.55c-.27-.22-.43-.55-.43-.89v-.45c0-.48-.19-.93-.51-1.28C11.56 11.73 11.07 11.55 10.57 11.54c-.24-.01-.47.01-.71.07-.18.04-.35.12-.5.22C9.26 12.19 8.93 12.08 8.55 12zM19 4h-4.18C14.4 2.84 13.3 2 12 2s-2.4.84-2.82 2H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z"/>
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[#121316] text-[#e3e2e6] font-sans h-screen flex overflow-hidden">
      <JourneySidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#1a1b1e] ml-16 no-scrollbar">
        <div className="w-full px-6 md:px-10 py-8 space-y-6">
          {/* Profile Header Card */}
          <section className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-[#3f484e]/10">
            <div className="h-48 relative bg-gradient-to-r from-[#0d0e11] via-[#004c69] to-[#0a2d40] overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#7bd0ff]/15 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#7bd0ff]/10 blur-3xl"></div>
              <button 
                onClick={() => triggerToast('Opening cover image selector...')}
                className="absolute bottom-4 right-6 bg-[#121316]/60 hover:bg-[#121316]/80 text-[#e3e2e6]/60 text-xs px-4 py-2 rounded-lg flex items-center gap-2 backdrop-blur-sm transition-all"
              >
                <CameraIcon />
                Edit Cover
              </button>
            </div>
            <div className="px-10 pb-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
                <div 
                  className="relative -mt-12 group cursor-pointer"
                  onClick={() => setShowEditModal(true)}
                >
                  <div className="w-32 h-32 rounded-3xl bg-[#004c69] border-8 border-[#1f1f23] text-white font-black text-4xl flex items-center justify-center shadow-2xl overflow-hidden">
                    JS
                  </div>
                  <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity border-8 border-transparent">
                    <CameraIcon />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-3xl font-bold text-white tracking-tight">John Smith</h1>
                    <span className="bg-[#004c69]/40 border border-[#7bd0ff]/30 text-[#7bd0ff] text-xs font-bold rounded-full px-3 py-1 flex items-center gap-1.5">
                      PYTHON <span className="text-[14px]">⌘</span>
                    </span>
                  </div>
                  <p className="flex items-center justify-center md:justify-start gap-1.5 text-[#bec8cf] text-sm mt-2">
                    🏛 Stanford University
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowEditModal(true)}
                className="bg-[#7bd0ff] text-[#003549] font-semibold text-sm px-10 py-3.5 rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(123,208,255,0.3)] transition-all active:scale-95 mb-1"
              >
                <EditIcon />
                Edit Profile
              </button>
            </div>
          </section>

          {/* XP Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1f1f23] p-8 rounded-2xl border border-[#3f484e]/10 text-center hover:border-[#7bd0ff]/30 transition-colors group">
              <span className="text-[#c3c0ff] text-3xl mb-2 block"><BoltIcon /></span>
              <div className="text-3xl font-black text-white">12,450</div>
              <div className="text-[11px] uppercase tracking-widest text-[#bec8cf] font-bold mt-1">Total XP</div>
            </div>
            <div className="bg-[#1f1f23] p-8 rounded-2xl border border-[#3f484e]/10 text-center hover:border-[#7bd0ff]/30 transition-colors">
              <span className="text-[#E85A18] text-3xl mb-2 block"><FireIcon /></span>
              <div className="text-3xl font-black text-white">14</div>
              <div className="text-[11px] uppercase tracking-widest text-[#bec8cf] font-bold mt-1">Day Streak</div>
            </div>
            <div className="bg-[#1f1f23] p-8 rounded-2xl border border-[#3f484e]/10 text-center hover:border-[#7bd0ff]/30 transition-colors">
              <span className="text-[#7bd0ff] text-3xl mb-2 block"><CodeIcon /></span>
              <div className="text-3xl font-black text-white">152</div>
              <div className="text-[11px] uppercase tracking-widest text-[#bec8cf] font-bold mt-1">Solved</div>
            </div>
            <div className="bg-[#1f1f23] p-8 rounded-2xl border border-[#3f484e]/10 text-center hover:border-[#7bd0ff]/30 transition-colors">
              <span className="text-[#FFB800] text-3xl mb-2 block"><MedalIcon /></span>
              <div className="text-3xl font-black text-white">#42</div>
              <div className="text-[11px] uppercase tracking-widest text-[#bec8cf] font-bold mt-1">Rank</div>
            </div>
          </div>

          {/* Tabbed Interface */}
          <section className="bg-[#1f1f23] rounded-2xl overflow-hidden border border-[#3f484e]/10">
            <div className="flex border-b border-[#3f484e]/10">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-5 flex items-center justify-center gap-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'overview' 
                    ? 'text-[#7bd0ff] border-[#7bd0ff] bg-[#7bd0ff]/5' 
                    : 'text-[#bec8cf] hover:text-white border-transparent'
                }`}
              >
                <DashboardIcon />
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-5 flex items-center justify-center gap-3 text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'settings' 
                    ? 'text-[#7bd0ff] border-[#7bd0ff] bg-[#7bd0ff]/5' 
                    : 'text-[#bec8cf] hover:text-white border-transparent'
                }`}
              >
                <SettingsIcon />
                Settings
              </button>
            </div>
            <div className="p-10">
              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-10 animate-fade-in">
                  {/* Language Progress */}
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#7bd0ff]/10 flex items-center justify-center">
                        <span className="text-[#7bd0ff]"><TerminalIcon /></span>
                      </div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Language Progress</h2>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-[#2d2800] flex items-center justify-center border border-yellow-500/20 shadow-lg shrink-0">
                          <span className="text-4xl">🐍</span>
                        </div>
                        <div>
                          <h3 className="font-black text-2xl text-white uppercase leading-tight">Python</h3>
                          <p className="text-[#bec8cf] text-sm mt-1">Level 12 Architect</p>
                        </div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex justify-between text-xs uppercase font-black text-[#bec8cf] mb-3">
                          <span>Mastery Progress</span>
                          <span className="text-[#7bd0ff]">64%</span>
                        </div>
                        <div className="w-full h-4 bg-[#0d0e11] rounded-full overflow-hidden border border-[#3f484e]/5">
                          <div className="h-full bg-gradient-to-r from-[#3c9ac7] to-[#7bd0ff] w-[64%] relative">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="pt-6">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#7bd0ff] text-sm">⏰</span>
                      <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Recent Activity</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1b1e]/50 border border-transparent hover:border-[#3f484e]/20 hover:bg-[#292a2d] transition-all group">
                        <div className="w-10 h-10 rounded-full bg-[#343538] flex items-center justify-center border border-[#3f484e]/10 group-hover:border-[#7bd0ff]/50 transition-colors">
                          <span className="text-sm text-[#7bd0ff]"><BookIcon /></span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-[#e3e2e6]">Variables — Numbers lesson</p>
                          <p className="text-[11px] text-[#bec8cf] uppercase font-bold mt-1">2 hours ago</p>
                        </div>
                        <div className="bg-[#004c69] text-[#7bd0ff] text-xs px-3 py-1 rounded-full font-bold">+10 XP</div>
                      </div>
                      <div className="flex items-center gap-5 p-4 rounded-xl bg-[#1a1b1e]/50 border border-transparent hover:border-[#3f484e]/20 hover:bg-[#292a2d] transition-all group">
                        <div className="w-10 h-10 rounded-full bg-[#343538] flex items-center justify-center border border-[#3f484e]/10 group-hover:border-[#7bd0ff]/50 transition-colors">
                          <span className="text-sm text-[#7bd0ff]"><QuizIcon /></span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-[#e3e2e6]">Variables quiz (4/5)</p>
                          <p className="text-[11px] text-[#bec8cf] uppercase font-bold mt-1">3 hours ago</p>
                        </div>
                        <div className="bg-[#004c69] text-[#7bd0ff] text-xs px-3 py-1 rounded-full font-bold">+40 XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab Content */}
              {activeTab === 'settings' && (
                <div className="animate-fade-in space-y-12">
                  {/* Account Settings */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="text-[#7bd0ff] text-2xl"><ManageAccountsIcon /></span>
                      Account Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase font-black text-[#bec8cf] tracking-wider mb-3">Display Name</label>
                        <input 
                          className="w-full bg-[#0d0e11] border border-[#3f484e]/20 rounded-xl px-5 py-4 text-sm text-white focus:ring-1 focus:ring-[#7bd0ff]/40 focus:border-[#7bd0ff]/40 outline-none transition-all" 
                          type="text" 
                          defaultValue="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-black text-[#bec8cf] tracking-wider mb-3">Email</label>
                        <input 
                          className="w-full bg-[#0d0e11] border border-[#3f484e]/20 rounded-xl px-5 py-4 text-sm text-white focus:ring-1 focus:ring-[#7bd0ff]/40 focus:border-[#7bd0ff]/40 outline-none transition-all" 
                          type="email" 
                          defaultValue="john.smith@stanford.edu"
                        />
                      </div>
                    </div>
                    <button className="mt-6 text-[#7bd0ff] text-sm font-bold hover:underline">Change Password</button>
                  </div>

                  {/* Notifications */}
                  <div className="pt-8 border-t border-[#3f484e]/10">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="text-[#7bd0ff] text-2xl"><NotificationsIcon /></span>
                      Notifications
                    </h3>
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-semibold text-[#e3e2e6]">Streak Reminders</p>
                          <p className="text-sm text-[#bec8cf]">Don't lose your progress, get a daily nudge</p>
                        </div>
                        <div className="w-12 h-6 bg-[#7bd0ff] rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-[#003549] rounded-full shadow-sm"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-base font-semibold text-[#e3e2e6]">New Course Alerts</p>
                          <p className="text-sm text-[#bec8cf]">Be the first to know about new languages</p>
                        </div>
                        <div className="w-12 h-6 bg-[#343538] rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-[#899299] rounded-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="pt-8 border-t border-[#3f484e]/10">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="text-[#7bd0ff] text-2xl"><PaletteIcon /></span>
                      Appearance
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="border-2 border-[#7bd0ff] rounded-2xl p-6 bg-[#0d0e11] cursor-pointer">
                        <div className="w-full h-16 bg-[#292a2d] rounded-lg mb-3"></div>
                        <p className="text-center text-xs font-bold uppercase tracking-wider">Cyber Dark</p>
                      </div>
                      <div className="border border-[#3f484e]/20 rounded-2xl p-6 bg-white/5 cursor-pointer hover:border-[#7bd0ff]/30 transition-all">
                        <div className="w-full h-16 bg-white/10 rounded-lg mb-3"></div>
                        <p className="text-center text-xs font-bold uppercase tracking-wider text-[#bec8cf]">Pure Black</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-end">
                    <button 
                      onClick={() => triggerToast('Settings saved!')}
                      className="bg-[#7bd0ff] text-[#003549] font-bold px-12 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(123,208,255,0.3)] transition-all"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="mt-12 border-t border-[#3f484e]/10 pt-10">
            <h4 className="text-[#E53E3E] uppercase text-xs font-black tracking-[0.3em] mb-6 ml-2">Danger Zone</h4>
            <div className="bg-[#93000a]/5 border border-[#ffb4ab]/10 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-[#ffb4ab]/10 flex items-center justify-center shrink-0">
                  <span className="text-3xl text-[#ffb4ab]"><LogOutIcon /></span>
                </div>
                <div>
                  <h5 className="font-bold text-xl text-white">Log Out Account</h5>
                  <p className="text-[#bec8cf] text-sm mt-1">Ready for a break? Your progress is safely synced to the cloud.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="bg-[#ffb4ab] text-[#690005] font-bold px-12 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(255,180,171,0.2)] transition-all active:scale-95 whitespace-nowrap"
              >
                Yes, Log Out
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Edit Profile Popup */}
      {showEditModal && (
        <EditProfilepopup 
          onClose={() => setShowEditModal(false)} 
          onSave={(data) => {
            triggerToast('Profile updated!');
          }}
        />
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutModal && (
        <Logoutpop onClose={() => setShowLogoutModal(false)} />
      )}

      {/* Success Toast */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#343538] border border-[#57dea0]/20 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-[#00a56e]/20 flex items-center justify-center">
            <span className="text-[#57dea0]"><CheckIcon /></span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Success</p>
            <p className="text-[#bec8cf] text-xs">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
