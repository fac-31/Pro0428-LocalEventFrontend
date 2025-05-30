import { Menu } from 'lucide-react';
import { MenuButtonProps } from './types';

export const MenuButton = ({ setOpen, open }: MenuButtonProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="self-center p-2 hover:bg-input-bg rounded-md"
      title="Toggle Menu"
    >
      <Menu />
    </button>
  );
};
