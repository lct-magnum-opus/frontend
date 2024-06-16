import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';

import '@/app/styles/index.css';

const containerElement = document.getElementById('root');

if (containerElement) {
  const root = ReactDOM.createRoot(containerElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
