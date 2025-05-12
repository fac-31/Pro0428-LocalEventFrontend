import { Link, useParams } from 'react-router';

export default function UserHome() {
  const params = useParams<{ mode: string }>();
  const heading: string = 'UserHome';

  if (params.mode) {
    return (
      <div>
        <h1>
          {heading} - {params.mode}
        </h1>
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
