// config.js (for Next.js)
const ENV = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || "production";

const API_URL = ENV === "development" 
  ? process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:8000"
  : process.env.NEXT_PUBLIC_API_LIVE || "https://ayo.newstropy.online";

export { API_URL };