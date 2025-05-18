import { Link } from 'react-router';

interface DirectButtonProps {
  text: string;
  route: string;
  pathname?: string;
}

export default function DirectButton({
  text,
  route,
  pathname,
}: DirectButtonProps) {
  return (
    <Link
      to={route}
      className={
        pathname === route
          ? 'text-xl p-1 pl-5 pr-5 bg-[rgba(225,210,229,0.1)]'
          : 'text-xl p-1 pl-5 pr-5 hover:bg-[rgba(225,210,229,0.1)]'
      }
    >
      {text}
    </Link>
  );
}
