import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, BookOpen, Zap, Trophy, LineChart, 
  Award, Bot, LogOut, ChevronRight, Camera, UserCog, 
  MapPin, CheckCircle2, MessageSquare, Sun, Droplets, 
  Check, X, Key, Sun as SunIcon, Moon, Monitor
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import EditProfilepopup from '../../popup/EditProfilepopup';
import Logoutpopup from '../../popup/Logoutpopup';
import styles from './Profile.module.css';

// User data
const userData = {
  name: "Alex Rivera",
  initials: "AR",
  class: "11-B",
  school: "Greenview High School",
  bio: "Passionate about sustainable living and renewable energy. Working towards making our school the greenest in the district. 🌿",
  interests: ["Solar Energy", "Recycling", "Urban Farming", "Policy"],
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA",
  stats: {
    ecoPoints: 1250,
    level: "Level 4",
    badges: 7,
    schoolRank: "#42"
  }
};

// Recent activity data
const recentActivity = [
  { type: 'quiz', title: 'Completed the Solar Systems quiz with 100% score.', time: '2 hours ago', icon: CheckCircle2, color: 'bg-green-100 text-green-600' },
  { type: 'badge', title: 'Earned the "Early Bird" badge.', time: 'Yesterday', icon: Trophy, color: 'bg-amber-100 text-amber-600' },
  { type: 'community', title: 'Shared a new eco-tip in the Community Forum.', time: '2 days ago', icon: MessageSquare, color: 'bg-blue-100 text-blue-600' }
];

