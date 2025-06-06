import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PantallaCarga = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir después de 3 segundos
    const timer = setTimeout(() => {
      navigate('/inicio');
    }, 3000);

    return () => clearTimeout(timer); // Limpieza
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="spinner-border text-primary mb-4" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <h4 className="text-primary">Bienvenido</h4>
    </div>
  );
};

export default PantallaCarga;
