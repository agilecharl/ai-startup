import { store } from './store';

let apiUrl = '';
let server = '';
let postgresDatabase = '';
let mongoDatabase = '';
let mongoCollection = '';

store.subscribe(() => {
  const state = store.getState();
  server = state.server;
  postgresDatabase = state.postgresDatabase;
  mongoDatabase = state.mongoDatabase;
  mongoCollection = state.mongoCollection;
});

export const initializeRestClient = (config: { apiUrl: string }) => {
  if (!config.apiUrl) {
    console.warn('API URL not provided during initialization. Some features may not work properly.');
    return;
  }
  apiUrl = config.apiUrl;
  console.log('REST client initialized with API URL:', apiUrl);
};

export const getRecords = (url: string, params: any) => {
  if (!apiUrl) {
    throw new Error('API URL not configured. Please ensure VITE_API_URL is set in your .env file and the server is running. Current environment variables: ' + JSON.stringify(Object.keys(process?.env || {}).filter(key => key.startsWith('VITE_'))));
  }

  const queryParams = new URLSearchParams(params).toString();

  let localApiUrl = `${apiUrl}/${url}`;

  localApiUrl = `${localApiUrl}?server=${server}&postgresDatabase=${postgresDatabase}&mongoDatabase=${mongoDatabase}&mongoCollection=${mongoCollection}`;

  if (queryParams) {
    localApiUrl += `&${queryParams}`;
  }

  return fetch(localApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.text();
        console.error(`HTTP error! status: ${response.status}, URL: ${localApiUrl}`);
        console.error('Response body:', text);
        throw new Error(`HTTP error! status: ${response.status} - ${text.slice(0, 200)}${text.length > 200 ? '...' : ''}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but received:', contentType);
        console.error('Response body:', text);
        throw new Error(`Expected JSON response but received ${contentType || 'unknown content type'}. Response: ${text.slice(0, 200)}${text.length > 200 ? '...' : ''}`);
      }
      
      return response.json();
    })
    .then(async (data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in getRecords:', error);
      console.error('API URL:', localApiUrl);
      throw error;
    });
};

export const insertRecord = (url: string, content: any): Promise<any> => {
  if (!apiUrl) {
    throw new Error('API URL not configured. Please set VITE_API_URL environment variable or call initializeRestClient() with a valid apiUrl.');
  }

  let localApiUrl = `${apiUrl}/${url}`;

  localApiUrl = `${localApiUrl}?server=${server}&postgresDatabase=${postgresDatabase}&mongoDatabase=${mongoDatabase}&mongoCollection=${mongoCollection}`;

  return fetch(localApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const updateRecord = (url: string, content: any) => {
  if (!apiUrl) {
    throw new Error('API URL not configured. Please set VITE_API_URL environment variable or call initializeRestClient() with a valid apiUrl.');
  }

  let localApiUrl = `${apiUrl}/${url}`;

  localApiUrl = `${localApiUrl}?server=${server}&postgresDatabase=${postgresDatabase}&mongoDatabase=${mongoDatabase}&mongoCollection=${mongoCollection}`;

  return fetch(localApiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const deleteRecord = (url: string, params: any) => {
  if (!apiUrl) {
    throw new Error('API URL not configured. Please set VITE_API_URL environment variable or call initializeRestClient() with a valid apiUrl.');
  }

  let localApiUrl = `${apiUrl}/${url}`;

  localApiUrl = `${localApiUrl}?server=${server}&postgresDatabase=${postgresDatabase}&mongoDatabase=${mongoDatabase}&mongoCollection=${mongoCollection}`;

  return fetch(localApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
