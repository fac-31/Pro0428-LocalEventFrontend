import { Heart } from 'lucide-react';

type Props = {
  eventId: string;
  isSaved: boolean;
  handleSaveToggle: (id: string) => void;
};

export default function SaveEventButton({
  eventId,
  isSaved,
  handleSaveToggle,
}: Props) {
  console.log(isSaved);
  return (
    <button onClick={() => handleSaveToggle(eventId)}>
      <Heart color={isSaved ? 'red' : 'grey'} />
    </button>
  );
}
