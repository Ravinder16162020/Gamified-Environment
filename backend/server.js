const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

if (process.env.ALLOW_SELF_SIGNED_TLS === 'true') {
  // Dev-only escape hatch for networks that MITM HTTPS with self-signed certs.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.warn('Warning: ALLOW_SELF_SIGNED_TLS is enabled. Do not use in production.');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const otpStore = new Map();

let transporter = null;
let googleOauth2Client = null;
let sendgridMail = null;
let mailMode = 'dev';

try {
  // Keep backend booting even when nodemailer is not installed/configured.
  const nodemailer = require('nodemailer');
  const sgMail = require('@sendgrid/mail');

  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sendgridMail = sgMail;
    mailMode = 'sendgrid';
    console.log('OTP mail mode: SendGrid');
  } else 

  if (
    process.env.SMTP_EMAIL &&
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN
  ) {
    const { google } = require('googleapis');
    googleOauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    googleOauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN
    });

    mailMode = 'google-oauth2';
    console.log('OTP mail mode: Google OAuth2 (Google Cloud)');
  } else if (process.env.SMTP_EMAIL && process.env.SMTP_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD
      }
    });
    mailMode = 'gmail-app-password';
    console.log('OTP mail mode: Gmail app password');
  } else {
    console.log('OTP mail mode: dev (no SMTP/OAuth2 config)');
  }
} catch (error) {
  console.warn('Nodemailer not available. OTP email will run in dev mode only.');
}

const sendOtpMail = async ({ to, otp }) => {
  const nodemailer = require('nodemailer');

  if (mailMode === 'sendgrid' && sendgridMail) {
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.SMTP_EMAIL;

    if (!fromEmail) {
      throw new Error('SENDGRID_FROM_EMAIL or SMTP_EMAIL is required for SendGrid');
    }

    await sendgridMail.send({
      to,
      from: fromEmail,
      subject: 'Your Gamified Environment OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });
    return;
  }

  if (mailMode === 'google-oauth2') {
    const accessTokenResponse = await googleOauth2Client.getAccessToken();
    const accessToken =
      typeof accessTokenResponse === 'string'
        ? accessTokenResponse
        : accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error('Failed to obtain Google OAuth2 access token');
    }

    const oauthTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_EMAIL,
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        accessToken
      },
      tls: {
        rejectUnauthorized: process.env.ALLOW_SELF_SIGNED_TLS !== 'true'
      }
    });

    await oauthTransporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject: 'Your Gamified Environment OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });
    return;
  }

  if (mailMode === 'gmail-app-password' && transporter) {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject: 'Your Gamified Environment OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });
    return;
  }

  throw new Error('Mail service is not configured');
};

const DAILY_CHALLENGE_ROTATION_HOURS = 24;
const DAILY_CHALLENGE_REWARD_POINTS = 50;
const DAILY_CHALLENGE_API_URL =
  process.env.DAILY_CHALLENGE_API_URL || process.env.REACT_APP_DAILY_CHALLENGE_API_URL || '';
const DAILY_CHALLENGE_API_TOKEN = process.env.DAILY_CHALLENGE_API_TOKEN || '';
const DAILY_CHALLENGE_BANK = [
  {
    question: 'Which action reduces household carbon emissions the most over a year?',
    topic: 'Energy Efficiency',
    options: [
      { id: 'A', text: 'Switching one bulb to LED' },
      { id: 'B', text: 'Using public transport regularly instead of a private car' },
      { id: 'C', text: 'Unplugging chargers at night' },
      { id: 'D', text: 'Printing on both sides of paper' }
    ],
    correctAnswer: 'B',
    funFact: 'Transportation choices can have a larger yearly impact than many small household changes.',
    wrongFact: 'Small steps help, but transport and electricity sources usually dominate personal emissions.'
  },
  {
    question: 'Which gas is most associated with agriculture-related warming emissions?',
    topic: 'Greenhouse Gases',
    options: [
      { id: 'A', text: 'Methane (CH4)' },
      { id: 'B', text: 'Ozone (O3)' },
      { id: 'C', text: 'Helium (He)' },
      { id: 'D', text: 'Neon (Ne)' }
    ],
    correctAnswer: 'A',
    funFact: 'Livestock and rice cultivation are major methane sources.',
    wrongFact: 'Methane, not inert gases like helium or neon, is a key warming gas in agriculture.'
  },
  {
    question: 'What is generally the most climate-friendly way to hydrate daily?',
    topic: 'Waste Reduction',
    options: [
      { id: 'A', text: 'Single-use bottled water every day' },
      { id: 'B', text: 'Reusable bottle with local tap or filtered water' },
      { id: 'C', text: 'Imported sparkling water' },
      { id: 'D', text: 'Disposable juice cartons' }
    ],
    correctAnswer: 'B',
    funFact: 'Reusing a bottle helps cut packaging waste and transport-related emissions.',
    wrongFact: 'Frequent single-use packaging usually has a larger footprint than reusable options.'
  },
  {
    question: 'Which habit usually saves the most home energy during summer?',
    topic: 'Cooling',
    options: [
      { id: 'A', text: 'Setting the thermostat a little higher' },
      { id: 'B', text: 'Leaving windows open with AC on' },
      { id: 'C', text: 'Using a second fan and AC together at full power' },
      { id: 'D', text: 'Blocking air vents' }
    ],
    correctAnswer: 'A',
    funFact: 'A small thermostat change can cut cooling demand noticeably over time.',
    wrongFact: 'Open windows, blocked vents, and extra cooling all increase wasted energy.'
  },
  {
    question: 'Which item is easiest to recycle when it is clean and dry?',
    topic: 'Recycling',
    options: [
      { id: 'A', text: 'Greasy pizza box' },
      { id: 'B', text: 'Paper sheet or cardboard' },
      { id: 'C', text: 'Used tissue' },
      { id: 'D', text: 'Food wrapper with sauce' }
    ],
    correctAnswer: 'B',
    funFact: 'Clean paper fiber is one of the easiest materials for recycling systems to process.',
    wrongFact: 'Food contamination can cause whole batches of recycling to be rejected.'
  },
  {
    question: 'Which transport choice usually has the lowest emissions per person?',
    topic: 'Transport',
    options: [
      { id: 'A', text: 'Solo car trip' },
      { id: 'B', text: 'Public transit or carpooling' },
      { id: 'C', text: 'Short flight' },
      { id: 'D', text: 'Idling in traffic' }
    ],
    correctAnswer: 'B',
    funFact: 'Sharing one vehicle spreads the emissions across more people.',
    wrongFact: 'Flying, idling, and solo drives generally create more emissions per rider.'
  },
  {
    question: 'What is a strong way to reduce food waste at home?',
    topic: 'Food Waste',
    options: [
      { id: 'A', text: 'Plan meals and store leftovers properly' },
      { id: 'B', text: 'Buy food without checking what you already have' },
      { id: 'C', text: 'Throw out food early to make room' },
      { id: 'D', text: 'Serve oversized portions every time' }
    ],
    correctAnswer: 'A',
    funFact: 'Meal planning is one of the fastest ways to cut waste and save money.',
    wrongFact: 'Oversized portions and poor storage are common causes of avoidable waste.'
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
    funFact: 'Solar energy is replenished every day by the sun.',
    wrongFact: 'Coal, diesel, and petrol are fossil fuels, not renewable sources.'
  },
  {
    question: 'Which action supports biodiversity the best?',
    topic: 'Biodiversity',
    options: [
      { id: 'A', text: 'Plant native species' },
      { id: 'B', text: 'Remove all green spaces' },
      { id: 'C', text: 'Use pesticides everywhere' },
      { id: 'D', text: 'Replace habitats with concrete' }
    ],
    correctAnswer: 'A',
    funFact: 'Native species help local pollinators, birds, and soil life thrive.',
    wrongFact: 'Replacing habitats usually reduces the number of species that can survive.'
  },
  {
    question: 'Which habit reduces single-use plastic the most?',
    topic: 'Plastic Waste',
    options: [
      { id: 'A', text: 'Carry a reusable bottle and lunch box' },
      { id: 'B', text: 'Buy an extra plastic bag each time' },
      { id: 'C', text: 'Choose bottled drinks every day' },
      { id: 'D', text: 'Use disposable cutlery for all meals' }
    ],
    correctAnswer: 'A',
    funFact: 'Reusable items cut waste at the source instead of dealing with it later.',
    wrongFact: 'Repeated disposable purchases add up quickly in cost and trash.'
  },
  {
    question: 'Which action helps save water most at home?',
    topic: 'Water Conservation',
    options: [
      { id: 'A', text: 'Take shorter showers' },
      { id: 'B', text: 'Leave taps running while brushing teeth' },
      { id: 'C', text: 'Water the driveway' },
      { id: 'D', text: 'Wash half-full loads every day' }
    ],
    correctAnswer: 'A',
    funFact: 'Shorter showers can save a surprising amount of water over a week.',
    wrongFact: 'Running taps and unnecessary washing usually waste water instead of saving it.'
  },
  {
    question: 'What is the best first step to reduce e-waste?',
    topic: 'E-Waste',
    options: [
      { id: 'A', text: 'Repair devices when possible' },
      { id: 'B', text: 'Throw electronics in the trash' },
      { id: 'C', text: 'Replace devices as soon as they slow down' },
      { id: 'D', text: 'Keep dead batteries in a drawer forever' }
    ],
    correctAnswer: 'A',
    funFact: 'Repairing and reusing electronics extends product life and keeps materials in use longer.',
    wrongFact: 'Discarding electronics in the trash can create pollution and waste valuable materials.'
  },
  {
    question: 'Which action helps keep the air cleaner?',
    topic: 'Air Quality',
    options: [
      { id: 'A', text: 'Walk or cycle short distances' },
      { id: 'B', text: 'Idle the car outside school' },
      { id: 'C', text: 'Burn trash' },
      { id: 'D', text: 'Use extra fuel for no reason' }
    ],
    correctAnswer: 'A',
    funFact: 'Active travel reduces emissions and improves fitness at the same time.',
    wrongFact: 'Idling and burning trash both make local air quality worse.'
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
  },
  {
    question: 'What is a good choice for a greener school morning?',
    topic: 'School Sustainability',
    options: [
      { id: 'A', text: 'Switch off unused lights and projectors' },
      { id: 'B', text: 'Leave every device plugged in all day' },
      { id: 'C', text: 'Print extra worksheets automatically' },
      { id: 'D', text: 'Keep windows open with AC running' }
    ],
    correctAnswer: 'A',
    funFact: 'Simple routines can save energy across an entire classroom.',
    wrongFact: 'Leaving equipment on when not needed wastes electricity.'
  },
  {
    question: 'Which choice best lowers packaging waste during lunch?',
    topic: 'Waste Reduction',
    options: [
      { id: 'A', text: 'Bring snacks in reusable containers' },
      { id: 'B', text: 'Use multiple single-use wrappers' },
      { id: 'C', text: 'Buy individually wrapped items only' },
      { id: 'D', text: 'Throw away reusable lunch gear' }
    ],
    correctAnswer: 'A',
    funFact: 'Reusable containers cut waste and usually keep food fresher.',
    wrongFact: 'Single-use wrapping creates avoidable trash every day.'
  },
  {
    question: 'Which option is more sustainable for studying?',
    topic: 'Paper Conservation',
    options: [
      { id: 'A', text: 'Digital notes when possible' },
      { id: 'B', text: 'Print every draft' },
      { id: 'C', text: 'Use fresh paper for every small task' },
      { id: 'D', text: 'Throw away notes after one use' }
    ],
    correctAnswer: 'A',
    funFact: 'Digital notes can reduce paper use and make organizing easier.',
    wrongFact: 'Printing more than needed increases paper demand quickly.'
  },
  {
    question: 'Which action helps protect oceans the most?',
    topic: 'Ocean Health',
    options: [
      { id: 'A', text: 'Reduce plastic litter' },
      { id: 'B', text: 'Dump waste into drains' },
      { id: 'C', text: 'Use more microbeads' },
      { id: 'D', text: 'Ignore recycling bins' }
    ],
    correctAnswer: 'A',
    funFact: 'Less plastic waste means less pollution reaching rivers and oceans.',
    wrongFact: 'Trash and microplastics can harm marine life for years.'
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
    question: 'What helps reduce indoor air pollution?',
    topic: 'Indoor Environment',
    options: [
      { id: 'A', text: 'Ventilate rooms when safe and needed' },
      { id: 'B', text: 'Burn trash inside' },
      { id: 'C', text: 'Use strong chemicals without airflow' },
      { id: 'D', text: 'Seal every room all day' }
    ],
    correctAnswer: 'A',
    funFact: 'Fresh air can help dilute pollutants inside classrooms and homes.',
    wrongFact: 'Smoke and strong fumes build up quickly without proper ventilation.'
  },
  {
    question: 'Which habit best supports long-term sustainability?',
    topic: 'General Sustainability',
    options: [
      { id: 'A', text: 'Use what you already have before buying new' },
      { id: 'B', text: 'Replace items immediately' },
      { id: 'C', text: 'Choose more disposable products' },
      { id: 'D', text: 'Ignore repair options' }
    ],
    correctAnswer: 'A',
    funFact: 'Extending the life of existing items reduces emissions and waste.',
    wrongFact: 'Buying new things too quickly increases resource use and landfill waste.'
  }
];

