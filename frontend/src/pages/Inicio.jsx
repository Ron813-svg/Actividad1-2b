import React from 'react';

const App = () => {
  const handleClick = () => {
    alert('¡Hola! Has hecho clic en el botón.');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a mi página web</h1>
      <p>Esta es una página creada con React y JSX.</p>
    </div>
  );
};

export default App;
