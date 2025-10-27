/**
 * This file centralizes the API base URL.
 * It intelligently selects the backend URL based on the environment (development vs. production).
 * Vite uses `import.meta.env` to access environment variables.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default API_BASE_URL;