// config.js (for Next.js)

const ENV = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || "production";

// Optional fallback to API_LIVE if API_LOCAL is not set in dev
const API_URL =
  ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCAL || "http://127.0.0.1:8000"
    : process.env.NEXT_PUBLIC_API_LIVE || "https://default-production-url.com";

export { API_URL };
