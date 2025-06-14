import { useRef, useEffect, useState } from 'react';
import { Music, Bike, HelpingHand, Ellipsis } from 'lucide-react';
import { MenuButton } from './MenuButton';
import { ModeButtons } from './ModeButtons';
import { Filters } from './filters';
import { Mode, ModeId, FiltersProps } from './types';

const modes: Mode[] = [
  { id: 'music', label: 'MUSIC', icon: Music },
  { id: 'charity', label: 'CHARITY', icon: HelpingHand },
  { id: 'sports', label: 'SPORTS', icon: Bike },
  { id: 'other', label: 'OTHER', icon: Ellipsis },
];

const SideBar = ({ filters, updateFilters }: FiltersProps) => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleModeSelect = (id: ModeId) => {
    updateFilters({
      selectedModes: filters.selectedModes.includes(id)
        ? filters.selectedModes.filter((item) => item !== id)
        : [...filters.selectedModes, id],
    });
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
      style={{ backgroundColor: 'var(--color-accent)' }}
      className={`fixed top-9 left-0 z-5 p-2 h-full flex flex-col items-start border-text border-r-2 transition-all duration-100 ${
        open ? 'w-72' : 'w-15'
      }`}
    >
      <MenuButton setOpen={setOpen} open={open} />
      <ModeButtons
        modes={modes}
        selectedModes={filters.selectedModes}
        toggleModeSelect={toggleModeSelect}
        open={open}
      />
      {open && (
        <Filters
          className="flex flex-col px-2 gap-6 animate-fade-in animate-fade-in-left"
          filters={filters}
          updateFilters={updateFilters}
        />
      )}
    </div>
  );
};

export default SideBar;
