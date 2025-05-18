// config/api.js
const isProduction = typeof window === 'undefined' 
  ? process.env.NODE_ENV === 'production'
  : window.location.hostname !== 'localhost';

const API_URL = isProduction
  ? 'https://ayo.newstropy.online'
  : 'http://127.0.0.1:8000';

// Development warnings
if (!isProduction && typeof window !== 'undefined') {
  console.log(`⚡ Development mode using API: ${API_URL}`);
  if (window.location.protocol === 'https:') {
    console.warn('⚠️ Note: You may need to configure CORS for HTTPS → HTTP requests');
  }
}

export { API_URL };