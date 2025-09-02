import DefaultNavbar from '@ai-startup/dashboard';
import { Link, Route, Routes } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME;
const drawerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
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
        <Route
          path="/services"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
