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
app.use(express.json());

const otpStore = new Map();

let transporter = null;
let googleOauth2Client = null;
let mailMode = 'dev';

try {
  // Keep backend booting even when nodemailer is not installed/configured.
  const nodemailer = require('nodemailer');

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

// Health check routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running', timestamp: new Date() });
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

    if (mailMode === 'dev') {
      return res.status(503).json({
        message: 'OTP email service is not configured. Please contact support.'
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

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
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    if (!['ecosprint', 'codesprint'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { role },
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
    await User.findOneAndUpdate(
      { email: account.email },
      account,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
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
