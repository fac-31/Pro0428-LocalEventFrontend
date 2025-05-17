import { Link } from 'react-router';

interface DirectButtonProps {
  text: string;
  route: string;
}

export default function DirectButton({ text, route }: DirectButtonProps) {
  return (
    <>
      <Link
        to={route}
        className="text-xl p-1 ml-2 mr-2 hover:bg-[rgba(225,210,229,0.1)]"
      >
        {text}
      </Link>
    </>
  );
}
