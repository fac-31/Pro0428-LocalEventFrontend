//component for events data
import { Event } from 'models/event.model.ts';
import SaveEventButton from '../minor/saveEventButton';

type Props = Event & {
  isSaved: boolean;
  handleSaveToggle: (id: string) => void;
};
export default function Events(props: Props) {
  return (
    <div
      className="p-4 m-4 border solid white rounded w-[50%]"
      data-id={props._id}
    >
      <div>
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
      <p>{props.description}</p>
      <p>Price: {props.price}</p>
      <p>More info can be found here - {props.url}</p>
    </div>
  );
}
