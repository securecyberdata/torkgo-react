export const fetchData = async (url, options = {}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? 'https://www.sayariglobal.com/api' 
                     : '');

    const fullUrl = `${baseUrl}${url}`;
    console.log(`[Client] Fetching from: ${fullUrl}`);

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`[Client] Error fetching data from ${url}:`, error);
    throw error;
  }
}