// Completed modules
const completedModules = [
  { name: "Solar Basics", score: "98%", icon: Sun },
  { name: "Water Conservation", score: "92%", icon: Droplets }
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [appearanceMode, setAppearanceMode] = useState('light');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyChallenge: true,
    newModule: true
  });

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="flex-1 ml-20 p-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <button onClick={() => navigate('/dashboard')} className="hover:text-[#4EA24E] transition-colors">Dashboard</button>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-slate-800">My Profile</span>
        </nav>

        {/* Profile Header Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-[#4EA24E] to-[#68C068] relative">
            <button className="absolute bottom-4 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
              <Camera className="w-4 h-4" /> Edit Cover
            </button>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-10">
              {/* Avatar */}
              <div className="relative w-32 h-32 rounded-3xl bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-400 overflow-hidden group/avatar">
                {userData.initials}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
              {/* User Details */}
              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-bold text-slate-900">{userData.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-1 bg-[#4EA24E]/10 text-[#4EA24E] text-xs font-bold rounded-full uppercase tracking-wider">Class 11</span>
                  <span className="flex items-center gap-1 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" /> {userData.school}
                  </span>
                </div>
              </div>
              {/* Action Button */}
              <div className="pb-2">
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-2 transition-all"
                >
                  <UserCog className="w-5 h-5" /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Eco-Points</p>
              <p className="text-xl font-bold text-slate-900">{userData.stats.ecoPoints.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4EA24E]/10 rounded-xl flex items-center justify-center text-[#4EA24E]">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Current Level</p>
              <p className="text-xl font-bold text-slate-900">{userData.stats.level}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Badges Earned</p>
              <p className="text-xl font-bold text-slate-900">{userData.stats.badges}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">School Rank</p>
              <p className="text-xl font-bold text-slate-900">{userData.stats.schoolRank}</p>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Tab Header */}
          <div className="flex border-b border-slate-100 px-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-8 py-5 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'profile'
                  ? 'border-[#4EA24E] text-[#4EA24E]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              PROFILE INFO
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-8 py-5 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'settings'
                  ? 'border-[#4EA24E] text-[#4EA24E]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              SETTINGS
            </button>
          </div>

          <div className="p-8">
            {/* Tab 1 - Profile Info */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Bio</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{userData.bio}</p>
                  </section>
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest, index) => (
                        <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                          {interest}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">+2 more</span>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Recent Activity */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
                      <button className="text-[#4EA24E] text-xs font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                          <div className={`w-10 h-10 ${activity.color} rounded-full flex flex-shrink-0 items-center justify-center`}>
                            <activity.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: activity.title }}></p>
                            <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Completed Modules */}
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Completed Modules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {completedModules.map((module, index) => (
                        <div key={index} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#4EA24E]">
                              <module.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{module.name}</p>
                              <p className="text-xs text-slate-400">Score: {module.score}</p>
                            </div>
                          </div>
                          <Check className="text-[#4EA24E] w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* Tab 2 - Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-12">
                {/* Account Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h4 className="text-lg font-bold text-slate-900">Account Details</h4>
                    <p className="text-sm text-slate-500">Update your basic information and security.</p>
                  </div>
                  <div className="col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input className="w-full rounded-xl border-slate-200 focus:ring-[#4EA24E] focus:border-[#4EA24E] transition-all p-2.5 border" type="text" defaultValue="Alex Rivera" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input className="w-full rounded-xl border-slate-200 focus:ring-[#4EA24E] focus:border-[#4EA24E] transition-all p-2.5 border" type="email" defaultValue="alex.r@greenview.edu" />
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowPasswordModal(true)}
                      className="text-[#4EA24E] text-sm font-bold flex items-center gap-2 hover:opacity-80 group"
                    >
                      <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Change Password
                    </button>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Notifications Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h4 className="text-lg font-bold text-slate-900">Notifications</h4>
                    <p className="text-sm text-slate-500">Control how and when you receive alerts.</p>
                  </div>
                  <div className="col-span-2 space-y-4">
                    {[
                      { key: 'dailyChallenge', label: 'Daily Challenge Reminders', desc: 'Never miss a streak' },
                      { key: 'newModule', label: 'New Module Alerts', desc: 'Know when new lessons are available' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notifications[item.key]}
                            onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4EA24E]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Learning Preferences */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h4 className="text-lg font-bold text-slate-900">Learning</h4>
                    <p className="text-sm text-slate-500">Customize your educational journey.</p>
                  </div>
                  <div className="col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Daily Goal (Eco-Points)</label>
                        <input className="w-full rounded-xl border-slate-200 focus:ring-[#4EA24E] p-2.5 border" type="number" defaultValue="50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Reminder Time</label>
                        <input className="w-full rounded-xl border-slate-200 focus:ring-[#4EA24E] p-2.5 border" type="time" defaultValue="16:00" />
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Appearance */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <h4 className="text-lg font-bold text-slate-900">Appearance</h4>
                    <p className="text-sm text-slate-500">Select your visual theme preference.</p>
                  </div>
                  <div className="col-span-2 flex gap-4">
                    {[
                      { id: 'light', icon: SunIcon, label: 'Light' },
                      { id: 'dark', icon: Moon, label: 'Dark' },
                      { id: 'auto', icon: Monitor, label: 'Auto' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setAppearanceMode(mode.id)}
                        className={`flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all group ${
                          appearanceMode === mode.id
                            ? 'border-[#4EA24E] bg-[#4EA24E]/5'
                            : 'border-slate-100 bg-white hover:border-[#4EA24E]'
                        }`}
                      >
                        <mode.icon className={`w-6 h-6 transition-colors ${
                          appearanceMode === mode.id ? 'text-[#4EA24E]' : 'text-slate-400 group-hover:text-[#4EA24E]'
                        }`} />
                        <span className={`text-sm font-bold transition-colors ${
                          appearanceMode === mode.id ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'
                        }`}>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Danger Zone */}
                <section className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-rose-600">Danger Zone</h4>
                    <p className="text-sm text-rose-400">Log out or delete your account permanently.</p>
                  </div>
                  <button 
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#D23B42] text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-md"
                  >
                    Log Out {userData.name.split(' ')[0]}
                  </button>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfilepopup onClose={() => setShowEditModal(false)} />
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4EA24E]/10 text-[#4EA24E] rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
              </div>
              <button onClick={() => setShowPasswordModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Current Password</label>
                <input className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-[#4EA24E]" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">New Password</label>
                <input className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-[#4EA24E]" type="password" placeholder="Min. 8 characters" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Confirm New Password</label>
                <input className="w-full rounded-xl border-slate-200 border p-2.5 focus:ring-[#4EA24E]" type="password" placeholder="Confirm your new password" />
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowPasswordModal(false)} className="px-6 py-2.5 font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <button onClick={() => setShowPasswordModal(false)} className="px-6 py-2.5 bg-[#4EA24E] text-white font-bold rounded-xl shadow-lg shadow-[#4EA24E]/20">Update Password</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirm Modal */}
      {showLogoutModal && (
        <Logoutpopup 
          onClose={() => setShowLogoutModal(false)}
          userName={userData.name}
          streakDays={7}
        />
      )}
    </div>
  );
};

export default Profile;
