// fetch-instance.js

// check the base URL in cmd writing ipconfig
const BASE_URL = "http://192.168.137.205:9191";

// Create a function for making fetch requests with common configurations
const fetchInstance = async (url, options) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*/*",
        ...options.headers, // You can override headers if needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle fetch error
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchInstance;
