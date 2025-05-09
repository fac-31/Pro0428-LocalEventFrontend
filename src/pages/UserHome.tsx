import { Link, useParams } from 'react-router';

export default function UserHome() {
  const params = useParams<{ saved: string }>();
  const heading: string = 'UserHome';

  if (params.saved === 'all') {
    return (
      <div>
        <h1>{heading} - All</h1>
        <Link to="/">Back to Homepage</Link>
      </div>
    );
  } else if (params.saved === 'saved') {
    return (
      <div>
        <h1>{heading} - Saved</h1>
        <Link to="/">Back to Homepage</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{heading}</h1>
        <Link to="/">Back to Homepage</Link>
      </div>
    );
  }
}
