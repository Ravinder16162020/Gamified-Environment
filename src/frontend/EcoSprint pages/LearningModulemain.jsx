import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, ChevronRight, Clock, CheckCircle2, Star, RefreshCw, PlayCircle, ArrowRight, Lock, Check } from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './LearningModulemain.module.css';

const modules = [
  {
    id: 1,
    title: 'The Science of Climate Change',
    category: 'Climate',
    difficulty: 'Intermediate',
    duration: '45m',
    points: 200,
    pointsEarned: 200,
    status: 'completed',
    locked: false,
    routePath: '/modules/climate-change',
    description: 'Understand the greenhouse effect and how global temperatures are rising through data analysis.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQwrTbesX0Cq6qJzkfa8O5s-wYwaUu-VUiI4dpnOPZiB4r8kFuwPwZmuqhXThvM4k64CkSMgP0_dhWcGyezrbjMV9dRTtQWrPFPKUVf0W8I2IUQ-hnrKsRv360azmpAhl5B93vwtR04sW_f4J9L3lN18Okt54QZoxIM0LZ6vYZfg2KFL-VQ305M3yJ1uapLxc1XkUrsLTV3xVfeat9xRvTK_OBkqvInLpeZ8H39quLwGV4TAjqVBfTx_kOip4623dtYj72HLp4Kg',
    categoryColor: 'bg-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 2,
    title: 'Renewable Energy Sources',
    category: 'Energy',
    difficulty: 'Beginner',
    duration: '60m',
    points: 150,
    pointsEarned: 0,
    status: 'in-progress',
    progress: 65,
    locked: false,
    routePath: '/modules/renewable-energy',
    description: 'Explore solar, wind, and hydro power as alternatives to fossil fuels for a cleaner future.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAREhSRmK-86DMVbxsqLdixf7aD2PToNIOF2P6NqkmceihdEcC-u-KEhocmXZgzv9oFteL9jRHOs9wXfDWtn7itAlHq_m_hh-TMbYzN3kkYTjmybQRTDSMn_sH4rj--P0VSJvYc8uJxb18xTkzaRrBokAAuFUFgsMdfFkiZ2lZjKGIQAL_YD-F2YBZZfVRBlkV3ceruamgnVVPdpPTzEqVtBK5t0lGAp9NHHHDO6UFElKawiCx0SHW8_kolU3BPbwekRIuGNGSSWQ',
    categoryColor: 'bg-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    id: 3,
    title: 'Saving Our Water Resources',
    category: 'Water',
    difficulty: 'Beginner',
    duration: '30m',
    points: 150,
    pointsEarned: 0,
    status: 'not-started',
    locked: false,
    description: 'Learn simple habits to reduce daily water waste and protect local watersheds from pollution.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMXOnhE8sYsKOA6sxuTNpccSPPVUsSmAHxwS2Mm8oHPKMbTrpHfln8HivysHNxStWr916_avY3wyLsoQOH5AepTuUOaOsTz30u4mQt8nLJDurLmm2GA4ry5M1HN8u0_AveqOnROpVamxWLztWvHlZpTjlbZ4ZCoSSyjBDpLQKSbV7aV-WIoHTpdz16JWASf0HPmmpuwuZU85_uW-qDC_yqiiVfNlEi5yMnmFk1FuTPzpjEveluEzPevojPcIv-zbfpwBHDrygORA',
    categoryColor: 'bg-cyan-600',
    bgColor: 'bg-cyan-100'
  },
  {
    id: 4,
    title: 'Zero Waste Lifestyle',
    category: 'Waste',
    difficulty: 'Intermediate',
    duration: '50m',
    points: 250,
    pointsEarned: 0,
    status: 'locked',
    locked: true,
    description: "Master the 5 R's: Refuse, Reduce, Reuse, Repurpose, and Recycle to minimize landfill contributions.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADheKfQNmEX7uxj4QTJpHU6HRw9V5kabJ-ZK2p6BOC2AVA9m9AmxVvW7Wqiz6WM1Ol73rX8fhMlDc8QA003pkS2mS64DZor5Cen1Nmmcn9mt581pVZb5tg6z2ymxWV7uY9QmNLAJU3i2ZazYr0PLbWJzfdjCakYeLQtz-E1O0LGaIsL6pzDjji2IiAGSffmERRsQkgW2CPC9c8zIay0en8g6Ii-7labZ-TMO9ssFNMJHJFBV_lOFlwa5OIn0XaOICwXqpFz86jLw',
    categoryColor: 'bg-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    id: 5,
    title: 'Protecting Biodiversity',
    category: 'Nature',
    difficulty: 'Advanced',
    duration: '75m',
    points: 300,
    pointsEarned: 300,
    status: 'completed',
    locked: false,
    description: 'Explore ecosystem services and the importance of variety in flora and fauna for planetary health.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuAi55IQXqiROkO3Jgkis8Q1Zzuo8jGlnGejbYIotgJyufVrcOmZ3GE4nAQsVP6cDa0bT_BWqgQkK2kcM-Q-R1poAD2njZgG2GYaoxa29cMewY1VTsW6oyaoGyF3da6ijo7HHoaV8nApULGiPEFq6ADfrHRVp0Z4zbEtp4lMrL67q-6poQGAIzwMLL6isIGiP0IT69YftUkin6WCiJ2rxV16KD5OViGjhnoaNMdefKpM4iXumOb3iJMim98NfH83kaiUmtDjcJfA',
    categoryColor: 'bg-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 6,
    title: 'Sustainable Food Systems',
    category: 'Food',
    difficulty: 'Beginner',
    duration: '40m',
    points: 180,
    pointsEarned: 180,
    status: 'completed',
    locked: false,
    description: 'How your food choices impact the environment. From farm to table and the carbon footprint of diet.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ww10AiynUvTlugm3Igz3QM0fwmgBXeRP24ECrUwzhQuy_w9v9tsoDIo2kQne8ZQIs31_R48UB1xHZDXpMJpz1FHCcGGyY2x_GKJ1imy3Xol0djSggmEZGikREJBpTHfmIUBiSUOq3WkopPEml0KdWnJB72e7aJfotzdnsjahAI5ywWoZTaVHeklTAQDrITKVvscSwYT-NTgv6SxEeAknwPBM_YUuQBXz_Q4Ay3q2heLcsTcwLUL2xVyqZgMlu9lWipIpkt_t4A',
    categoryColor: 'bg-lime-600',
    bgColor: 'bg-lime-100'
  },
  {
    id: 7,
    title: 'Green Cities & Urban Design',
    category: 'Cities',
    difficulty: 'Intermediate',
    duration: '55m',
    points: 220,
    pointsEarned: 0,
    status: 'in-progress',
    progress: 15,
    locked: false,
    description: 'Designing cities for the future with green spaces, public transport, and energy-efficient buildings.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMfB_iIWtVmqA2XOJtPga60w5W3KAEzAoGZGm_sqHgTnd672iO_KXb0SSeUW_S5_NK4yWvLYEdplL8kk990FdIIjLXx9RH7EoQAqQ7LBJY08CKwruIBotuDwKViq2x12H_Ota4KI4szNFoHU3pbiao4MJdzfht_OVDxLO6dzK1Zd68474EDcGEY4LLpdrr1hVPTvQnYnzs4MjxmcYWjnwXVDNlHvA6j8uf4bOslxsfCOAzMlGf0LUa-Q131L4S05HPm08hZ-MAfg',
    categoryColor: 'bg-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 8,
    title: 'Our Blue Planet: Oceans',
    category: 'Ocean',
    difficulty: 'Advanced',
    duration: '65m',
    points: 250,
    pointsEarned: 250,
    status: 'completed',
    locked: false,
    description: 'The role of oceans in carbon sequestration and the impact of plastic pollution on marine life.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSfr0wTOWjIHthbuH95E49pNAVMUMBqqyxAkRzqCbSaYtKj-al8KLHeCXfZPm6VoBAjrmc5zWtxjk8ksMny0l73uPMnKJjjVLcbMhtSgpF-nxey18Cr5093k-xULZulw4RFqBwEeV4xn_cV_vtwo9i63QoG540pFL_OWDoEGdQNdpHlygmZXz5tiFSXEJvotqs_HTtYj9UdnnO_haijjWV4JeI-XVQUHN9PeGVBcM-4RUMoKp0UCkwDK_or9cws92Z6Z5sw2xB_w',
    categoryColor: 'bg-blue-700',
    bgColor: 'bg-blue-100'
  }
];

