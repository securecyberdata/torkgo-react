export const fetchData = async (url, options = {}) => {
  try {
    // Get the base URL from window.location in production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? `${window.location.origin}/api`
      : process.env.BASE_API_URL || 'http://localhost:3000/api';
    
    console.log(`Fetching from: ${baseUrl}${url}`);
    
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}