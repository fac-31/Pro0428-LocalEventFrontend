import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import router from './config/router';
import './styles/main.css';
import { TokenProvider } from './config/TokenProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </StrictMode>,
);
