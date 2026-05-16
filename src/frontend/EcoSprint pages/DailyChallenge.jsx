import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Check,
  X, Minus, History, HelpCircle, Lightbulb, CheckCircle2, AlertCircle
} from 'lucide-react';
import { getDailyChallenge, getDailyChallengeActivity, submitDailyChallengeAnswer } from '../../api';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';

const formatDateLabel = (dateValue) => {
  return new Date(dateValue).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
  });
};

const emptyChallenge = {
  challengeId: '',
  question: '',
  topic: '',
  options: [],
  correctAnswer: '',
  funFact: '',
  wrongFact: ''
};

const FALLBACK_CHALLENGES = [
  {
    question: 'Which action usually reduces household electricity use the most?',
    topic: 'Energy Efficiency',
    options: [
      { id: 'A', text: 'Leaving lights on in empty rooms' },
      { id: 'B', text: 'Using LED bulbs instead of old incandescent bulbs' },
      { id: 'C', text: 'Charging devices overnight every day' },
      { id: 'D', text: 'Opening the fridge repeatedly' }
    ],
    correctAnswer: 'B',
    funFact: 'LED bulbs use far less electricity and last much longer than incandescent bulbs.',
    wrongFact: 'Small habits help, but replacing inefficient bulbs is one of the easiest energy wins.'
  },
  {
    question: 'Which gas is a major greenhouse gas from livestock and landfills?',
    topic: 'Greenhouse Gases',
    options: [
      { id: 'A', text: 'Methane (CH4)' },
      { id: 'B', text: 'Nitrogen (N2)' },
      { id: 'C', text: 'Oxygen (O2)' },
      { id: 'D', text: 'Argon (Ar)' }
    ],
    correctAnswer: 'A',
    funFact: 'Methane traps much more heat than carbon dioxide over a short time period.',
    wrongFact: 'Only methane is a major warming gas here; inert gases like nitrogen and argon are not.'
  },
  {
    question: 'What is the best daily habit to reduce single-use plastic waste?',
    topic: 'Waste Reduction',
    options: [
      { id: 'A', text: 'Use a reusable water bottle' },
      { id: 'B', text: 'Buy more bottled drinks' },
      { id: 'C', text: 'Use a new plastic bag each time' },
      { id: 'D', text: 'Throw away reusable containers' }
    ],
    correctAnswer: 'A',
    funFact: 'Reusable items cut packaging waste and reduce the demand for single-use plastic.',
    wrongFact: 'Choosing reusable items is usually better than repeated single-use purchases.'
  },
  {
    question: 'Which transport choice often has the lowest carbon footprint per person?',
    topic: 'Sustainable Travel',
    options: [
      { id: 'A', text: 'Solo car trips' },
      { id: 'B', text: 'Public transit or shared rides' },
      { id: 'C', text: 'Short flights' },
      { id: 'D', text: 'Idle driving' }
    ],
    correctAnswer: 'B',
    funFact: 'When more people share one vehicle, the emissions per person usually drop.',
    wrongFact: 'Short flights and solo car trips typically produce more emissions per person.'
  },
  {
    question: 'Which food choice generally has a lower environmental impact?',
    topic: 'Sustainable Food',
    options: [
      { id: 'A', text: 'Plant-forward meals' },
      { id: 'B', text: 'Food that is thrown away' },
      { id: 'C', text: 'Imported food with heavy packaging' },
      { id: 'D', text: 'Extra-large portions you cannot finish' }
    ],
    correctAnswer: 'A',
    funFact: 'Plant-forward meals often use fewer resources than meals heavy in animal products.',
    wrongFact: 'Reducing food waste and choosing more plant-based meals both help lower impact.'
  },
  {
    question: 'Which item is most likely to be recycled correctly?',
    topic: 'Recycling',
    options: [
      { id: 'A', text: 'Clean paper and cardboard' },
      { id: 'B', text: 'Food-soiled containers' },
      { id: 'C', text: 'Mixed trash' },
      { id: 'D', text: 'Used tissues' }
    ],
    correctAnswer: 'A',
    funFact: 'Clean, dry paper products are usually easier for recycling systems to process.',
    wrongFact: 'Contaminated items can ruin batches of recyclables.'
  },
  {
    question: 'What is a good way to save water at home?',
    topic: 'Water Conservation',
    options: [
      { id: 'A', text: 'Leave the tap running while brushing teeth' },
      { id: 'B', text: 'Take shorter showers' },
      { id: 'C', text: 'Wash half-full laundry loads' },
      { id: 'D', text: 'Water the driveway' }
    ],
    correctAnswer: 'B',
    funFact: 'Shorter showers can save a surprising amount of water over time.',
    wrongFact: 'Running taps and unnecessary washing usually waste water instead of saving it.'
  },
  {
    question: 'Which energy source is renewable?',
    topic: 'Clean Energy',
    options: [
      { id: 'A', text: 'Coal' },
      { id: 'B', text: 'Solar power' },
      { id: 'C', text: 'Diesel' },
      { id: 'D', text: 'Petrol' }
    ],
    correctAnswer: 'B',
    funFact: 'Solar power is naturally replenished by sunlight.',
    wrongFact: 'Coal and diesel are fossil fuels and are not renewable.'
  },
  {
    question: 'What is the most eco-friendly way to reduce paper use?',
    topic: 'Paper Conservation',
    options: [
      { id: 'A', text: 'Print every draft' },
      { id: 'B', text: 'Use digital notes when possible' },
      { id: 'C', text: 'Use larger margins to fill more pages' },
      { id: 'D', text: 'Throw away used notebooks early' }
    ],
    correctAnswer: 'B',
    funFact: 'Digital notes can reduce paper demand and make organization easier.',
    wrongFact: 'Printing more than needed increases paper consumption quickly.'
  },
  {
    question: 'Which action helps restore biodiversity?',
    topic: 'Biodiversity',
    options: [
      { id: 'A', text: 'Plant native species' },
      { id: 'B', text: 'Remove all trees' },
      { id: 'C', text: 'Use pesticides everywhere' },
      { id: 'D', text: 'Reduce habitat spaces' }
    ],
    correctAnswer: 'A',
    funFact: 'Native species support local pollinators, birds, and soil health.',
    wrongFact: 'Replacing habitats with harmful chemicals usually reduces biodiversity.'
  },
  {
    question: 'Which item is best for a zero-waste lunch?',
    topic: 'Zero Waste',
    options: [
      { id: 'A', text: 'Disposable cutlery and wrappers' },
      { id: 'B', text: 'Reusable lunch box and utensils' },
      { id: 'C', text: 'Extra napkins in every meal' },
      { id: 'D', text: 'Single-use cups' }
    ],
    correctAnswer: 'B',
    funFact: 'Reusable containers reduce daily waste and save money over time.',
    wrongFact: 'Single-use food items create more trash and usually cost more in the long run.'
  },
  {
    question: 'Which practice helps reduce e-waste?',
    topic: 'E-Waste',
    options: [
      { id: 'A', text: 'Repair devices when possible' },
      { id: 'B', text: 'Throw electronics in the trash' },
      { id: 'C', text: 'Replace a phone every month' },
      { id: 'D', text: 'Remove batteries into the sink' }
    ],
    correctAnswer: 'A',
    funFact: 'Repairing and reusing electronics extends product life and lowers waste.',
    wrongFact: 'Discarding electronics in regular trash can release harmful materials.'
  },
  {
    question: 'Which habit most directly lowers cooling electricity use?',
    topic: 'Home Energy',
    options: [
      { id: 'A', text: 'Keep doors and windows open while AC is on' },
      { id: 'B', text: 'Set the thermostat a bit higher' },
      { id: 'C', text: 'Run AC with dirty filters' },
      { id: 'D', text: 'Leave curtains open in direct sun' }
    ],
    correctAnswer: 'B',
    funFact: 'A small thermostat adjustment can cut energy use noticeably.',
    wrongFact: 'Leaks and poor maintenance make cooling systems work harder.'
  },
  {
    question: 'What is a benefit of planting trees near buildings?',
    topic: 'Urban Greening',
    options: [
      { id: 'A', text: 'Adds shade and can reduce cooling demand' },
      { id: 'B', text: 'Increases indoor waste' },
      { id: 'C', text: 'Raises trash production' },
      { id: 'D', text: 'Blocks all rainfall' }
    ],
    correctAnswer: 'A',
    funFact: 'Trees can naturally cool surroundings through shade and evapotranspiration.',
    wrongFact: 'Trees are helpful climate allies, not waste producers.'
  },
  {
    question: 'Which purchase is usually more sustainable?',
    topic: 'Responsible Consumption',
    options: [
      { id: 'A', text: 'Buying durable goods that last longer' },
      { id: 'B', text: 'Buying the cheapest item that breaks quickly' },
      { id: 'C', text: 'Replacing things before they fail' },
      { id: 'D', text: 'Buying unnecessary duplicates' }
    ],
    correctAnswer: 'A',
    funFact: 'Durable products often reduce waste and replacement frequency.',
    wrongFact: 'Short-lived goods usually create more waste and higher long-term cost.'
  },
  {
    question: 'Which action helps protect oceans?',
    topic: 'Ocean Health',
    options: [
      { id: 'A', text: 'Reduce plastic litter' },
      { id: 'B', text: 'Dump waste into drains' },
      { id: 'C', text: 'Use more microbeads' },
      { id: 'D', text: 'Ignore recycling bins' }
    ],
    correctAnswer: 'A',
    funFact: 'Less plastic waste means less pollution reaching waterways and oceans.',
    wrongFact: 'Trash and microplastics can harm marine life for years.'
  },
  {
    question: 'What is a good first step to build a greener school?',
    topic: 'School Sustainability',
    options: [
      { id: 'A', text: 'Start an energy-saving awareness campaign' },
      { id: 'B', text: 'Use more disposable items' },
      { id: 'C', text: 'Leave lights on after school' },
      { id: 'D', text: 'Increase printed notices only' }
    ],
    correctAnswer: 'A',
    funFact: 'Awareness campaigns can quickly change habits across many students.',
    wrongFact: 'More disposable items and wasted electricity make sustainability harder.'
  },
  {
    question: 'Which choice best helps keep the air cleaner?',
    topic: 'Air Quality',
    options: [
      { id: 'A', text: 'Walk or cycle short distances' },
      { id: 'B', text: 'Idle the car outside' },
      { id: 'C', text: 'Burn trash' },
      { id: 'D', text: 'Use extra fuel for no reason' }
    ],
    correctAnswer: 'A',
    funFact: 'Active travel reduces emissions and improves fitness at the same time.',
    wrongFact: 'Idling and burning trash both worsen air quality.'
  },
  {
    question: 'Which habit supports a circular economy?',
    topic: 'Circular Economy',
    options: [
      { id: 'A', text: 'Repair, reuse, and recycle' },
      { id: 'B', text: 'Buy, use once, discard' },
      { id: 'C', text: 'Throw away usable items' },
      { id: 'D', text: 'Choose single-use items only' }
    ],
    correctAnswer: 'A',
    funFact: 'Keeping materials in use longer reduces waste and resource extraction.',
    wrongFact: 'The take-make-waste model creates more pollution and landfill use.'
  }
];

