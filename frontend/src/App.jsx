import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from './components/Nav.jsx';

import Inicio from './pages/Inicio.jsx';
import Libros from './pages/Libros.jsx';


function AppContent() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authRoutes = ['/login', '/register'];

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase().replace(/\/$/, '');
    const shouldHideNav = authRoutes.some((route) => currentPath === route || currentPath.startsWith(route + '/'));
    setIsOpen(!shouldHideNav);
  }, [location.pathname]);

  return (
    <>
      {isOpen && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/libros" element={<Libros/>} />
          
          
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
