import { Link } from 'react-router';

export default function UserProfile() {
  const heading: string = 'UserProfile';
  return (
    <div>
      <h1>{heading}</h1>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
