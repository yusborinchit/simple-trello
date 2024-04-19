import { type Task } from "@/types";
import TaskCard from "./task-card";

interface Props {
  boardId: string;
  tasks: Task[];
}

export default function TaskList({ boardId, tasks }: Readonly<Props>) {
  return (
    <ul className="mt-1 flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          boardId={boardId}
          title={task.title}
        />
      ))}
    </ul>
  );
}
