export const fetchData = async (url, options = {}) => {
  try {
    // Get the base URL from window.location in production
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? `${window.location.origin}/api`
      : process.env.BASE_API_URL || 'https://sayariglobal.com/api';
    
    const fullUrl = `${baseUrl}${url}`;
    console.log(`[Client] Fetching from: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } else {
          const text = await response.text();
          console.error('[Client] Non-JSON error response:', text);
        }
      } catch (parseError) {
        console.error('[Client] Error parsing error response:', parseError);
      }
      throw new Error(errorMessage);
    }
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server response was not JSON');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[Client] Error fetching data from ${url}:`, error);
    throw error;
  }
}