const getEmailHash = (email) => {
  let hash = 0;
  const text = String(email || '').toLowerCase().trim();
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const getTodayIndex = (email) => {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return (dayIndex + getEmailHash(email)) % FALLBACK_CHALLENGES.length;
};

const getFallbackChallenge = (email) => {
  const index = getTodayIndex(email);
  const challenge = FALLBACK_CHALLENGES[index];
  return {
    challengeId: `fallback-${index}`,
    ...challenge
  };
};

const getFallbackStateKey = (email) => `ecoFallbackChallengeState_${String(email || '').toLowerCase().trim()}`;
const getFallbackActivityKey = (email) => `ecoFallbackChallengeActivity_${String(email || '').toLowerCase().trim()}`;

const DailyChallenge = () => {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState(emptyChallenge);
  const [recentActivity, setRecentActivity] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countdown, setCountdown] = useState("00:00:00");
  const [answered, setAnswered] = useState(false);
  const [nextResetAt, setNextResetAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFrontendFallback, setIsFrontendFallback] = useState(false);

  const userEmail = localStorage.getItem('userEmail') || '';

  const loadFrontendFallbackChallenge = () => {
    const fallbackStateKey = getFallbackStateKey(userEmail);
    const fallbackActivityKey = getFallbackActivityKey(userEmail);
    const todayKey = new Date().toISOString().slice(0, 10);
    const fallbackChallenge = getFallbackChallenge(userEmail);
    const storedStateRaw = localStorage.getItem(fallbackStateKey);
    const storedActivityRaw = localStorage.getItem(fallbackActivityKey);

    let storedState = null;
    let storedActivity = [];

    try {
      storedState = storedStateRaw ? JSON.parse(storedStateRaw) : null;
    } catch (error) {
      storedState = null;
    }

    try {
      storedActivity = storedActivityRaw ? JSON.parse(storedActivityRaw) : [];
    } catch (error) {
      storedActivity = [];
    }

    if (storedState && storedState.dayKey === todayKey && storedState.challenge?.question) {
      setChallengeData(storedState.challenge);
      setAnswered(Boolean(storedState.answered));
      setSelectedAnswer(storedState.selectedAnswer || null);
      setIsCorrect(Boolean(storedState.isCorrect));
      setNextResetAt(storedState.nextResetAt || (Date.now() + 24 * 60 * 60 * 1000));
      setRecentActivity(Array.isArray(storedActivity) ? storedActivity : []);
      setIsFrontendFallback(true);
      return;
    }

    const nextResetAt = Date.now() + 24 * 60 * 60 * 1000;
    setChallengeData(fallbackChallenge);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setNextResetAt(nextResetAt);
    setRecentActivity(Array.isArray(storedActivity) ? storedActivity : []);
    setIsFrontendFallback(true);

    localStorage.setItem(
      fallbackStateKey,
      JSON.stringify({
        dayKey: todayKey,
        nextResetAt,
        challenge: fallbackChallenge,
        answered: false,
        selectedAnswer: null,
        isCorrect: false
      })
    );
  };

  const saveFrontendFallbackState = (state) => {
    localStorage.setItem(getFallbackStateKey(userEmail), JSON.stringify(state));
  };

  const saveFrontendFallbackActivity = (activityList) => {
    localStorage.setItem(getFallbackActivityKey(userEmail), JSON.stringify(activityList));
  };

  const updateFrontendFallbackPoints = (earned) => {
    const currentPoints = parseInt(localStorage.getItem('xp') || '1250', 10);
    const safeCurrentPoints = Number.isNaN(currentPoints) ? 1250 : currentPoints;
    const nextPoints = safeCurrentPoints + earned;
    localStorage.setItem('xp', String(nextPoints));
    return nextPoints;
  };

  const loadChallengeScreenData = async () => {
    if (!userEmail) {
      setErrorMessage('Please log in again to load your daily challenge.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');

      const challengeResponse = await getDailyChallenge(userEmail);
      setChallengeData(challengeResponse.challenge || emptyChallenge);
      setAnswered(Boolean(challengeResponse.answered));
      setSelectedAnswer(challengeResponse.selectedAnswer || null);
      setIsCorrect(Boolean(challengeResponse.isCorrect));
      setNextResetAt(
        challengeResponse.resetAt
          ? new Date(challengeResponse.resetAt).getTime()
          : Date.now() + 24 * 60 * 60 * 1000
      );
      setRecentActivity(Array.isArray(challengeResponse.activity) ? challengeResponse.activity : []);
      setIsFrontendFallback(false);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to load your daily challenge.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChallengeScreenData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!nextResetAt) {
      setCountdown('00:00:00');
      return;
    }

    const updateCountdown = () => {
      const diff = Math.max(nextResetAt - Date.now(), 0);
      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextResetAt]);

  const handleAnswer = (choice) => {
    if (answered || !userEmail || !challengeData.question) return;

    const submitAnswer = async () => {
      try {
        const response = await submitDailyChallengeAnswer(userEmail, choice);
        setSelectedAnswer(response.selectedAnswer || choice);
        setAnswered(Boolean(response.answered));
        setIsCorrect(Boolean(response.isCorrect));
        setChallengeData(response.challenge || challengeData);
        setNextResetAt(
          response.resetAt
            ? new Date(response.resetAt).getTime()
            : Date.now() + 24 * 60 * 60 * 1000
        );
        if (typeof response.totalPoints === 'number') {
          localStorage.setItem('xp', String(response.totalPoints));
        }

        const activityResponse = await getDailyChallengeActivity(userEmail);
        setRecentActivity(Array.isArray(activityResponse.activity) ? activityResponse.activity : []);
        setShowModal(true);

        if (response.isCorrect && window.confetti) {
          window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4EA24E', '#FBBF24', '#ffffff']
          });
        }
      } catch (error) {
        setErrorMessage('Failed to submit your answer. Please try again.');
      }
    };

    submitAnswer();
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "correct":
        return <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="text-[#4EA24E] w-5 h-5" /></div>;
      case "wrong":
        return <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><X className="text-red-500 w-5 h-5" /></div>;
      case "missed":
        return <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Minus className="text-slate-400 w-5 h-5" /></div>;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "correct":
        return <span className="text-xs font-bold text-[#4EA24E]">CORRECT</span>;
      case "wrong":
        return <span className="text-xs font-bold text-red-500">WRONG</span>;
      case "missed":
        return <span className="text-xs font-bold text-slate-400">MISSED</span>;
      default:
        return null;
    }
  };

  const getStatusOpacity = (status) => {
    return status === "missed" ? "opacity-60" : "";
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="flex-1 ml-20 h-screen overflow-hidden flex flex-col">
        {/* Header & Breadcrumb */}
        <header className="p-6 pb-0 flex-shrink-0">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <button onClick={() => navigate('/dashboard')} className="hover:text-[#4EA24E] transition-colors">Dashboard</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Daily Challenge</span>
          </nav>
          
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-orange-100">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                  <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-black shadow-sm">+50 ECO-POINTS</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-4">Today's Eco Challenge ⚡</h1>
                <div className="flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">Current Streak</p>
                    <p className="text-2xl font-black">12 🔥</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">Longest</p>
                    <p className="text-2xl font-black">24</p>
                  </div>
                  <div className="hidden sm:block bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">This Week</p>
                    <p className="text-2xl font-black">4/7</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl min-w-[200px]">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Reset In</p>
                <div className="text-3xl font-mono font-black tabular-nums text-slate-800">{countdown}</div>
              </div>
            </div>
            {/* Decorative Shape */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </section>
        </header>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* Question Card Section */}
          <section className="xl:col-span-2 space-y-6 min-h-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative h-full">
              {isLoading && (
                <p className="text-sm text-slate-500 mb-6">Loading today's challenge...</p>
              )}
              {!isLoading && errorMessage && (
                <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-xl">
                    <HelpCircle className="text-[#4EA24E] w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">Today's Question</h2>
                </div>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Topic: {challengeData.topic}</span>
              </div>
              
              <p className="text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
                {challengeData.question}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challengeData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={answered || isLoading || Boolean(errorMessage)}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                      answered && selectedAnswer === option.id
                        ? option.id === challengeData.correctAnswer
                          ? 'border-[#4EA24E] bg-emerald-50'
                          : 'border-red-400 bg-red-50'
                        : answered && option.id === challengeData.correctAnswer
                          ? 'border-[#4EA24E] bg-emerald-50'
                          : 'border-slate-100 bg-slate-50 hover:border-[#4EA24E] hover:bg-emerald-50'
                    } ${answered ? 'cursor-default' : 'hover:-translate-y-1'}`}
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-bold transition-colors ${
                      answered && (selectedAnswer === option.id || option.id === challengeData.correctAnswer)
                        ? option.id === challengeData.correctAnswer
                          ? 'bg-[#4EA24E] text-white border-[#4EA24E]'
                          : 'bg-red-500 text-white border-red-500'
                        : 'bg-white border-slate-200'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`font-medium ${
                      answered && selectedAnswer === option.id && option.id !== challengeData.correctAnswer
                        ? 'text-red-600 line-through'
                        : 'text-slate-700'
                    }`}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Challenges */}
          <section className="space-y-6 h-full min-h-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.length === 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-medium text-slate-500">No activity yet. Solve today's challenge to start your history.</p>
                  </div>
                )}
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors ${getStatusOpacity(activity.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="text-sm font-bold">{formatDateLabel(activity.date)} - {activity.topic}</p>
                        <p className="text-xs text-slate-500">
                          {activity.status === "missed" ? "Streak Lost" : `Earned ${activity.earned} pts`}
                        </p>
                      </div>
                    </div>
                    {getStatusText(activity.status)}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              isCorrect ? 'bg-emerald-100 text-[#4EA24E]' : 'bg-red-100 text-red-500'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-16 h-16" />
              ) : (
                <AlertCircle className="w-16 h-16" />
              )}
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2">
                {isCorrect ? "Exactly Right!" : "Not quite!"}
              </h2>
              <p className="text-slate-600 font-medium">
                {isCorrect 
                  ? "You've earned +50 Eco-Points for today." 
                  : `The correct answer was ${challengeData.options.find(o => o.id === challengeData.correctAnswer)?.text}.`
                }
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
              <div className="flex items-center gap-2 mb-2 text-[#4EA24E]">
                <Lightbulb className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Fun Eco Fact</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{isCorrect ? challengeData.funFact : challengeData.wrongFact}"
              </p>
            </div>
            <button 
              onClick={closeModal}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
