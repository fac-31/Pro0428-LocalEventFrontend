import { Link } from 'react-router';

export default function Login() {
  const heading: string = 'Login';
  return (
    <div>
      <h1>{heading}</h1>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
