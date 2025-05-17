import DirectButton from '../minor/DirectButton';
import { useContext } from 'react';
import { IdContext } from '../../config/IdContext';

export default function NavBar() {
  const { id } = useContext(IdContext);
  if (id) {
    return (
      <div className="flex justify-between border-b-3 input">
        <DirectButton text={'LIGHT MODE'} route={'/userhome'} />
        <div className="flex justify-between">
          <DirectButton text={'HOMEPAGE'} route={'/userhome'} />
          <DirectButton text={'MY EVENTS'} route={'/savedevents'} />
          <DirectButton text={'ACCOUNT'} route={'/userprofile'} />
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
