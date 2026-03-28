import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Star, Clock, ChevronRight, PlayCircle, Award, FileText, Lightbulb, RefreshCw, ArrowRight, ArrowLeft, Users, Share2, MessageSquare, Check } from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './ClimateChangeModule.module.css';

const lessonSteps = [
  { id: 1, title: 'Introduction to Climate', duration: '5 min', completed: true, current: false },
  { id: 2, title: 'The Greenhouse Effect', duration: '8 min', completed: true, current: false },
  { id: 3, title: 'Global Temperature Rise', duration: '10 min', completed: true, current: true },
  { id: 4, title: 'Carbon Cycle Systems', duration: '12 min', completed: false, current: false },
  { id: 5, title: 'Human Impact Analysis', duration: '10 min', completed: false, current: false },
  { id: 6, title: 'Quiz & Assessment', duration: '5 min', completed: false, current: false }
];

const relatedModules = [
  {
    id: 1,
    title: 'Renewable Energy Sources',
    category: 'Energy',
    difficulty: 'Beginner',
    duration: '60m',
    status: 'in-progress',
    progress: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAREhSRmK-86DMVbxsqLdixf7aD2PToNIOF2P6NqkmceihdEcC-u-KEhocmXZgzv9oFteL9jRHOs9wXfDWtn7itAlHq_m_hh-TMbYzN3kkYTjmybQRTDSMn_sH4rj--P0VSJvYc8uJxb18xTkzaRrBokAAuFUFgsMdfFkiZ2lZjKGIQAL_YD-F2YBZZfVRBlkV3ceruamgnVVPdpPTzEqVtBK5t0lGAp9NHHHDO6UFElKawiCx0SHW8_kolU3BPbwekRIuGNGSSWQ',
    categoryColor: 'bg-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 2,
    title: 'Protecting Biodiversity',
    category: 'Nature',
    difficulty: 'Advanced',
    duration: '75m',
    status: 'completed',
    points: 300,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuAi55IQXqiROkO3Jgkis8Q1Zzuo8jGlnGejbYIotgJyufVrcOmZ3GE4nAQsVP6cDa0bT_BWqgQkK2kcM-Q-R1poAD2njZgG2GYaoxa29cMewY1VTsW6oyaoGyF3da6ijo7HHoaV8nApULGiPEFq6ADfrHRVp0Z4zbEtp4lMrL67q-6poQGAIzwMLL6isIGiP0IT69YftUkin6WCiJ2rxV16KD5OViGjhnoaNMdefKpM4iXumOb3iJMim98NfH83kaiUmtDjcJfA',
    categoryColor: 'bg-emerald-600',
    bgColor: 'bg-emerald-100'
  }
];

const achievements = [
  { icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, text: '3 of 6 lessons completed', completed: true },
  { icon: <Clock className="w-5 h-5 text-blue-600" />, text: '23 minutes of learning', completed: true },
  { icon: <Award className="w-5 h-5 text-amber-500" />, text: '200 XP points available', completed: false },
  { icon: <Star className="w-5 h-5 text-slate-400" />, text: 'Climate Guardian Badge', completed: false }
];

const discussionPosts = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACFYeC-26AWDHU_xYA0U1HgEgq7u987IWInH-NTxWMixElNRVJeEUBUtgKjjBJtibEZL44YhGBA89MJ4l8QBJYslmiZrJwsQQA_FPoCL6VRSMAo6oykzvrTVFsyxrYeJf7pf9YmXyFlgkHVtCuvAmzyAUpThPX_mPVp2TYpdrZOmdBOHd5LApLL-dT5h_2yWexHfaruBZ8DcjWX3iUWvzUd8ornuu_nDHvYYkp_vJXpgfmZ7KXqUsikE0qSJKytBhNQRTi05YJ3A',
    time: '2 hours ago',
    content: 'The greenhouse effect section really helped me understand why CO2 levels matter so much. Great visualization!',
    likes: 24
  },
  {
    id: 2,
    user: 'Marcus Johnson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_BzpDmN64tAzGV6Rb2WKZGhkoaOLaPQ847Hyn4tN-TbiKUAoyJIwhWV_-NWGOzlX8nX3MeeJJcJqB0M9GfziV61dFXZGBPhLBiMxmqj_xpplv18esn6KcE-RRHIKBW3K-kuONALHEA-HEG8vpJAuyL5DNGABnSjHhGk5IcOvoQvM_ujXSWy-sIY1tQCGj28pUwq31siKzx9hcmSdjGY30cK_4hWaOaWcx86Z6vNcE7GpFmp6u6MUvBsNh3mIiPy5b8Q6qIwP_qw',
    time: '5 hours ago',
    content: 'Can someone explain the difference between natural and anthropogenic greenhouse gas emissions?',
    likes: 12
  },
  {
    id: 3,
    user: 'Priya Sharma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA',
    time: 'Yesterday',
    content: 'Just completed the global temperature rise lesson. The data trends are alarming but important to understand.',
    likes: 31
  }
];