const getNormalizedEmail = (req) => {
  const rawEmail =
    req.query?.email || req.body?.email || req.headers['x-user-email'] || req.headers['x-user'];
  return String(rawEmail || '').toLowerCase().trim();
};

const buildProfileResponse = (user) => ({
  email: user.email,
  name: user.profile?.fullName || user.username || '',
  initials: (user.profile?.fullName || user.username || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2),
  school: user.profile?.school || 'Greenview High School',
  className: user.profile?.className || '11-B',
  bio: user.profile?.bio || '',
  interests: Array.isArray(user.profile?.interests) ? user.profile.interests : [],
  avatarUrl: user.profile?.avatarUrl || '',
  stats: {
    ecoPoints: user.xp,
    level: `Level ${user.level}`,
    badges: buildEcoBadgeCollection(user).user.earnedCount,
    schoolRank: '#42'
  },
  appearanceMode: user.profile?.appearanceMode || 'light',
  volume: typeof user.profile?.volume === 'number' ? user.profile.volume : 70,
  notifications: {
    dailyChallenge: user.profile?.notifications?.dailyChallenge ?? true,
    newModule: user.profile?.notifications?.newModule ?? true
  },
  dailyGoal: typeof user.profile?.dailyGoal === 'number' ? user.profile.dailyGoal : 50,
  reminderTime: user.profile?.reminderTime || '16:00'
});

app.get('/api/ecosprint/badges', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(buildEcoBadgeCollection(user));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load badge collection' });
  }
});

const LEADERBOARD_SCOPES = new Set(['class', 'school', 'all']);
const LEADERBOARD_PERIODS = new Set(['week', 'month', 'all']);

const toDateKey = (dateValue) => new Date(dateValue).toISOString().slice(0, 10);

const getLeaderboardPeriodWindow = (period = 'week') => {
  const normalizedPeriod = LEADERBOARD_PERIODS.has(period) ? period : 'week';
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  if (normalizedPeriod === 'all') {
    return { normalizedPeriod, start: null, end };
  }

  const start = new Date(end);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (normalizedPeriod === 'month' ? 30 : 7));
  return { normalizedPeriod, start, end };
};

const getPreviousLeaderboardWindow = (currentStart, currentEnd) => {
  if (!currentStart || !currentEnd) {
    return { start: null, end: null };
  }

  const durationMs = currentEnd.getTime() - currentStart.getTime();
  const end = new Date(currentStart.getTime() - 1);
  const start = new Date(end.getTime() - durationMs);
  return { start, end };
};

const sumPointsInRange = (history = [], start, end) => {
  const startTime = start ? start.getTime() : null;
  const endTime = end ? end.getTime() : null;

  return history.reduce((total, entry) => {
    const entryTime = new Date(entry.date).getTime();
    if (Number.isNaN(entryTime)) {
      return total;
    }
    if (startTime !== null && entryTime < startTime) {
      return total;
    }
    if (endTime !== null && entryTime > endTime) {
      return total;
    }
    return total + Number(entry.earned || 0);
  }, 0);
};

