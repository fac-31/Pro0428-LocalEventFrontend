import { Link } from 'react-router';

import '../styles/home.css';

export default function PublicHome() {
  const heading: string = 'Homepage';
  return (
    <div>
      <h1>{heading}</h1>
      <div className="linklist font-bold underline">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/userhome/all">User Homepage</Link>
        <Link to="/userhome/saved">User Saved</Link>
        <Link to="/userprofile">User Profile</Link>
        <Link to="/error">Error Page</Link>
      </div>
    </div>
  );
}
