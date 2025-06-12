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
    <button
      onClick={() => handleSaveToggle(eventId)}
      className="flex items-top"
    >
      <Heart color={isSaved ? 'red' : 'grey'} />
    </button>
  );
}
