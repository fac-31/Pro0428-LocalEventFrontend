import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Wrench,
  Trash2,
  MapPin,
  Music,
  Bike,
  HelpingHand,
  Ellipsis,
} from 'lucide-react';

import { useAuth } from '../../auth/useAuth';
import { deleteEventById } from '../../api/services/events.ts';
import { FullEvent } from 'models/event.model.ts';

import DirectButton from '../minor/DirectButton';
import SaveEventButton from '../minor/saveEventButton';

type Props = FullEvent & {
  isSaved: boolean;
  handleSaveToggle: (id: string) => void;
};

type ModeKey = 'music' | 'charity' | 'sports' | 'other';

const modeIconMap: Record<ModeKey, typeof Music> = {
  music: Music,
  charity: HelpingHand,
  sports: Bike,
  other: Ellipsis,
};

export default function Events(props: Props) {
  const { user } = useAuth();
  const admin = user && user.role === 'admin';

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mode = props.mode.toLowerCase() as ModeKey;
  const IconComponent = modeIconMap[mode] || Ellipsis;

  const handleDelete = async () => {
    if (props._id !== undefined) {
      await deleteEventById(props._id.toString());
      navigate(0);
    }
    setOpen(false);
  };

  return (
    <div
      className="p-4 m-3 rounded w-fit h-fit"
      style={{
        border: `2px solid var(--color-border-${props.mode.toLowerCase()})`,
      }}
    >
      <div className="relative pr-9">
        <div className="absolute top-1 right-1 flex flex-col items-center space-y-3">
          <SaveEventButton
            eventId={String(props._id)}
            isSaved={props.isSaved}
            handleSaveToggle={props.handleSaveToggle}
          />
          <IconComponent size={18} />
          <p className="text-xs sm:text-sm">
            {props.price === 0 ? 'Free!' : `£${props.price}`}
          </p>
        </div>

        <div className="max-w-[200px] sm:max-w-[450px]">
          <h1 className="text-base sm:text-xl font-bold">{props.name}</h1>

          <h2 className="text-sm sm:text-2xl">
            {new Date(props.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h2>

          <p className="mt-1 mb-2 font-medium text-sm sm:text-base mr-5">
            {props.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 mb-2 truncate text-xs sm:text-sm">
            <MapPin size={16} className="shrink-0" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline truncate"
            >
              {props.location}
            </a>
            <span className="shrink-0">({props.distance} km)</span>
          </div>

          {/* External link */}
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xs sm:text-sm"
          >
            More info here
          </a>
        </div>

        {admin && (
          <div className="flex flex-col gap-1 mt-3">
            <Link
              to={'/events/edit/' + props._id}
              className="p-1 sm:p-2 rounded-md outline-2 outline-primary hover:bg-input-bg"
            >
              <Wrench />
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="p-1 sm:p-2 rounded-md outline-2 outline-primary hover:bg-input-bg"
            >
              <Trash2 />
            </button>
          </div>
        )}

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <div className="popup p-4">
              <h4 className="mb-5 text-xs sm:text-base">
                Are you sure you want to delete <b>{props.name}</b>?
              </h4>
              <div className="flex justify-center items-center gap-4">
                <DirectButton onClick={handleDelete} text="Yes" />
                <DirectButton onClick={() => setOpen(false)} text="No" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
