// API Configuration for development and production environments
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:5000' 
    : 'https://password-strength-web.onrender.com',
  
  ENDPOINTS: {
    STRENGTH: '/api/strength',
    CRACK: '/api/crack', 
    CRYPTO: '/api/crypto'
  },
  
  // Timeout for API requests (ms)
  TIMEOUT: 10000
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to create axios config with timeout and error handling
export const getAxiosConfig = () => {
  return {
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};