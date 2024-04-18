interface Props {
  id: string;
  title: string;
}

export default function TaskCard({ id, title }: Readonly<Props>) {
  return (
    <li className="cursor-grab rounded bg-white px-4 py-2 shadow">{title}</li>
  );
}
