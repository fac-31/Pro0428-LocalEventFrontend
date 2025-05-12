import { Link, useParams } from 'react-router';

export default function SavedEvents() {
  const params = useParams<{ filter: string }>();
  const heading: string = 'Saved Events';

  if (params.filter) {
    return (
      <div>
        <h1>
          {heading} - {params.filter}
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
