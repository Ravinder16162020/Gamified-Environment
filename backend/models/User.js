const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ecosprint', 'codesprint']
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  profile: {
    fullName: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    interests: {
      type: [String],
      default: []
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    school: {
      type: String,
      default: 'Greenview High School'
    },
    className: {
      type: String,
      default: '11-B'
    },
    appearanceMode: {
      type: String,
      default: 'light'
    },
    volume: {
      type: Number,
      default: 70
    },
    notifications: {
      dailyChallenge: { type: Boolean, default: true },
      newModule: { type: Boolean, default: true }
    },
    dailyGoal: {
      type: Number,
      default: 50
    },
    reminderTime: {
      type: String,
      default: '16:00'
    },
    journeyType: {
      type: String,
      default: 'school'
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    },
    welcomeBonusClaimed: {
      type: Boolean,
      default: false
    }
  },
  dailyChallenge: {
    challengeId: {
      type: String,
      default: null
    },
    question: {
      type: String,
      default: null
    },
    topic: {
      type: String,
      default: null
    },
    options: {
      type: [
        {
          id: { type: String },
          text: { type: String }
        }
      ],
      default: []
    },
    correctAnswer: {
      type: String,
      default: null
    },
    funFact: {
      type: String,
      default: null
    },
    wrongFact: {
      type: String,
      default: null
    },
    assignedAt: {
      type: Date,
      default: null
    },
    answered: {
      type: Boolean,
      default: false
    },
    selectedAnswer: {
      type: String,
      default: null
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    awardedPoints: {
      type: Number,
      default: 0
    }
  },
  dailyChallengeHistory: {
    type: [
      {
        date: { type: Date, default: Date.now },
        topic: { type: String, required: true },
        status: { type: String, enum: ['correct', 'wrong', 'missed'], required: true },
        earned: { type: Number, default: 0 }
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
