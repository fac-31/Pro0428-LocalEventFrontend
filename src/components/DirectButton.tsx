import { Link } from 'react-router';

interface DirectButtonProps {
  text: string;
  route: string;
}

export default function DirectButton({ text, route }: DirectButtonProps) {
  return (
    <>
      <Link to={route} className="text-xl p-1 ml-2 mr-2 hover:bg-[#E1D2E5]">
        {text}
      </Link>
    </>
  );
}
