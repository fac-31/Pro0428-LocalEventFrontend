import DirectButton from '../minor/DirectButton';
import ThemeButton from '../minor/ThemeButton';
import { useState } from 'react';
//import { TokenContext } from '../../config/TokenContext';
import { useLocation, useNavigate } from 'react-router';
import '../../styles/navbar.css';
import { useAuth } from '../../auth/useAuth';
import { logout } from '../../api/services/auth';

export default function NavBar() {
  const { user } = useAuth();
  const pathname = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogout = async () => {
    try {
      await logout();
      await refreshUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="border-b-3 input">
      {/* Desktop navbar */}
      <div className="hidden md:flex justify-between items-center">
        <ThemeButton />

        <div className="flex justify-between gap-4">
          <DirectButton
            text={'HOMEPAGE'}
            route={'/userhome'}
            pathname={pathname}
          />

          {user ? (
            <>
              <DirectButton
                text={'MY EVENTS'}
                route={'/savedevents'}
                pathname={pathname}
              />
              <DirectButton
                text={'ACCOUNT'}
                route={'/userprofile'}
                pathname={pathname}
              />
              <DirectButton
                text={'LOGOUT'}
                onClick={handleLogout}
                pathname={pathname}
              />
            </>
          ) : (
            <DirectButton text={'LOGIN'} route={'/login'} pathname={pathname} />
          )}
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden">
        <div className="flex justify-between items-center">
          <ThemeButton />
          <button
            onClick={toggleMenu}
            className="text-l p-1 pl-5 pr-5 hover:bg-[rgba(225,210,229,0.1)]"
          >
            MENU
          </button>
        </div>

        <div
          className={`dropdown-content ${
            isMenuOpen ? 'dropdown-show' : ''
          } flex flex-col w-full`}
        >
          <DirectButton
            text={'HOMEPAGE'}
            route={user ? '/userhome' : '/'}
            pathname={pathname}
          />

          {user ? (
            <>
              <DirectButton
                text={'MY-EVENTS'}
                route={'/savedevents'}
                pathname={pathname}
              />
              <DirectButton
                text={'ACCOUNT'}
                route={'/userprofile'}
                pathname={pathname}
              />
              <DirectButton text={'LOGOUT'} onClick={handleLogout} />
            </>
          ) : (
            <DirectButton text={'LOGIN'} route={'/login'} pathname={pathname} />
          )}
        </div>
      </div>
    </div>
  );
}
