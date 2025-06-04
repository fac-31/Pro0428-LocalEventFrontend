import NavBar from '../components/major/nav-bar';
import { useAuth } from '../auth/useAuth';

export default function UserProfile() {
  const { user, loading } = useAuth();

  return (
    <div>
      <NavBar />

      {loading && <p>Loading...</p>}

      {!loading && user && (
        <div>
          <h1>Username: {user.username}</h1>
          <h1>Email: {user.email}</h1>
          <h1>
            Name: {user.name_first} {user.name_last}
          </h1>
          <h1>Role: {user.role}</h1>
          <h1>Saved Events: {user.saved_events}</h1>
        </div>
      )}

      {!loading && !user && <p>User not logged in.</p>}
    </div>
  );
}