const countActivityStreak = (history = []) => {
  const activeDays = new Set(
    history
      .filter(Boolean)
      .map((entry) => toDateKey(entry.date))
  );

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (activeDays.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const buildBadgeTypes = (user, points, streak) => {
  const interests = Array.isArray(user.profile?.interests)
    ? user.profile.interests.map((item) => String(item).toLowerCase())
    : [];

  const badges = [];

  if (streak >= 7) badges.push('streak');
  if (interests.some((item) => item.includes('solar') || item.includes('energy'))) badges.push('energy');
  if (interests.some((item) => item.includes('water'))) badges.push('water');
  if (interests.some((item) => item.includes('recycling') || item.includes('waste'))) badges.push('leaf');
  if (points >= 1000) badges.push('award');

  return [...new Set(badges)].slice(0, 3);
};

function buildEcoBadgeCollection(user) {
  const history = Array.isArray(user.dailyChallengeHistory) ? user.dailyChallengeHistory : [];
  const interests = Array.isArray(user.profile?.interests)
    ? user.profile.interests.map((item) => String(item).toLowerCase())
    : [];
  const topicNames = [...new Set(history.map((entry) => String(entry.topic || '').toLowerCase()))];
  const correctCount = history.filter((entry) => entry.status === 'correct').length;
  const wrongCount = history.filter((entry) => entry.status === 'wrong').length;
  const completedChallenges = history.filter((entry) => entry.status === 'correct' || entry.status === 'wrong').length;
  const activeDays = new Set(history.map((entry) => new Date(entry.date).toISOString().slice(0, 10))).size;
  const streak = countActivityStreak(history);
  const totalPoints = Number(user.xp || 0);
  const level = Number(user.level || 1);
  const profileReady = Boolean(user.profile?.onboardingCompleted || user.profile?.fullName || user.profile?.school || user.profile?.className);

  const context = {
    user,
    history,
    interests,
    topicNames,
    correctCount,
    wrongCount,
    completedChallenges,
    activeDays,
    streak,
    totalPoints,
    level,
    profileReady
  };

  const getBadgeDate = (predicate, fallbackDate) => {
    const matched = history
      .filter((entry) => predicate(entry))
      .sort((left, right) => new Date(right.date) - new Date(left.date))[0];
    return matched?.date || fallbackDate || user.createdAt || new Date();
  };

  const hasInterest = (...needles) => interests.some((item) => needles.some((needle) => item.includes(needle)));
  const hasTopic = (...needles) => topicNames.some((item) => needles.some((needle) => item.includes(needle)));

  const badgeDefinitions = [
    {
      key: 'first-steps',
      name: 'First Steps',
      category: 'Learning',
      iconKey: 'play',
      color: 'bg-blue-50 text-blue-600',
      description: 'Complete your EcoSprint setup and build your profile.',
      unlockText: 'Finish onboarding to unlock this badge.',
      isEarned: () => profileReady,
      progressPercent: () => (profileReady ? 100 : 0),
      progressLabel: () => (profileReady ? 'Completed' : 'Finish onboarding'),
      earnedAt: () => getBadgeDate(() => profileReady, user.createdAt)
    },
    {
      key: 'quick-learner',
      name: 'Quick Learner',
      category: 'Learning',
      iconKey: 'zap',
      color: 'bg-blue-50 text-blue-600',
      description: 'Earn EcoPoints consistently by learning fast and staying active.',
      unlockText: 'Reach 200 EcoPoints.',
      isEarned: () => totalPoints >= 200,
      progressPercent: () => Math.min(100, Math.round((totalPoints / 200) * 100)),
      progressLabel: () => `${Math.min(totalPoints, 200)}/200 points`,
      earnedAt: () => getBadgeDate(() => totalPoints >= 200, user.createdAt)
    },
    {
      key: 'module-master',
      name: 'Module Master',
      category: 'Learning',
      iconKey: 'bookOpenCheck',
      color: 'bg-blue-50 text-blue-600',
      description: 'Complete enough learning momentum to master the core EcoSprint modules.',
      unlockText: 'Reach Level 4.',
      isEarned: () => level >= 4,
      progressPercent: () => Math.min(100, Math.round((level / 4) * 100)),
      progressLabel: () => `Level ${Math.min(level, 4)}/4`,
      earnedAt: () => getBadgeDate(() => level >= 4, user.createdAt)
    },
    {
      key: 'solar-scout',
      name: 'Solar Scout',
      category: 'Learning',
      iconKey: 'batteryCharging',
      color: 'bg-blue-50 text-blue-600',
      description: 'Show interest in clean energy and solar-powered ideas.',
      unlockText: 'Add solar or energy interests to your profile.',
      isEarned: () => hasInterest('solar', 'energy'),
      progressPercent: () => (hasInterest('solar', 'energy') ? 100 : 0),
      progressLabel: () => (hasInterest('solar', 'energy') ? 'Completed' : 'Add solar interest'),
      earnedAt: () => getBadgeDate(() => hasInterest('solar', 'energy'), user.createdAt)
    },
    {
      key: 'quiz-starter',
      name: 'Quiz Starter',
      category: 'Quiz',
      iconKey: 'helpCircle',
      color: 'bg-purple-50 text-purple-600',
      description: 'Answer your first EcoSprint quiz question.',
      unlockText: 'Complete one daily challenge.',
      isEarned: () => completedChallenges >= 1,
      progressPercent: () => Math.min(100, completedChallenges >= 1 ? 100 : 0),
      progressLabel: () => (completedChallenges >= 1 ? 'Completed' : '1 challenge needed'),
      earnedAt: () => getBadgeDate(() => completedChallenges >= 1, user.createdAt)
    },
    {
      key: 'perfectionist',
      name: 'Perfectionist',
      category: 'Quiz',
      iconKey: 'check',
      color: 'bg-purple-50 text-purple-600',
      description: 'Build a flawless quiz streak with strong accuracy.',
      unlockText: 'Win 5 challenges without a wrong answer.',
      isEarned: () => correctCount >= 5 && wrongCount === 0,
      progressPercent: () => Math.min(100, Math.round((correctCount / 5) * 100)),
      progressLabel: () => `${Math.min(correctCount, 5)}/5 correct`,
      earnedAt: () => getBadgeDate((entry) => entry.status === 'correct', user.createdAt)
    },
    {
      key: 'climate-aware',
      name: 'Climate Aware',
      category: 'Quiz',
      iconKey: 'thermometerSun',
      color: 'bg-purple-50 text-purple-600',
      description: 'Show climate knowledge through repeated challenge success.',
      unlockText: 'Complete 3 challenges and keep learning climate topics.',
      isEarned: () => completedChallenges >= 3,
      progressPercent: () => Math.min(100, Math.round((completedChallenges / 3) * 100)),
      progressLabel: () => `${Math.min(completedChallenges, 3)}/3 challenges`,
      earnedAt: () => getBadgeDate((entry) => entry.status === 'correct' || entry.status === 'wrong', user.createdAt)
    },
    {
      key: 'green-streak-3',
      name: 'Green Streak 3',
      category: 'Streak',
      iconKey: 'flame',
      color: 'bg-orange-50 text-orange-600',
      description: 'Keep showing up for three straight active days.',
      unlockText: 'Reach a 3-day streak.',
      isEarned: () => streak >= 3,
      progressPercent: () => Math.min(100, Math.round((streak / 3) * 100)),
      progressLabel: () => `${Math.min(streak, 3)}/3 day streak`,
      earnedAt: () => getBadgeDate(() => streak >= 3, user.createdAt)
    },
    {
      key: 'green-streak-7',
      name: 'Green Streak 7',
      category: 'Streak',
      iconKey: 'zapOff',
      color: 'bg-orange-50 text-orange-600',
      description: 'Push your consistency across one full week.',
      unlockText: 'Reach a 7-day streak.',
      isEarned: () => streak >= 7,
      progressPercent: () => Math.min(100, Math.round((streak / 7) * 100)),
      progressLabel: () => `${Math.min(streak, 7)}/7 day streak`,
      earnedAt: () => getBadgeDate(() => streak >= 7, user.createdAt)
    },
    {
      key: 'green-streak-30',
      name: 'Green Streak 30',
      category: 'Streak',
      iconKey: 'trendingUp',
      color: 'bg-orange-50 text-orange-600',
      description: 'Keep your EcoSprint routine alive for a full month.',
      unlockText: 'Reach a 30-day streak.',
      isEarned: () => streak >= 30,
      progressPercent: () => Math.min(100, Math.round((streak / 30) * 100)),
      progressLabel: () => `${Math.min(streak, 30)}/30 day streak`,
      earnedAt: () => getBadgeDate(() => streak >= 30, user.createdAt)
    },
    {
      key: 'water-warrior',
      name: 'Water Warrior',
      category: 'Topic',
      iconKey: 'droplets',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Show strong focus on water conservation and water-saving habits.',
      unlockText: 'Earn water-related interest or challenge activity.',
      isEarned: () => hasInterest('water') || hasTopic('water'),
      progressPercent: () => (hasInterest('water') || hasTopic('water') ? 100 : 0),
      progressLabel: () => (hasInterest('water') || hasTopic('water') ? 'Completed' : 'Explore water topics'),
      earnedAt: () => getBadgeDate((entry) => String(entry.topic || '').toLowerCase().includes('water'), user.createdAt)
    },
    {
      key: 'energy-saver',
      name: 'Energy Saver',
      category: 'Topic',
      iconKey: 'batteryCharging',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Keep clean energy and efficiency at the center of your progress.',
      unlockText: 'Reach 500 EcoPoints or add energy interests.',
      isEarned: () => totalPoints >= 500 || hasInterest('energy', 'solar'),
      progressPercent: () => Math.min(100, Math.round((Math.max(totalPoints, hasInterest('energy', 'solar') ? 500 : 0) / 500) * 100)),
      progressLabel: () => (totalPoints >= 500 || hasInterest('energy', 'solar') ? 'Completed' : `${Math.min(totalPoints, 500)}/500 points`),
      earnedAt: () => getBadgeDate(() => totalPoints >= 500 || hasInterest('energy', 'solar'), user.createdAt)
    },
    {
      key: 'water-wise',
      name: 'Water Wise',
      category: 'Topic',
      iconKey: 'waves',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Demonstrate water knowledge through correct challenge answers.',
      unlockText: 'Answer a water-related challenge correctly.',
      isEarned: () => history.some((entry) => String(entry.topic || '').toLowerCase().includes('water') && entry.status === 'correct'),
      progressPercent: () => (history.some((entry) => String(entry.topic || '').toLowerCase().includes('water') && entry.status === 'correct') ? 100 : 0),
      progressLabel: () => (history.some((entry) => String(entry.topic || '').toLowerCase().includes('water') && entry.status === 'correct') ? 'Completed' : 'Answer a water challenge'),
      earnedAt: () => getBadgeDate((entry) => String(entry.topic || '').toLowerCase().includes('water') && entry.status === 'correct', user.createdAt)
    },
    {
      key: 'recycling-ranger',
      name: 'Recycling Ranger',
      category: 'Topic',
      iconKey: 'leaf',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Show focus on recycling, waste sorting, and circular habits.',
      unlockText: 'Add recycling or waste interests.',
      isEarned: () => hasInterest('recycling', 'waste') || hasTopic('recycling', 'waste'),
      progressPercent: () => (hasInterest('recycling', 'waste') || hasTopic('recycling', 'waste') ? 100 : 0),
      progressLabel: () => (hasInterest('recycling', 'waste') || hasTopic('recycling', 'waste') ? 'Completed' : 'Explore waste topics'),
      earnedAt: () => getBadgeDate(() => hasInterest('recycling', 'waste') || hasTopic('recycling', 'waste'), user.createdAt)
    },
    {
      key: 'nature-protector',
      name: 'Nature Protector',
      category: 'Topic',
      iconKey: 'shieldCheck',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Protect ecosystems through biodiversity and habitat awareness.',
      unlockText: 'Add biodiversity, trees, or nature interests.',
      isEarned: () => hasInterest('biodiversity', 'nature', 'tree'),
      progressPercent: () => (hasInterest('biodiversity', 'nature', 'tree') ? 100 : 0),
      progressLabel: () => (hasInterest('biodiversity', 'nature', 'tree') ? 'Completed' : 'Add nature interests'),
      earnedAt: () => getBadgeDate(() => hasInterest('biodiversity', 'nature', 'tree'), user.createdAt)
    },
    {
      key: 'ocean-guardian',
      name: 'Ocean Guardian',
      category: 'Topic',
      iconKey: 'waves',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Keep oceans healthy by cutting plastic and marine pollution.',
      unlockText: 'Explore ocean, marine, or plastic topics.',
      isEarned: () => hasInterest('ocean', 'marine', 'plastic') || hasTopic('ocean', 'marine'),
      progressPercent: () => (hasInterest('ocean', 'marine', 'plastic') || hasTopic('ocean', 'marine') ? 100 : 0),
      progressLabel: () => (hasInterest('ocean', 'marine', 'plastic') || hasTopic('ocean', 'marine') ? 'Completed' : 'Explore ocean topics'),
      earnedAt: () => getBadgeDate(() => hasInterest('ocean', 'marine', 'plastic') || hasTopic('ocean', 'marine'), user.createdAt)
    },
    {
      key: 'sustainable-shopper',
      name: 'Sustainable Shopper',
      category: 'Topic',
      iconKey: 'gem',
      color: 'bg-emerald-50 text-emerald-600',
      description: 'Choose durable goods and reduce unnecessary consumption.',
      unlockText: 'Add responsible consumption interests.',
      isEarned: () => hasInterest('consumption', 'durable', 'shopping', 'reuse'),
      progressPercent: () => (hasInterest('consumption', 'durable', 'shopping', 'reuse') ? 100 : 0),
      progressLabel: () => (hasInterest('consumption', 'durable', 'shopping', 'reuse') ? 'Completed' : 'Add consumption interests'),
      earnedAt: () => getBadgeDate(() => hasInterest('consumption', 'durable', 'shopping', 'reuse'), user.createdAt)
    },
    {
      key: 'daily-warrior',
      name: 'Daily Warrior',
      category: 'Daily',
      iconKey: 'calendar',
      color: 'bg-amber-50 text-amber-600',
      description: 'Stay active across many separate challenge days.',
      unlockText: 'Complete daily challenges on 7 separate days.',
      isEarned: () => activeDays >= 7,
      progressPercent: () => Math.min(100, Math.round((activeDays / 7) * 100)),
      progressLabel: () => `${Math.min(activeDays, 7)}/7 active days`,
      earnedAt: () => getBadgeDate(() => activeDays >= 7, user.createdAt)
    },
    {
      key: 'waste-reducer',
      name: 'Waste Reducer',
      category: 'Daily',
      iconKey: 'check',
      color: 'bg-amber-50 text-amber-600',
      description: 'Keep your quiz misses low and your challenge accuracy high.',
      unlockText: 'Complete 3 challenges with at most 2 wrong answers.',
      isEarned: () => completedChallenges >= 3 && wrongCount <= 2,
      progressPercent: () => Math.min(100, Math.round((completedChallenges / 3) * 100)),
      progressLabel: () => `${Math.min(completedChallenges, 3)}/3 challenges`,
      earnedAt: () => getBadgeDate((entry) => entry.status === 'correct' || entry.status === 'wrong', user.createdAt)
    },
    {
      key: 'carbon-cutter',
      name: 'Carbon Cutter',
      category: 'Level',
      iconKey: 'trendingUp',
      color: 'bg-slate-100 text-slate-500',
      description: 'Reach a higher level while reducing your environmental footprint.',
      unlockText: 'Reach Level 8 or 1000 EcoPoints.',
      isEarned: () => level >= 8 || totalPoints >= 1000,
      progressPercent: () => Math.min(100, Math.round((Math.max(level / 8, totalPoints / 1000)) * 100)),
      progressLabel: () => (level >= 8 || totalPoints >= 1000 ? 'Completed' : `${Math.min(level, 8)}/8 level`),
      earnedAt: () => getBadgeDate(() => level >= 8 || totalPoints >= 1000, user.createdAt)
    },
    {
      key: 'eco-champion',
      name: 'Eco Champion',
      category: 'Level',
      iconKey: 'gem',
      color: 'bg-slate-100 text-slate-500',
      description: 'Show high-level EcoSprint mastery over time.',
      unlockText: 'Reach Level 5.',
      isEarned: () => level >= 5,
      progressPercent: () => Math.min(100, Math.round((level / 5) * 100)),
      progressLabel: () => `${Math.min(level, 5)}/5 level`,
      earnedAt: () => getBadgeDate(() => level >= 5, user.createdAt)
    },
    {
      key: 'environmental-hero',
      name: 'Environmental Hero',
      category: 'Level',
      iconKey: 'shieldCheck',
      color: 'bg-slate-100 text-slate-500',
      description: 'Reach advanced EcoSprint mastery and set the standard for others.',
      unlockText: 'Reach Level 10.',
      isEarned: () => level >= 10,
      progressPercent: () => Math.min(100, Math.round((level / 10) * 100)),
      progressLabel: () => `${Math.min(level, 10)}/10 level`,
      earnedAt: () => getBadgeDate(() => level >= 10, user.createdAt)
    }
  ];

  const badges = badgeDefinitions.map((definition) => {
    const earned = Boolean(definition.isEarned(context));
    const progressPercent = Math.max(0, Math.min(100, Number(definition.progressPercent(context, earned)) || 0));
    const progressLabel = String(definition.progressLabel(context, earned) || '');
    const earnedAt = definition.earnedAt(context, earned);

    return {
      id: definition.key,
      name: definition.name,
      category: definition.category,
      iconKey: definition.iconKey,
      color: definition.color,
      description: definition.description,
      unlockText: definition.unlockText,
      earned,
      progressPercent,
      progressLabel,
      earnedAt,
      earnedAtLabel: earned ? formatRelativeTime(earnedAt) : '',
      lockedLabel: earned ? 'Earned' : definition.unlockText
    };
  });

  const earnedBadges = badges.filter((badge) => badge.earned);
  const recentBadges = [...earnedBadges]
    .sort((left, right) => new Date(right.earnedAt || 0) - new Date(left.earnedAt || 0))
    .slice(0, 3)
    .map((badge) => ({
      id: badge.id,
      title: badge.name,
      iconKey: badge.iconKey,
      color: badge.color
    }));

  const categorySummary = [
    'Learning',
    'Quiz',
    'Streak',
    'Topic',
    'Level',
    'Daily'
  ].map((category) => {
    const categoryBadges = badges.filter((badge) => badge.category === category);
    return {
      id: category,
      name: category,
      earned: categoryBadges.filter((badge) => badge.earned).length,
      total: categoryBadges.length
    };
  });

  return {
    user: {
      name: user.profile?.fullName || user.username || '',
      avatarUrl: user.profile?.avatarUrl || '',
      school: user.profile?.school || 'Greenview High School',
      className: user.profile?.className || '11-B',
      earnedCount: earnedBadges.length,
      totalCount: badges.length,
      completionPercentage: badges.length ? Math.round((earnedBadges.length / badges.length) * 100) : 0,
      points: totalPoints,
      levelLabel: `Level ${level}`,
      streakLabel: `${streak} Day Streak`
    },
    badges,
    categorySummary,
    recentBadges
  };
}

const normalizeLeaderboardUser = (user, periodWindow, previousWindow, recentWindow, currentUser) => {
  const allTimePoints = Number(user.xp || 0);
  const currentPeriodPoints = periodWindow.normalizedPeriod === 'all'
    ? allTimePoints
    : sumPointsInRange(user.dailyChallengeHistory || [], periodWindow.start, periodWindow.end);
  const previousPeriodPoints = periodWindow.normalizedPeriod === 'all'
    ? Math.max(0, allTimePoints - sumPointsInRange(user.dailyChallengeHistory || [], recentWindow.start, recentWindow.end))
    : sumPointsInRange(user.dailyChallengeHistory || [], previousWindow.start, previousWindow.end);

  const streak = countActivityStreak(user.dailyChallengeHistory || []);
  const initials = (user.profile?.fullName || user.username || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    email: user.email,
    name: user.profile?.fullName || user.username || '',
    initials,
    school: user.profile?.school || 'Greenview High School',
    className: user.profile?.className || '11-B',
    avatarUrl: user.profile?.avatarUrl || '',
    points: currentPeriodPoints,
    totalPoints: allTimePoints,
    previousPoints: previousPeriodPoints,
    level: Number(user.level || 1),
    levelLabel: `Level ${Number(user.level || 1)}`,
    streak,
    streakLabel: `${streak} Day Streak`,
    badgeTypes: buildBadgeTypes(user, currentPeriodPoints, streak),
    isCurrentUser: currentUser ? user.email === currentUser.email : false
  };
};

const buildLeaderboardResponse = (users, currentUser, scope = 'class', period = 'week') => {
  const normalizedScope = LEADERBOARD_SCOPES.has(scope) ? scope : 'class';
  const periodWindow = getLeaderboardPeriodWindow(period);
  const previousWindow = getPreviousLeaderboardWindow(periodWindow.start, periodWindow.end);
  const recentWindow = getLeaderboardPeriodWindow('week');

  let scopedUsers = users.filter((user) => user.role === 'ecosprint');

  if (normalizedScope === 'class' && currentUser?.profile?.className) {
    scopedUsers = scopedUsers.filter((user) => user.profile?.className === currentUser.profile.className);
  } else if (normalizedScope === 'school' && currentUser?.profile?.school) {
    scopedUsers = scopedUsers.filter((user) => user.profile?.school === currentUser.profile.school);
  }

  if (!scopedUsers.length) {
    scopedUsers = users.filter((user) => user.role === 'ecosprint');
  }

  const normalizedUsers = scopedUsers.map((user) =>
    normalizeLeaderboardUser(user, periodWindow, previousWindow, recentWindow, currentUser)
  );

  const currentSorted = [...normalizedUsers].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.name.localeCompare(b.name);
  });

  const previousSorted = [...normalizedUsers].sort((a, b) => {
    if (b.previousPoints !== a.previousPoints) return b.previousPoints - a.previousPoints;
    return a.name.localeCompare(b.name);
  });

  const currentRankMap = new Map(currentSorted.map((entry, index) => [entry.email, index + 1]));
  const previousRankMap = new Map(previousSorted.map((entry, index) => [entry.email, index + 1]));

  const rankedMembers = currentSorted.map((entry) => {
    const currentRank = currentRankMap.get(entry.email) || 0;
    const previousRank = previousRankMap.get(entry.email) || currentRank;
    const rankChange = previousRank - currentRank;

    return {
      ...entry,
      rank: currentRank,
      change: Math.abs(rankChange),
      changeType: rankChange > 0 ? 'up' : rankChange < 0 ? 'down' : 'same'
    };
  });

  const currentUserEntry = rankedMembers.find((entry) => entry.email === currentUser?.email) || rankedMembers[0] || null;
  const podiumOrder = [rankedMembers[1], rankedMembers[0], rankedMembers[2]].filter(Boolean);

  const scopeLabel = normalizedScope === 'class'
    ? 'My Class'
    : normalizedScope === 'school'
      ? 'My School'
      : 'All Schools';

  const periodLabel = periodWindow.normalizedPeriod === 'week'
    ? 'This Week'
    : periodWindow.normalizedPeriod === 'month'
      ? 'This Month'
      : 'All Time';

  return {
    scope: normalizedScope,
    period: periodWindow.normalizedPeriod,
    scopeLabel,
    periodLabel,
    totalCount: rankedMembers.length,
    podium: podiumOrder,
    rows: rankedMembers.slice(3),
    currentUser: currentUserEntry,
    members: rankedMembers
  };
};

