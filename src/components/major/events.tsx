//component for events data
import { Link } from 'react-router';
import { Wrench } from 'lucide-react';

import { useAuth } from '../../auth/useAuth';
import { FullEvent } from 'models/event.model.ts';

export default function Events(info: FullEvent) {
  const { user } = useAuth();
  const admin = user && user.role === 'admin';

  return (
    <div className="p-4 m-4 border solid white rounded w-[50%]">
      <div className="flex">
        <h1 className="w-full text-xl font-bold">{info.name}</h1>
        {admin ? (
          <div>
            <Link
              to={'/events/edit/' + info._id}
              className={`flex gap-2 p-2 rounded-md outline-2 outline-primary hover:bg-input-bg`}
            >
              <Wrench />
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <p>{info.location}</p>
      <p>{info.distance}km away</p>
      <p>{new Date(info.date).toLocaleDateString()}</p>
      <p>{info.description}</p>
      <p>Price: {info.price}</p>
      <p>More info can be found here - {info.url}</p>
    </div>
  );
}
