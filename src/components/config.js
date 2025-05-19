

const ENV = "production"; 

// API URLs
const API_URL =
  ENV === "development"
    ? "http://127.0.0.1:8000"  
    : "https://ayo.newstropy.online";  

export { API_URL };