const LEVEL_TITLES = {
  1: 'Eco-Seed',
  2: 'Eco-Sprout',
  3: 'Eco-Sapling',
  4: 'Eco-Advocate',
  5: 'Eco-Ranger',
  6: 'Eco-Warrior',
  7: 'Eco-Guardian',
  8: 'Eco-Elder',
  9: 'Eco-Sage',
  10: 'Eco-Master'
};

const LEVEL_ROADMAP = [
  { num: 1, name: 'Seed' },
  { num: 2, name: 'Sprout' },
  { num: 3, name: 'Sapling' },
  { num: 4, name: 'Hero' },
  { num: 5, name: 'Ranger' },
  { num: 6, name: 'Warrior' },
  { num: 7, name: 'Guardian' },
  { num: 8, name: 'Elder' },
  { num: 9, name: 'Sage' },
  { num: 10, name: 'Master' }
];

const LEVEL_XP_THRESHOLDS = [0, 250, 500, 875, 1375, 2000, 2800, 3700, 4700, 5800, 7000];

const formatLongDate = (dateValue) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(dateValue));

const formatRelativeTime = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Recently';
  }

  const diffInDays = Math.floor((Date.now() - date.getTime()) / (24 * 60 * 60 * 1000));
  if (diffInDays <= 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} days ago`;
};

const startOfDay = (dateValue) => {
  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);
  return date;
};

const endOfDay = (dateValue) => {
  const date = new Date(dateValue);
  date.setHours(23, 59, 59, 999);
  return date;
};

const getProgressPeriodWindow = (period = '30days') => {
  const normalizedPeriod = String(period || '30days').toLowerCase();
  const end = endOfDay(new Date());

  if (normalizedPeriod === 'all') {
    return { normalizedPeriod: 'all', start: null, end };
  }

  const days = normalizedPeriod === '90days' ? 90 : 30;
  const start = startOfDay(new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000));
  return { normalizedPeriod: `${days}days`, start, end };
};

const getDaysBetween = (startDate, endDate) => {
  const days = [];
  const cursor = startOfDay(startDate);
  const end = startOfDay(endDate);

  while (cursor <= end) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
};

const getLevelMeta = (levelValue) => {
  const safeLevel = Math.min(Math.max(Number(levelValue || 1), 1), 10);
  return {
    level: safeLevel,
    levelLabel: `Level ${safeLevel}`,
    title: LEVEL_TITLES[safeLevel] || 'Eco-Explorer'
  };
};

const buildProgressResponse = (user, period = '30days') => {
  const history = Array.isArray(user.dailyChallengeHistory) ? user.dailyChallengeHistory : [];
  const activityHistory = history
    .map((entry) => ({
      ...entry,
      date: new Date(entry.date)
    }))
    .filter((entry) => !Number.isNaN(entry.date.getTime()))
    .sort((a, b) => b.date - a.date);

  const periodWindow = getProgressPeriodWindow(period);
  const currentLevelMeta = getLevelMeta(user.level);

  const allAnswered = activityHistory.filter((entry) => entry.status === 'correct' || entry.status === 'wrong');
  const correctAnswers = allAnswered.filter((entry) => entry.status === 'correct').length;
  const averageScore = allAnswered.length ? Math.round((correctAnswers / allAnswered.length) * 100) : 0;

  const uniqueCorrectTopics = new Set(
    activityHistory
      .filter((entry) => entry.status === 'correct')
      .map((entry) => String(entry.topic || '').trim().toLowerCase())
      .filter(Boolean)
  );

  const topicStats = new Map();
  activityHistory.forEach((entry) => {
    const topicKey = String(entry.topic || 'General').trim();
    const existing = topicStats.get(topicKey) || { correct: 0, attempted: 0 };

    if (entry.status !== 'missed') {
      existing.attempted += 1;
    }
    if (entry.status === 'correct') {
      existing.correct += 1;
    }

    topicStats.set(topicKey, existing);
  });

  const topicMastery = Array.from(topicStats.entries())
    .map(([topic, stats]) => ({
      topic,
      percentage: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
      attempted: stats.attempted,
      correct: stats.correct
    }))
    .sort((a, b) => b.percentage - a.percentage || a.topic.localeCompare(b.topic));

  const periodEntries = periodWindow.start
    ? activityHistory.filter((entry) => entry.date >= periodWindow.start && entry.date <= periodWindow.end)
    : activityHistory;

  const periodPoints = periodEntries.reduce((total, entry) => total + Number(entry.earned || 0), 0);
  const quizHistory = activityHistory.slice(0, 10).map((entry) => ({
    name: `Daily Challenge - ${entry.topic || 'Environment'}`,
    date: formatLongDate(entry.date),
    score: entry.status === 'correct' ? '100%' : '0%',
    status: entry.status === 'correct' ? 'passed' : 'retry',
    topic: entry.topic || 'Environment'
  }));

  const chartDays = periodWindow.start
    ? getDaysBetween(periodWindow.start, periodWindow.end)
    : getDaysBetween(startOfDay(new Date(Date.now() - 29 * 24 * 60 * 60 * 1000)), endOfDay(new Date()));

  const dailyEarnedMap = new Map();
  activityHistory.forEach((entry) => {
    const key = toDateKey(entry.date);
    dailyEarnedMap.set(key, (dailyEarnedMap.get(key) || 0) + Number(entry.earned || 0));
  });

  const pointsBaseline = chartDays.reduce((baseline, day) => {
    const key = toDateKey(day);
    return baseline - (dailyEarnedMap.get(key) || 0);
  }, Number(user.xp || 0));

  let runningPoints = pointsBaseline;
  const chartData = chartDays.map((day) => {
    runningPoints += dailyEarnedMap.get(toDateKey(day)) || 0;
    return Math.max(0, runningPoints);
  });

  const heatmapDays = getDaysBetween(
    startOfDay(new Date(Date.now() - 364 * 24 * 60 * 60 * 1000)),
    endOfDay(new Date())
  );
  const sessionCountMap = new Map();
  activityHistory.forEach((entry) => {
    const key = toDateKey(entry.date);
    sessionCountMap.set(key, (sessionCountMap.get(key) || 0) + 1);
  });
  const heatmapCounts = heatmapDays.map((day) => sessionCountMap.get(toDateKey(day)) || 0);
  const totalSessions = Array.from(sessionCountMap.values()).reduce((total, count) => total + count, 0);

  const currentLevel = currentLevelMeta.level;
  const currentThreshold = LEVEL_XP_THRESHOLDS[Math.max(0, currentLevel - 1)] || 0;
  const nextThreshold = LEVEL_XP_THRESHOLDS[Math.min(currentLevel, LEVEL_XP_THRESHOLDS.length - 1)] || currentThreshold;
  const pointsIntoLevel = Math.max(0, Number(user.xp || 0) - currentThreshold);
  const pointsNeeded = Math.max(0, nextThreshold - Number(user.xp || 0));
  const roadmapProgress = nextThreshold > currentThreshold
    ? Math.min(100, Math.max(0, Math.round((pointsIntoLevel / (nextThreshold - currentThreshold)) * 100)))
    : 100;

  const roadmap = LEVEL_ROADMAP.map((level) => ({
    ...level,
    completed: level.num < currentLevel,
    active: level.num === currentLevel
  }));

  return {
    user: {
      name: user.profile?.fullName || user.username || '',
      avatarUrl: user.profile?.avatarUrl || '',
      levelLabel: currentLevelMeta.levelLabel,
      title: currentLevelMeta.title,
      streakLabel: `${countActivityStreak(activityHistory)} Day Streak`,
      points: Number(user.xp || 0)
    },
    stats: {
      totalPoints: Number(user.xp || 0),
      modulesCompleted: `${Math.min(uniqueCorrectTopics.size, 8)}/8`,
      quizzesTaken: allAnswered.length,
      averageScore: `${averageScore}%`
    },
    chart: {
      labels: chartDays.map((day) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(day)),
      values: chartData,
      period: periodWindow.normalizedPeriod
    },
    topicMastery,
    heatmap: {
      cells: heatmapCounts,
      sessions: totalSessions
    },
    roadmap: {
      currentLevel,
      currentTitle: currentLevelMeta.title,
      pointsNeeded,
      progress: roadmapProgress,
      levels: roadmap
    },
    quizHistory,
    summary: {
      period: periodWindow.normalizedPeriod,
      totalPoints: Number(user.xp || 0),
      activeChallenges: allAnswered.length
    }
  };
};

const buildEcoDashboardResponse = (user, leaderboardResponse, progressResponse) => {
  const history = Array.isArray(user.dailyChallengeHistory) ? user.dailyChallengeHistory : [];
  const currentUser = leaderboardResponse?.currentUser || leaderboardResponse?.members?.find((member) => member.isCurrentUser) || null;
  const currentRank = currentUser?.rank || leaderboardResponse?.members?.find((member) => member.isCurrentUser)?.rank || 1;
  const weeklyCompleted = history.filter((entry) => {
    const entryDate = new Date(entry.date);
    return !Number.isNaN(entryDate.getTime()) && (Date.now() - entryDate.getTime()) <= (7 * 24 * 60 * 60 * 1000);
  }).length;

  const currentModule = progressResponse?.roadmap?.levels?.find((level) => level.active)
    || progressResponse?.roadmap?.levels?.find((level) => !level.completed)
    || progressResponse?.roadmap?.levels?.[0]
    || null;

  const masteryLead = Array.isArray(progressResponse?.topicMastery) && progressResponse.topicMastery.length
    ? progressResponse.topicMastery[0]
    : null;

  const dailyChallenge = user.dailyChallenge?.question
    ? {
        title: user.dailyChallenge.topic || 'Daily Challenge',
        question: user.dailyChallenge.question,
        reward: Number(user.dailyChallenge.awardedPoints || DAILY_CHALLENGE_REWARD_POINTS),
        expiresLabel: user.dailyChallenge.assignedAt ? formatRelativeTime(user.dailyChallenge.assignedAt) : 'Available now'
      }
    : {
        title: 'Daily Challenge',
        question: 'Your next challenge will be assigned soon.',
        reward: DAILY_CHALLENGE_REWARD_POINTS,
        expiresLabel: 'Available now'
      };

  const continueLearning = {
    title: masteryLead?.topic || currentModule?.name || 'Foundations',
    progress: masteryLead?.percentage ?? progressResponse?.roadmap?.progress ?? 0,
    subtitle: masteryLead
      ? `${masteryLead.correct}/${masteryLead.attempted} correct answers`
      : `Level ${progressResponse?.roadmap?.currentLevel || Number(user.level || 1)}`
  };

  const recentActivity = history.slice(0, 3).map((entry) => ({
    title: entry.status === 'correct'
      ? `Completed ${entry.topic || 'Environment'} challenge`
      : entry.status === 'wrong'
        ? `Tried ${entry.topic || 'Environment'} challenge`
        : `Skipped ${entry.topic || 'Environment'} challenge`,
    detail: `${formatRelativeTime(entry.date)} • ${entry.earned > 0 ? `+${entry.earned} XP` : 'No XP earned'}`,
    tone: entry.status === 'correct' ? 'success' : entry.status === 'wrong' ? 'warning' : 'muted'
  }));

  const leaderboardPreview = Array.isArray(leaderboardResponse?.members)
    ? leaderboardResponse.members.slice(0, 3).map((member) => ({
        rank: member.rank,
        name: member.name,
        points: member.points,
        avatarUrl: member.avatarUrl,
        isCurrentUser: member.isCurrentUser
      }))
    : [];

  const moduleProgress = Array.isArray(progressResponse?.roadmap?.levels)
    ? progressResponse.roadmap.levels.map((level) => ({
        label: level.name,
        completed: Boolean(level.completed),
        active: Boolean(level.active)
      }))
    : [];

  return {
    user: {
      name: user.profile?.fullName || user.username || '',
      firstName: (user.profile?.fullName || user.username || '').split(' ').filter(Boolean)[0] || user.username || 'Learner',
      avatarUrl: user.profile?.avatarUrl || '',
      levelLabel: progressResponse?.user?.levelLabel || `Level ${Number(user.level || 1)}`,
      points: Number(user.xp || 0),
      streakLabel: progressResponse?.user?.streakLabel || `${countActivityStreak(history)} Day Streak`,
      school: user.profile?.school || 'Greenview High School',
      className: user.profile?.className || '11-B'
    },
    overview: {
      welcomeMessage: `Welcome back, ${progressResponse?.user?.name || user.profile?.fullName || user.username || 'Learner'}!`,
      completedThisWeek: weeklyCompleted,
      schoolPercentile: currentRank <= 5 ? 'Top 5%' : `#${currentRank}`,
      rankLabel: `#${currentRank}`
    },
    stats: {
      totalPoints: Number(user.xp || 0),
      streakDays: countActivityStreak(history),
      challengesCompleted: history.filter((entry) => entry.status === 'correct' || entry.status === 'wrong').length,
      schoolRank: currentRank,
      modulesCompleted: progressResponse?.stats?.modulesCompleted || '0/8',
      averageScore: progressResponse?.stats?.averageScore || '0%'
    },
    quickActions: {
      dailyChallenge,
      continueLearning,
      weeklySpecial: {
        title: 'Team Battle',
        reward: '2X POINTS',
        note: 'Limited time'
      }
    },
    learningPath: {
      title: progressResponse?.roadmap?.currentTitle || 'My Learning Path',
      progress: progressResponse?.roadmap?.progress || 0,
      currentLevel: progressResponse?.roadmap?.currentLevel || Number(user.level || 1),
      pointsNeeded: progressResponse?.roadmap?.pointsNeeded || 0,
      steps: moduleProgress
    },
    recentActivity,
    leaderboardPreview
  };
};

