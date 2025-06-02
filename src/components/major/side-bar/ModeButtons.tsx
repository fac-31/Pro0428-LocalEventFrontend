import { ModeButtonsProps } from './types';

export const ModeButtons = ({
  modes,
  selectedModes,
  toggleModeSelect,
  open,
}: ModeButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {modes.map(({ id, label, icon: Icon }) => {
        const isSelected = selectedModes.includes(id);
        return (
          <button
            key={id}
            onClick={() => toggleModeSelect(id)}
            title={!open ? label : undefined}
            className={`flex items-center justify-center gap-2 p-2 w-full rounded-md 
                ${isSelected ? 'outline-2 outline-primary' : ''}
                hover:bg-input-bg`}
          >
            {open ? (
              <span className="text-xl text-center w-full gap-0.5">
                {label}
              </span>
            ) : (
              <Icon className="mx-auto" />
            )}
          </button>
        );
      })}
    </div>
  );
};
