import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function saveEventButton(id) => {
  const [active, setActive] = useState(false);

  const handleClick = (id) => {
    setActive(!active);
    
  }
  return (
    <button onClick={}>
      <Heart color={active ? 'red' : ''} />;
    </button>
  );
};