const toOptionId = (value, fallbackIndex) => {
  if (!value) {
    return String.fromCharCode(65 + fallbackIndex);
  }
  return String(value).toUpperCase().trim();
};

const normalizeAiChallenge = (payload) => {
  const data = Array.isArray(payload) ? payload[0] : payload;
  if (!data || !data.question) {
    throw new Error('AI challenge payload missing question');
  }

  const optionsSource = Array.isArray(data.options)
    ? data.options
    : Array.isArray(data.answers)
      ? data.answers
      : [];

  const options = optionsSource
    .slice(0, 4)
    .map((option, index) => {
      if (typeof option === 'string') {
        return {
          id: String.fromCharCode(65 + index),
          text: option
        };
      }

      return {
        id: toOptionId(option.id, index),
        text: String(option.text || option.answer || '').trim()
      };
    })
    .filter((option) => option.text);

  if (options.length !== 4) {
    throw new Error('AI challenge must provide exactly 4 options');
  }

  const mappedIds = options.map((option) => option.id);
  const rawCorrect = toOptionId(data.correctAnswer || data.correct_option || data.correct, 0);
  const correctAnswer = mappedIds.includes(rawCorrect) ? rawCorrect : mappedIds[0];

  return {
    challengeId: String(data.id || data.challengeId || `dc-${Date.now()}`),
    question: String(data.question).trim(),
    topic: String(data.topic || data.category || 'Environment').trim(),
    options,
    correctAnswer,
    funFact: String(data.funFact || data.explanation || '').trim(),
    wrongFact: String(data.wrongFact || data.explanation || '').trim()
  };
};

