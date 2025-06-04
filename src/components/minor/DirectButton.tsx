import { Link } from 'react-router';

interface DirectButtonProps {
  text: string;
  route?: string;
  pathname?: string;
  onClick?: () => void;
}

export default function DirectButton({
  text,
  route,
  pathname,
  onClick,
}: DirectButtonProps) {
  const isActive = pathname === route;
  const className = isActive
    ? 'text-l sm:text-xl p-1 pl-5 pr-5 bg-[rgba(225,210,229,0.1)]'
    : 'text-l sm:text-xl p-1 pl-5 pr-5 hover:bg-[rgba(225,210,229,0.1)]';

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {text}
      </button>
    );
  }

  return (
    <Link to={route || '#'} className={className}>
      {text}
    </Link>
  );
}
