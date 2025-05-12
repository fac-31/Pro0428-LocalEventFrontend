import { Link, useParams } from 'react-router';

export default function SavedEvents() {
  const params = useParams<{ mode: string }>();
  const heading: string = 'Saved Events';

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
