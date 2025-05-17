import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import router from './config/router';
import './styles/main.css';
import { IdProvider } from './config/IdContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IdProvider>
      <RouterProvider router={router} />
    </IdProvider>
  </StrictMode>,
);
