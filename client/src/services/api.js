const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem('findit_token');
    if (!token || token === 'undefined' || token === 'null' || typeof token !== 'string') {
      return null;
    }
    // Clean token string to prevent HTTP header pattern exceptions
    const cleanToken = token.trim().replace(/[^\w-._~+/=]/g, '');
    return cleanToken || null;
  } catch (e) {
    return null;
  }
};

export const fetchApi = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  // Ensure endpoint starts with '/'
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const res = await fetch(`${API_BASE}${formattedEndpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    // If token error or pattern error, clear stale token
    if (error.name === 'SyntaxError' || error.message.includes('pattern') || error.message.includes('token')) {
      localStorage.removeItem('findit_token');
    }
    throw error;
  }
};
