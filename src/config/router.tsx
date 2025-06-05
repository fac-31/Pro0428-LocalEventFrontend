import { createBrowserRouter } from 'react-router';

import PublicHome from '../pages/PublicHome';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UserHome from '../pages/UserHome';
import UserProfile from '../pages/UserProfile';
import Error from '../pages/Error';
import SavedEvents from '../pages/SavedEvents';
import PasswordReset from '../pages/PasswordReset';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicHome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/userhome/:mode?',
    element: <UserHome />,
  },
  {
    path: '/userprofile',
    element: <UserProfile />,
  },
  {
    path: '/savedevents/:mode?',
    element: <SavedEvents />,
  },
  {
    path: '/reset-password',
    element: <PasswordReset />,
  },
  {
    path: '/*',
    element: <Error />,
  },
]);

export default router;