const fetchAiDailyChallenge = async () => {
  if (!DAILY_CHALLENGE_API_URL) {
    throw new Error('DAILY_CHALLENGE_API_URL is not configured');
  }

  const response = await fetch(DAILY_CHALLENGE_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DAILY_CHALLENGE_API_TOKEN}`,
      'X-API-Key': DAILY_CHALLENGE_API_TOKEN,
      'x-api-key': DAILY_CHALLENGE_API_TOKEN
    }
  });

  if (!response.ok) {
    throw new Error(`AI challenge API failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeAiChallenge(payload);
};

const getDailyChallengeSeed = (email, dayKey) => `${String(email || '').toLowerCase().trim()}|${dayKey}`;

const seededIndex = (seedText, length) => {
  let hash = 0;
  for (let i = 0; i < seedText.length; i += 1) {
    hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
  }

  return length > 0 ? hash % length : 0;
};

const seededShuffle = (items, seedText) => {
  const shuffled = [...items];
  let seed = seededIndex(seedText, 0) || 1;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapIndex = seed % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
};

const createDailyChallenge = (email) => {
  const todayKey = new Date().toISOString().slice(0, 10);
  const challengeSeed = getDailyChallengeSeed(email, todayKey);
  const challengeIndex = seededIndex(challengeSeed, DAILY_CHALLENGE_BANK.length);
  const template = DAILY_CHALLENGE_BANK[challengeIndex];
  const shuffledOptions = seededShuffle(template.options, `${challengeSeed}|${challengeIndex}|options`);
  const correctAnswer = shuffledOptions.find((option) => option.text === template.options.find((option) => option.id === template.correctAnswer)?.text)?.id || shuffledOptions[0].id;

  return {
    challengeId: `daily-${todayKey}-${challengeIndex}`,
    ...template,
    options: shuffledOptions,
    correctAnswer
  };
};

