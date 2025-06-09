import { useTheme } from '../../hooks/useTheme';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className=" text-l sm:text-xl p-1 pl-5 pr-5 hover:bg-[rgba(225,210,229,0.1)]"
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'} MODE
    </button>
  );
}
