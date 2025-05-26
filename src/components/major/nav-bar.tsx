import DirectButton from '../minor/DirectButton';
import { useContext, useState } from 'react';
import { TokenContext } from '../../config/TokenContext';
import { useLocation } from 'react-router';
import '../../styles/navbar.css';

export default function NavBar() {
  const pathname: string = useLocation().pathname;
  const { token } = useContext(TokenContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  if (token) {
    return (
      <div className="border-b-3 input">
        {/* Desktop navbar */}
        <div className="hidden sm:flex justify-between items-center">
          <DirectButton text={'LIGHT MODE'} route={'/userhome'} />
          <div className="flex justify-between">
            <DirectButton
              text={'HOMEPAGE'}
              route={'/userhome'}
              pathname={pathname}
            />
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
          </div>
        </div>
        {/* Mobile navbar */}
        <div className="sm:hidden">
          <div className="flex justify-between items-center">
            <DirectButton text={'LIGHT MODE'} route={'/userhome'} />
            <button
              onClick={toggleMenu}
              className="text-l p-1 pl-5 pr-5 hover:bg-[rgba(225,210,229,0.1)]"
            >
              MENU
            </button>
          </div>

          {/* Dropdown menu */}
          <div
            className={`dropdown-content ${isMenuOpen ? 'dropdown-show' : ''} flex flex-col w-full`}
          >
            <DirectButton
              text={'HOMEPAGE'}
              route={'/userhome'}
              pathname={pathname}
            />
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
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-b-3 input">
        {/* Navbar before login */}
        <div className=" flex justify-between items-center">
          <DirectButton text={'LIGHT MODE'} route={'/'} />
          <DirectButton text={'LOGIN'} route={'/login'} />
        </div>
      </div>
    );
  }
}
