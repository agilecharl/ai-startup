import AgentsList from '@ai-startup/ai';
import ServicesList from '@ai-startup/commerce';
import DefaultNavbar from '@ai-startup/dashboard';
import { Link, Route, Routes } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME;
const drawerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Agents', path: '/agents' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
];

export function App() {
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
        <Route path="/agents" element={<AgentsList />} />
        <Route path="/services" element={<ServicesList />} />
      </Routes>
    </div>
  );
}

export default App;
