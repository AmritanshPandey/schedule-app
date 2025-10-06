import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import AppRoutes from './AppRoutes';
import AddToHomeScreenPrompt from './components/AddToHomeScreenPrompt';
import './styling/global.css';



function useIsDesktop(breakpoint = 768) {
  const isClient = typeof window !== 'undefined';
  const [isDesktop, setIsDesktop] = useState(
    () => (isClient ? window.innerWidth >= breakpoint : true)
  );

  useEffect(() => {
    if (!isClient) return;
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint, isClient]);

  return isDesktop;
}

export default function App() {
  const isDesktop = useIsDesktop(768);

  return (
    <Router>
      <ScrollToTop />
      {/* Show the Add to Home Screen prompt only on mobile devices */}
      {!isDesktop && <AddToHomeScreenPrompt />}
      {isDesktop ? <LandingPage /> : <AppRoutes />}
    </Router>
  );
}