const ClimateChangeModule = () => {
  const navigate = useNavigate();
  const currentLesson = lessonSteps.find(l => l.current);
  const completedCount = lessonSteps.filter(l => l.completed).length;
  const progressPercent = (completedCount / lessonSteps.length) * 100;

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      <main className="ml-20 h-full overflow-y-auto bg-[#F8FAFC]">
        {/* Module Navigation Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <nav className="flex items-center text-sm">
              <a href="/dashboard" className="text-slate-500 hover:text-[#4EA24E]">Dashboard</a>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
              <a href="/modules" className="text-slate-500 hover:text-[#4EA24E]">Modules</a>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />
              <span className="text-slate-900 font-medium">Climate Change</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" /> Share Progress
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4EA24E] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
              <PlayCircle className="w-4 h-4" /> Resume Learning
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Module Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
                  <img 
                    alt="Climate Change" 
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQwrTbesX0Cq6qJzkfa8O5s-wYwaUu-VUiI4dpnOPZiB4r8kFuwPwZmuqhXThvM4k64CkSMgP0_dhWcGyezrbjMV9dRTtQWrPFPKUVf0W8I2IUQ-hnrKsRv360azmpAhl5B93vwtR04sW_f4J9L3lN18Okt54QZoxIM0LZ6vYZfg2KFL-VQ305M3yJ1uapLxc1XkUrsLTV3xVfeat9xRvTK_OBkqvInLpeZ8H39quLwGV4TAjqVBfTx_kOip4623dtYj72HLp4Kg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Climate</span>
                      <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded backdrop-blur-sm">Intermediate</span>
                    </div>
                    <h1 className="text-3xl font-bold">The Science of Climate Change</h1>
                    <p className="text-white/80 mt-2 text-sm">Understand the greenhouse effect and global temperature patterns</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">45 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">6 lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-slate-600">200 XP</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">2.4k students</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-700">Your Progress</span>
                      <span className="text-[#4EA24E]">{completedCount} of {lessonSteps.length} lessons</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4EA24E] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed">
                    Explore the fundamental science behind climate change. This module covers the greenhouse effect, 
                    global temperature trends, carbon cycle systems, and human impact on Earth's climate systems. 
                    Perfect for students looking to understand the environmental challenges of our time.
                  </p>
                </div>
              </div>

              {/* Learning Path / Lesson List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#4EA24E]" /> Learning Path
                </h2>
                
                <div className="space-y-3">
                  {lessonSteps.map((step, index) => (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        step.current 
                          ? 'border-[#4EA24E] bg-[#F0F9F0]' 
                          : step.completed 
                            ? 'border-slate-200 bg-white hover:border-slate-300' 
                            : 'border-slate-100 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : step.current 
                            ? 'bg-[#4EA24E] text-white' 
                            : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="font-bold text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${step.current ? 'text-[#4EA24E]' : 'text-slate-900'}`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500">{step.duration}</p>
                      </div>
                      {step.current && (
                        <span className="px-3 py-1 bg-[#4EA24E] text-white text-xs font-bold rounded-full">CURRENT</span>
                      )}
                      {step.completed && (
                        <span className="text-green-600 text-xs font-medium">Completed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Discussion Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#4EA24E]" /> Discussion
                </h2>
                
                <div className="space-y-4">
                  {discussionPosts.map(post => (
                    <div key={post.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <img alt={post.user} className="w-10 h-10 rounded-full" src={post.avatar} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900">{post.user}</span>
                          <span className="text-xs text-slate-500">{post.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{post.content}</p>
                        <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#4EA24E] transition-colors">
                          <span>♥</span> {post.likes} likes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 border-t border-slate-100">
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Join the discussion..." 
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-[#4EA24E] focus:border-[#4EA24E] outline-none"
                    />
                    <button className="px-4 py-2 bg-[#4EA24E] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Achievements Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#4EA24E]" /> Your Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.completed ? 'bg-green-50' : 'bg-slate-50'}`}>
                      {achievement.icon}
                      <span className={`text-sm ${achievement.completed ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                        {achievement.text}
                      </span>
                      {achievement.completed && <Check className="w-4 h-4 text-green-600 ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <button 
                  onClick={() => navigate('/modules/climate-change/learn')}
                  className="w-full py-3 bg-[#4EA24E] text-white font-bold rounded-xl hover:bg-green-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <PlayCircle className="w-5 h-5" /> Continue Learning
                </button>
                <button className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 mb-3">
                  <RefreshCw className="w-4 h-4" /> Restart Module
                </button>
                <button className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" /> Next Module
                </button>
              </div>

              {/* Related Modules */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Related Modules</h3>
                <div className="space-y-4">
                  {relatedModules.map(module => (
                    <div key={module.id} className="border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className={`h-24 ${module.bgColor} relative`}>
                        <img alt={module.title} className="w-full h-full object-cover" src={module.image} />
                        <span className={`absolute top-2 left-2 ${module.categoryColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded`}>
                          {module.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">{module.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                          <span>{module.difficulty}</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                        {module.status === 'in-progress' && (
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#4EA24E] rounded-full" style={{ width: `${module.progress}%` }} />
                          </div>
                        )}
                        {module.status === 'completed' && (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Did You Know?</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      The Earth's average temperature has risen by approximately 1.1°C since the late 1800s, 
                      with most of this warming occurring in the past 40 years.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClimateChangeModule;
