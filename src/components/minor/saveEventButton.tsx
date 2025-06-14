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
  return (
    <button
      onClick={() => handleSaveToggle(eventId)}
      className="transition-transform duration-200 hover:scale-110"
    >
      <Heart style={{ color: isSaved ? 'var(--color-error)' : 'grey' }} />
    </button>
  );
}
