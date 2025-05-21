import { useState } from 'react';
import { Music, Bike, HelpingHand, Ellipsis } from 'lucide-react';
import { MenuButton } from './MenuButton';
import { ModeButtons } from './ModeButtons';
import { Filters } from './filters';

import { SideBarProps, ModeId, Mode } from './types';

const modes: Mode[] = [
  { id: 'music', label: 'MUSIC', icon: Music },
  { id: 'charity', label: 'CHARITY', icon: HelpingHand },
  { id: 'sports', label: 'SPORTS', icon: Bike },
  { id: 'other', label: 'OTHER', icon: Ellipsis },
];

const SideBar = ({
  selectedModes,
  setSelectedModes,
  search,
  setSearch,
  price,
  setPrice,
  distance,
  setDistance,
  date,
  setdate,
}: SideBarProps) => {
  const [open, setOpen] = useState(false);

  const toggleModeSelect = (id: ModeId) => {
    setSelectedModes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div
      className={`sticky top-10 p-2 flex flex-col items-start bg-accent  ${
        open ? 'w-66' : 'w-15'
      }`}
    >
      <MenuButton setOpen={setOpen} open={open} />
      <ModeButtons
        modes={modes}
        selectedModes={selectedModes}
        toggleModeSelect={toggleModeSelect}
        open={open}
      />
      {open && (
        <Filters
          className="flex flex-col px-2 gap-6"
          search={search}
          setSearch={setSearch}
          price={price}
          setPrice={setPrice}
          distance={distance}
          setDistance={setDistance}
          date={date}
          setdate={setdate}
        />
      )}
    </div>
  );
};

export default SideBar;
