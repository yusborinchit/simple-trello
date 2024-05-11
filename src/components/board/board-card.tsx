"use client";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { type Task } from "@/types";
import { motion } from "framer-motion";
import AddTaskForm from "./add-task-form";
import BoardHeader from "./board-header";
import TaskCard from "./task-card";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  changeTitle: (boardId: string, title: string) => void;
  addTask: (boardId: string, task: Task) => void;
  moveTask: (targetBoardId: string, boardId: string, taskId: string) => void;
  removeBoard: (boardId: string) => void;
}

export default function BoardCard({
  id,
  title,
  tasks,
  changeTitle,
  addTask,
  moveTask,
  removeBoard,
}: Readonly<Props>) {
  const { dragStart, dragEnter, dragOver, drop } = useDragAndDrop();

  return (
    <motion.section
      data-board-id={id}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDrop={drop(moveTask)}
      key={id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-min w-[270px] flex-col rounded bg-gray-200 p-4"
    >
      <BoardHeader boardId={id} title={title} changeTitle={changeTitle} />
      <motion.p layout={"position"} className="mt-2 text-sm text-gray-500">
        Tasks: {tasks.length}
      </motion.p>
      <ul className="mt-1 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            handleDragStart={dragStart(task.id, id)}
          />
        ))}
      </ul>
      <motion.div layout>
        <AddTaskForm boardId={id} addTask={addTask} />
        <button
          onClick={() => removeBoard(id)}
          className="ml-auto mt-2 text-sm text-red-500 underline"
        >
          Delete Board
        </button>
      </motion.div>
    </motion.section>
  );
}
