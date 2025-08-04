/**
 * API Configuration
 * 
 * Centralized configuration for API base URL.
 * Can be configured via environment variable REACT_APP_API_BASE_URL
 * or defaults to localhost:5000 for development.
 */

const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  
  // Remove trailing slash if present to ensure consistent URL formatting
  const cleanUrl = baseUrl.replace(/\/$/, '');
  
  // Validate URL format in development
  if (process.env.NODE_ENV === 'development') {
    try {
      new URL(cleanUrl);
    } catch (error) {
      console.warn(`Warning: Invalid API_BASE_URL format: ${cleanUrl}. Using default localhost:5000`);
      return 'http://localhost:5000';
    }
  }
  
  return cleanUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Log the API base URL in development for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('SecureVault-Pro API Base URL:', API_BASE_URL);
}

export default API_BASE_URL;