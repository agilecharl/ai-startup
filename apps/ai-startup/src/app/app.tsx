import { Dashboard } from '@ai-startup/ai';
import ServicesList from '@ai-startup/commerce';
import DefaultNavbar from '@ai-startup/dashboard';
import { initializeRestClient } from '@ai-startup/data';
import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME;
const drawerLinks = [
  { label: 'Home', path: '/' },
  { label: 'AI', path: '/ai' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
];

export function App() {

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('Initializing app with API URL:', apiUrl);
    console.log('Available environment variables:', Object.keys(import.meta.env));
    
    if (!apiUrl) {
      console.error('VITE_API_URL environment variable is not set. Please check your .env file.');
    }
    
    initializeRestClient({ apiUrl });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DefaultNavbar appName={appName} drawerLinks={drawerLinks} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route
        path="/"
        element={
          <div style={{ width: '100%', height: '100%' }}>
          This is the generated root route.{' '}
          <Link to="/page-2">Click here for page 2.</Link>
          </div>
        }
        />
        <Route path="/ai" element={<div style={{ width: '100%', height: '100%' }}><Dashboard /></div>} />
        <Route path="/services" element={<div style={{ width: '100%', height: '100%' }}><ServicesList /></div>} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
