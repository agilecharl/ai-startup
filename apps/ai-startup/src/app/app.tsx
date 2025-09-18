import ServicesList from '@ai-startup/commerce';
import DefaultNavbar, { Dashboard } from '@ai-startup/dashboard';
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
    initializeRestClient({ apiUrl: import.meta.env.VITE_API_URL });
  }, []);

  return (
    <div>
      <DefaultNavbar appName={appName} drawerLinks={drawerLinks} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route path="/ai" element={<Dashboard />} />
        <Route path="/services" element={<ServicesList />} />
      </Routes>
    </div>
  );
}

export default App;