const toChallengeResponse = (user, source = 'ai') => {
  const assignedAt = user.dailyChallenge?.assignedAt ? new Date(user.dailyChallenge.assignedAt).getTime() : null;
  const resetAt = assignedAt
    ? new Date(assignedAt + DAILY_CHALLENGE_ROTATION_HOURS * 60 * 60 * 1000).toISOString()
    : null;

  return {
    challenge: {
      challengeId: user.dailyChallenge?.challengeId,
      question: user.dailyChallenge?.question,
      topic: user.dailyChallenge?.topic,
      options: user.dailyChallenge?.options || [],
      correctAnswer: user.dailyChallenge?.correctAnswer,
      funFact: user.dailyChallenge?.funFact,
      wrongFact: user.dailyChallenge?.wrongFact
    },
    answered: Boolean(user.dailyChallenge?.answered),
    selectedAnswer: user.dailyChallenge?.selectedAnswer || null,
    isCorrect: Boolean(user.dailyChallenge?.isCorrect),
    awardedPoints: Number(user.dailyChallenge?.awardedPoints || 0),
    assignedAt: user.dailyChallenge?.assignedAt || null,
    resetAt,
    rewardPoints: DAILY_CHALLENGE_REWARD_POINTS,
    totalPoints: user.xp,
    source
  };
};

const getOrAssignDailyChallenge = async (user) => {
  const now = Date.now();
  const rotationMs = DAILY_CHALLENGE_ROTATION_HOURS * 60 * 60 * 1000;
  const assignedAt = user.dailyChallenge?.assignedAt ? new Date(user.dailyChallenge.assignedAt).getTime() : null;

  if (assignedAt && now - assignedAt < rotationMs && user.dailyChallenge?.question) {
    return user;
  }

  if (user.dailyChallenge?.question && !user.dailyChallenge?.answered) {
    user.dailyChallengeHistory.unshift({
      date: new Date(),
      topic: user.dailyChallenge.topic || 'Environment',
      status: 'missed',
      earned: 0
    });
  }

  const nextChallenge = createDailyChallenge(user.email || 'student');
  const source = 'backend-daily-bank';

  user.dailyChallenge = {
    ...nextChallenge,
    assignedAt: new Date(),
    answered: false,
    selectedAnswer: null,
    isCorrect: false,
    awardedPoints: 0
  };

  user.dailyChallengeHistory = (user.dailyChallengeHistory || []).slice(0, 30);
  user.dailyChallenge.source = source;
  await user.save();
  user._dailyChallengeSource = source;
  return user;
};

// Health check routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

app.get('/api/user/stats', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      xp: user.xp,
      level: user.level,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load user stats' });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(buildProfileResponse(user));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load profile' });
  }
});

app.get('/api/ecosprint/dashboard', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'ecosprint' && !user.profile?.welcomeBonusClaimed) {
      user.xp += 500;
      user.profile = user.profile || {};
      user.profile.welcomeBonusClaimed = true;
      await user.save();
    }

    const refreshedUser = await User.findOne({ email });
    const allEcoUsers = await User.find({ role: 'ecosprint' }).lean();
    const currentUser = allEcoUsers.find((entry) => String(entry.email || '').toLowerCase().trim() === email) || refreshedUser;
    const leaderboardResponse = buildLeaderboardResponse(allEcoUsers, currentUser, 'school', 'week');
    const progressResponse = buildProgressResponse(refreshedUser, '30days');

    return res.status(200).json(buildEcoDashboardResponse(refreshedUser, leaderboardResponse, progressResponse));
  } catch (error) {
    console.error('Eco dashboard load failed:', error.message);
    return res.status(500).json({ message: 'Failed to load EcoSprint dashboard' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    const scope = String(req.query?.scope || 'class').toLowerCase();
    const period = String(req.query?.period || 'week').toLowerCase();

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const users = await User.find({ role: 'ecosprint' }).lean();
    const currentUser = users.find((user) => String(user.email || '').toLowerCase().trim() === email);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(buildLeaderboardResponse(users, currentUser, scope, period));
  } catch (error) {
    console.error('Leaderboard load failed:', error.message);
    return res.status(500).json({ message: 'Failed to load leaderboard' });
  }
});

