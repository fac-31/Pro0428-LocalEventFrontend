import DirectButton from '../minor/DirectButton';
let id: number = 5; //for when we have user auth in place

export default function NavBar() {
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

//note to self - data flow through front end, refactoring and file structure
