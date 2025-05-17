import { Link } from 'react-router';
import NavBar from '../components/major/nav-bar';

export default function UserProfile() {
  const heading: string = 'UserProfile';
  return (
    <div>
      <NavBar />
      <h1>{heading}</h1>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
