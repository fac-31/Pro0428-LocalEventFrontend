//component for events data
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Wrench, Trash2 } from 'lucide-react';

import { useAuth } from '../../auth/useAuth';
import { deleteEventById } from '../../api/services/events.ts';
import { FullEvent } from 'models/event.model.ts';

import DirectButton from '../minor/DirectButton';

import SaveEventButton from '../minor/saveEventButton';

type Props = FullEvent & {
  isSaved: boolean;
  handleSaveToggle: (id: string) => void;
};

export default function Events(props: Props) {
  const { user } = useAuth();
  const admin = user && user.role === 'admin';

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    // TODO handle response from API for fails
    if (info._id !== undefined) {
      await deleteEventById(info._id.toString());

      navigate(0); // refreshes the current page were in, as we dont want to show deleted event
    }

    setOpen(false);
  };

  return (
    <div
      className="p-4 m-4 border solid white rounded w-[50%]"
      data-id={props._id}
    >
      <div>
        <div className="flex">
        <div className="w-full">
          <h1 className="text-xl font-bold">{props.name}</h1>
            <SaveEventButton
          eventId={String(props._id)}
          isSaved={props.isSaved}
          handleSaveToggle={props.handleSaveToggle}
        />
      </div>
      <p>{props.location}</p>
          <p>{props.distance}km away</p>
          <p>{new Date(props.date).toLocaleDateString()}</p>
        </div>
        {admin && (
          <div className="flex flex-col gap-2">
            <Link
              to={'/events/edit/' + info._id}
              className={`p-2 rounded-md outline-2 outline-primary hover:bg-input-bg`}
            >
              <Wrench />
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-md outline-2 outline-primary hover:bg-input-bg"
            >
              <Trash2 />
            </button>
          </div>
        )}
      </div>
      <p>{props.description}</p>
      <p>Price: {props.price}</p>
      <p>More info can be found here - {props.url}</p>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
        >
          <div className="popup p-4">
            <h4 className="mb-5">
              Are you sure you want to delete <b>{info.name}</b>?
            </h4>

            <div className="flex justify-center items-center gap-5">
              <DirectButton onClick={handleDelete} text="Yes" />

              <DirectButton onClick={() => setOpen(false)} text="No" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