app.get('/api/progress', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    const period = String(req.query?.period || '30days').toLowerCase();

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(buildProgressResponse(user, period));
  } catch (error) {
    console.error('Progress load failed:', error.message);
    return res.status(500).json({ message: 'Failed to load progress' });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    const {
      fullName,
      newEmail,
      bio,
      interests,
      avatarUrl,
      school,
      className,
      appearanceMode,
      volume,
      notifications,
      dailyGoal,
      reminderTime,
      journeyType,
      onboardingCompleted
    } = req.body || {};

    if (!email) {
      return res.status(400).json({ message: 'Current email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const targetEmail = String(newEmail || email).toLowerCase().trim();
    const existingEmailUser = targetEmail !== email ? await User.findOne({ email: targetEmail }) : null;

    if (existingEmailUser) {
      return res.status(409).json({ message: 'Another user already uses that email' });
    }

    if (fullName) {
      user.username = String(fullName).trim();
      user.fullName = String(fullName).trim();
      user.profile = user.profile || {};
      user.profile.fullName = String(fullName).trim();
    }

    if (targetEmail !== email) {
      user.email = targetEmail;
    }

    user.profile = user.profile || {};
    if (typeof bio === 'string') user.profile.bio = bio.trim();
    if (Array.isArray(interests)) user.profile.interests = interests.map((item) => String(item).trim()).filter(Boolean);
    if (typeof avatarUrl === 'string') user.profile.avatarUrl = avatarUrl.trim();
    if (typeof school === 'string') user.profile.school = school.trim();
    if (typeof className === 'string') user.profile.className = className.trim();
    if (typeof appearanceMode === 'string') user.profile.appearanceMode = appearanceMode.trim();
    if (typeof volume === 'number' && !Number.isNaN(volume)) user.profile.volume = volume;
    if (notifications && typeof notifications === 'object') {
      user.profile.notifications = {
        dailyChallenge: Boolean(notifications.dailyChallenge),
        newModule: Boolean(notifications.newModule)
      };
    }
    if (typeof dailyGoal === 'number' && !Number.isNaN(dailyGoal)) user.profile.dailyGoal = dailyGoal;
    if (typeof reminderTime === 'string') user.profile.reminderTime = reminderTime.trim();
    if (typeof journeyType === 'string') user.profile.journeyType = journeyType.trim();
    if (typeof onboardingCompleted === 'boolean') user.profile.onboardingCompleted = onboardingCompleted;

    await user.save();

    return res.status(200).json(buildProfileResponse(user));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update profile' });
  }
});

app.get('/api/daily-challenge', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await getOrAssignDailyChallenge(user);
    const activity = (user.dailyChallengeHistory || []).slice(0, 10).map((entry) => ({
      date: entry.date,
      topic: entry.topic,
      status: entry.status,
      earned: entry.earned
    }));

    return res.status(200).json({
      ...toChallengeResponse(user, user._dailyChallengeSource || user.dailyChallenge?.source || 'ai'),
      activity
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to load daily challenge' });
  }
});

app.post('/api/daily-challenge/submit', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    const selectedAnswer = String(req.body?.selectedAnswer || '').toUpperCase().trim();

    if (!email || !selectedAnswer) {
      return res.status(400).json({ message: 'Email and selectedAnswer are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await getOrAssignDailyChallenge(user);

    if (!user.dailyChallenge?.question) {
      return res.status(400).json({ message: 'No active challenge found for this user' });
    }

    if (user.dailyChallenge.answered) {
      return res.status(200).json(toChallengeResponse(user, user._dailyChallengeSource || user.dailyChallenge?.source || 'ai'));
    }

    const isCorrect = selectedAnswer === String(user.dailyChallenge.correctAnswer || '').toUpperCase();
    const earned = isCorrect ? DAILY_CHALLENGE_REWARD_POINTS : 0;

    user.dailyChallenge.answered = true;
    user.dailyChallenge.selectedAnswer = selectedAnswer;
    user.dailyChallenge.isCorrect = isCorrect;
    user.dailyChallenge.awardedPoints = earned;

    if (earned > 0) {
      user.xp += earned;
    }

    user.dailyChallengeHistory.unshift({
      date: new Date(),
      topic: user.dailyChallenge.topic || 'Environment',
      status: isCorrect ? 'correct' : 'wrong',
      earned
    });
    user.dailyChallengeHistory = user.dailyChallengeHistory.slice(0, 30);

    await user.save();
    return res.status(200).json(toChallengeResponse(user, user._dailyChallengeSource || user.dailyChallenge?.source || 'ai'));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to submit daily challenge answer' });
  }
});

app.get('/api/daily-challenge/activity', async (req, res) => {
  try {
    const email = getNormalizedEmail(req);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activity = (user.dailyChallengeHistory || []).slice(0, 10).map((entry) => ({
      date: entry.date,
      topic: entry.topic,
      status: entry.status,
      earned: entry.earned
    }));

    return res.status(200).json({ activity });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load recent activity' });
  }
});

app.post('/api/signup/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    if (mailMode === 'dev') {
      // Dev mode is intentional for local testing only.
      // For real user signup, configure SendGrid, SMTP_APP_PASSWORD, or another mail provider.
      return res.status(503).json({
        message:
          'OTP email service is not configured. Set SENDGRID_API_KEY for SendGrid, or SMTP_APP_PASSWORD for Gmail app password.'
      });
    }

    await sendOtpMail({ to: normalizedEmail, otp });
    otpStore.set(normalizedEmail, { otp, expiresAt });

    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    const oauthError = error?.response?.data || null;
    console.error('OTP send failed:', oauthError || error.message);

    const isUnauthorizedClient = oauthError?.error === 'unauthorized_client';
    const message = isUnauthorizedClient
      ? 'Google OAuth mismatch: generate a new refresh token in OAuth Playground using your own client ID/secret.'
      : oauthError?.error_description || oauthError?.error || 'Failed to send OTP email';

    return res.status(500).json({
      message
    });
  }
});

app.post('/api/signup/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const otpData = otpStore.get(normalizedEmail);

  if (!otpData) {
    return res.status(400).json({ message: 'No OTP request found for this email' });
  }

  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(normalizedEmail);
    return res.status(400).json({ message: 'OTP expired. Please request a new OTP' });
  }

  if (otpData.otp !== String(otp)) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  otpStore.set(normalizedEmail, { ...otpData, verified: true });
  return res.status(200).json({ message: 'OTP verified successfully' });
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: 'Google access token is required' });
    }

    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!googleResponse.ok) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    const profile = await googleResponse.json();
    const normalizedEmail = String(profile.email || '').toLowerCase().trim();

    if (!normalizedEmail) {
      return res.status(400).json({ message: 'Google account email not available' });
    }

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      const displayName = String(profile.name || normalizedEmail.split('@')[0]).trim();
      user = await User.create({
        fullName: displayName,
        username: displayName,
        email: normalizedEmail,
        password: `google_${Date.now()}`,
        role: 'ecosprint',
        xp: 0,
        level: 1
      });
    }

    return res.status(200).json({
      message: 'Google login successful',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during Google login' });
  }
});

app.post('/api/user/update-role', async (req, res) => {
  try {
    const { email, role, pathType } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    if (!['ecosprint', 'codesprint'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        $set: {
          role,
          'profile.journeyType': pathType || (role === 'ecosprint' ? 'school' : 'college'),
          'profile.onboardingCompleted': false
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Role updated successfully',
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating role' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, otp, pathType } = req.body;

    if (!fullName || !email || !password || !confirmPassword || !otp || !pathType) {
      return res.status(400).json({ message: 'All signup fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (String(otp).length !== 4) {
      return res.status(400).json({ message: 'OTP must be 4 digits' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpData = otpStore.get(normalizedEmail);
    if (!otpData) {
      return res.status(400).json({ message: 'OTP not requested for this email' });
    }
    if (Date.now() > otpData.expiresAt) {
      otpStore.delete(normalizedEmail);
      return res.status(400).json({ message: 'OTP expired. Please request a new OTP' });
    }
    if (!otpData.verified || otpData.otp !== String(otp)) {
      return res.status(400).json({ message: 'Please verify OTP before completing signup' });
    }
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const role = pathType === 'foundation' ? 'ecosprint' : 'codesprint';

    const createdUser = await User.create({
      fullName: fullName.trim(),
      username: fullName.trim(),
      email: normalizedEmail,
      password,
      role,
      xp: 0,
      level: 1
    });

    otpStore.delete(normalizedEmail);

    return res.status(201).json({
      message: 'Signup successful',
      user: {
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during signup' });
  }
});

const seedDefaultUsers = async () => {
  const defaultUsers = [
    {
      username: 'Student User',
      email: 'student@gmail.com',
      password: 'sprint123',
      role: 'ecosprint',
      xp: 0,
      level: 1
    },
    {
      username: 'College User',
      email: 'college@gmail.com',
      password: 'code123',
      role: 'codesprint',
      xp: 0,
      level: 1
    }
  ];

  for (const account of defaultUsers) {
    const existingUser = await User.findOne({ email: account.email });
    if (!existingUser) {
      await User.create(account);
    }
  }
};

const PORT = process.env.PORT || 5000;
let serverStarted = false;

const startServer = () => {
  if (serverStarted) return;
  serverStarted = true;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const connectMongoAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    await seedDefaultUsers();
    console.log('Default users synced');
  } catch (error) {
    console.error('Failed to seed default users:', error.message);
    console.error('MongoDB connection/seeding issue. Running API without DB.');
  } finally {
    startServer();
  }
};

connectMongoAndSeed();
