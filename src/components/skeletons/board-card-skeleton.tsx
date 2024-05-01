import { type Task } from "@/types";

interface Props {
  title: string;
  tasks: Task[];
}

export default function BoardCardSkeleton({ title, tasks }: Readonly<Props>) {
  return (
    <div className="h-min w-[270px] animate-pulse rounded bg-gray-200 p-4 opacity-80 data-[is-over=true]:bg-blue-200">
      <div className="mb-4 h-2.5 w-36 rounded-full bg-gray-400"></div>
      <div className="mb-4 h-2.5 w-24 rounded-full bg-gray-300"></div>
      <div className="mt-1 flex flex-col gap-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="h-8 cursor-grab rounded bg-gray-300 px-4 py-2 shadow"
          />
        ))}
      </div>
      <div className="mt-12 flex h-[42px] rounded bg-gray-300"></div>
    </div>
  );
}
