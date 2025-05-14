export default function event(info: object) {
  return (
    <h2>
      {info._id} - {info.name}
    </h2>
  );
}
