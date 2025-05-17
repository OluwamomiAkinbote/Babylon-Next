// config.js
const ENV = process.env.NEXT_PUBLIC_ENV || "production";

const API_URL =
  ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCAL
    : process.env.NEXT_PUBLIC_API_LIVE;

export { ENV, API_URL };
