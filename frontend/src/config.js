// API Configuration
// Uses environment variable REACT_APP_API_BASE_URL if available,
// otherwise defaults to localhost:5000 for development
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  strength: `${API_BASE_URL}/api/strength`,
  crack: `${API_BASE_URL}/api/crack`,
  crypto: `${API_BASE_URL}/api/crypto`
};