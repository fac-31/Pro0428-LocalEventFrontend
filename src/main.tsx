import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import router from './config/router';
import './styles/main.css';
import { TokenProvider } from './config/TokenProvider';
import { AuthProvider } from './auth/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </AuthProvider>,
);
