const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : (typeof window !== 'undefined' && window.location.port === '3000'
      ? 'http://localhost:5000'
      : ''));

const resolveApiUrl = (path) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
};

export const apiFetch = (path, options = {}) => {
  return fetch(resolveApiUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
};

export const fetchExternalDailyChallenge = async (apiToken) => {
  const challengeUrl = process.env.REACT_APP_DAILY_CHALLENGE_API_URL;

  if (!challengeUrl) {
    throw new Error('Missing REACT_APP_DAILY_CHALLENGE_API_URL');
  }

  const response = await fetch(resolveApiUrl(challengeUrl), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
      'X-API-Key': apiToken,
      'x-api-key': apiToken
    }
  });

  if (!response.ok) {
    throw new Error(`Daily challenge API failed with status ${response.status}`);
  }

  return response.json();
};

export const getDailyChallenge = async (email) => {
  const response = await apiFetch(`/api/daily-challenge?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error(`Failed to load daily challenge (${response.status})`);
  }
  return response.json();
};

export const submitDailyChallengeAnswer = async (email, selectedAnswer) => {
  const response = await apiFetch('/api/daily-challenge/submit', {
    method: 'POST',
    body: JSON.stringify({ email, selectedAnswer })
  });

  if (!response.ok) {
    throw new Error(`Failed to submit answer (${response.status})`);
  }

  return response.json();
};

export const getDailyChallengeActivity = async (email) => {
  const response = await apiFetch(`/api/daily-challenge/activity?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error(`Failed to load recent activity (${response.status})`);
  }
  return response.json();
};

export const getUserStats = async (email) => {
  const response = await apiFetch(`/api/user/stats?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error(`Failed to load user stats (${response.status})`);
  }
  return response.json();
};

export const getProfile = async (email) => {
  const response = await apiFetch(`/api/profile?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error(`Failed to load profile (${response.status})`);
  }
  return response.json();
};

export const getProgress = async (email, period = '30days') => {
  const response = await apiFetch(`/api/progress?email=${encodeURIComponent(email)}&period=${encodeURIComponent(period)}`);
  if (!response.ok) {
    let serverMessage = `Failed to load progress (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        serverMessage = errorBody.message;
      }
    } catch (error) {
      // Keep fallback message.
    }
    throw new Error(serverMessage);
  }
  return response.json();
};

export const getEcoDashboard = async (email) => {
  const response = await apiFetch(`/api/ecosprint/dashboard?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    let serverMessage = `Failed to load EcoSprint dashboard (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        serverMessage = errorBody.message;
      }
    } catch (error) {
      // Keep the fallback message.
    }
    throw new Error(serverMessage);
  }

  return response.json();
};

export const getEcoBadges = async (email) => {
  const response = await apiFetch(`/api/ecosprint/badges?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    let serverMessage = `Failed to load badge collection (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        serverMessage = errorBody.message;
      }
    } catch (error) {
      // Keep fallback message.
    }
    throw new Error(serverMessage);
  }

  return response.json();
};

export const getLeaderboard = async ({ email, scope = 'class', period = 'week' }) => {
  const response = await apiFetch(
    `/api/leaderboard?email=${encodeURIComponent(email)}&scope=${encodeURIComponent(scope)}&period=${encodeURIComponent(period)}`
  );

  if (!response.ok) {
    let serverMessage = `Failed to load leaderboard (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        serverMessage = errorBody.message;
      }
    } catch (error) {
      // Keep fallback message.
    }
    throw new Error(serverMessage);
  }

  return response.json();
};

export const updateProfile = async (payload) => {
  const response = await apiFetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let serverMessage = `Failed to update profile (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        serverMessage = errorBody.message;
      }
    } catch (error) {
      // Keep the fallback message when response body is not JSON.
    }
    throw new Error(serverMessage);
  }

  return response.json();
};

export const getEcoChallengeFromAI = async (level = 'beginner') => {
  try {
    const response = await apiFetch(`/api/challenge?level=${encodeURIComponent(level)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch eco challenge (${response.status})`);
    }
    
    const data = await response.json();
    
    // Ensure the response has the expected format
    if (!data.question || !data.topic || !data.options) {
      throw new Error('Invalid eco challenge response format');
    }
    
    return data;
  } catch (error) {
    // Log error but don't throw - allow fallback to work
    console.warn('Failed to fetch AI eco challenge:', error.message);
    throw error;
  }
};