const ModuleCard = ({ module, navigate }) => {
  const renderButton = () => {
    switch (module.status) {
      case 'completed':
        return (
          <button className="w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" /> Review Module
          </button>
        );
      case 'in-progress':
        return (
          <button className="w-full py-2.5 bg-[#4EA24E] text-white font-bold rounded-xl hover:bg-green-700 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
            Continue Learning <PlayCircle className="w-4 h-4" />
          </button>
        );
      case 'not-started':
        return (
          <button className="w-full py-2.5 bg-white border-2 border-[#4EA24E] text-[#4EA24E] font-bold rounded-xl hover:bg-[#F0F9F0] transition-colors flex items-center justify-center gap-2">
            Start Module <ArrowRight className="w-4 h-4" />
          </button>
        );
      case 'locked':
      default:
        return (
          <button className="w-full py-2.5 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2" disabled>
            <Lock className="w-4 h-4" /> Locked
          </button>
        );
    }
  };

  const renderProgress = () => {
    if (module.status === 'completed') {
      return (
        <div className="flex items-center justify-between text-xs mb-3 font-medium">
          <span className="text-[#4EA24E] flex items-center gap-1">
            <Star className="w-3 h-3" /> {module.pointsEarned} pts earned
          </span>
          <span className="text-slate-400">Completed</span>
        </div>
      );
    }
    if (module.status === 'in-progress') {
      return (
        <div className="mb-4">
          <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1.5 uppercase">
            <span>Progress</span>
            <span>{module.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#4EA24E] rounded-full" style={{ width: `${module.progress}%` }}></div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between text-xs mb-3 font-medium">
        <span className="text-slate-500">Earn {module.points} points</span>
        <span className="text-slate-400 italic">{module.status === 'locked' ? 'Locked' : 'Not Started'}</span>
      </div>
    );
  };

  const handleModuleClick = () => {
    if (module.locked) {
      alert('Complete previous modules to unlock this one');
      return;
    }
    if (module.routePath) {
      // Determine mode based on status
      let mode = 'continue';
      if (module.status === 'not-started') {
        mode = 'start';
      } else if (module.status === 'completed') {
        mode = 'review';
      }
      navigate(`${module.routePath}/learn?mode=${mode}`);
    }
  };

  return (
    <div 
      className={`module-card bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col ${module.routePath ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={handleModuleClick}
    >
      <div className={`h-40 ${module.bgColor} relative group`}>
        <img alt={module.title} className="w-full h-full object-cover" src={module.image} />
        <span className={`absolute top-3 left-3 ${module.categoryColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded`}>
          {module.category}
        </span>
        {module.status === 'completed' && (
          <span className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{module.difficulty}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {module.duration}
          </span>
        </div>
        <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{module.title}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{module.description}</p>
        <div className="mt-auto">
          {renderProgress()}
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

const LearningModulemain = () => {
  const navigate = useNavigate();
  const completedModules = modules.filter(m => m.status === 'completed').length;
  const totalModules = modules.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      <main className="ml-20 h-full overflow-y-auto bg-[#F8FAFC] p-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <nav className="flex text-xs font-medium text-slate-500 mb-2 items-center gap-2">
              <a className="hover:text-[#4EA24E]" href="#">Dashboard</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900">Learning Modules</span>
            </nav>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="text-[#4EA24E] w-8 h-8" />
              Learning Modules
            </h1>
            <p className="text-slate-500 mt-1">8 core modules available for your grade level</p>
          </div>
          {/* Circular Progress Card */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 min-w-[240px]">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3"></path>
                <path className="text-[#4EA24E]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${progressPercentage}, 100`} strokeLinecap="round" strokeWidth="3"></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-slate-800">{progressPercentage}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Progress</p>
              <p className="text-lg font-bold text-slate-900 leading-tight">{completedModules} / {totalModules} <span className="text-xs font-normal text-slate-400">Completed</span></p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-[#4EA24E] focus:border-[#4EA24E] outline-none" 
              placeholder="Search topics..." 
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select className="border border-slate-200 rounded-lg text-sm focus:ring-[#4EA24E] focus:border-[#4EA24E] px-3 py-2 bg-slate-50 outline-none cursor-pointer">
              <option>All Topics</option>
              <option>Climate</option>
              <option>Energy</option>
              <option>Water</option>
              <option>Waste</option>
            </select>
            <select className="border border-slate-200 rounded-lg text-sm focus:ring-[#4EA24E] focus:border-[#4EA24E] px-3 py-2 bg-slate-50 outline-none cursor-pointer">
              <option>Difficulty</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <select className="border border-slate-200 rounded-lg text-sm focus:ring-[#4EA24E] focus:border-[#4EA24E] px-3 py-2 bg-slate-50 outline-none cursor-pointer">
              <option>Sort By</option>
              <option>Newest</option>
              <option>Alphabetical</option>
              <option>Points</option>
            </select>
          </div>
          <div className="ml-auto text-sm text-slate-500 font-medium">
            Showing {modules.length} modules
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} navigate={navigate} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LearningModulemain;
