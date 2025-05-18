import DirectButton from '../minor/DirectButton';
import { useContext } from 'react';
import { IdContext } from '../../config/IdContext';
import { useLocation } from 'react-router';

export default function NavBar() {
  let pathname: string = useLocation().pathname;
  const { id } = useContext(IdContext);
  if (id) {
    return (
      <div className="flex justify-between border-b-3 input">
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
    );
  } else {
    return (
      <div className="flex justify-between border-b-5 input">
        <DirectButton text={'LIGHT MODE'} route={'/'} />
        <DirectButton text={'LOGIN'} route={'/login'} />
      </div>
    );
  }
}
