import { useRef, useEffect, useState } from 'react';
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleModeSelect = (id: ModeId) => {
    setSelectedModes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-9 p-2 h-full flex flex-col items-start border-text border-r-2 bg-accent transition-all duration-300 ease-in-out ${
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
          className="flex flex-col px-2 gap-6 animate-fade-in animate-fade-in-left"
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
