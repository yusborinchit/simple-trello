"use client";

import { type Task } from "@/types";
import { type DragEvent } from "react";
import AddTaskForm from "./add-task-form";
import BoardHeader from "./board-header";
import TaskList from "./task-list";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  changeTitle: (boardId: string, title: string) => void;
  addTask: (boardId: string, task: Task) => void;
  moveTask: (targetBoardId: string, boardId: string, taskId: string) => void;
}

export default function BoardCard({
  id,
  title,
  tasks,
  changeTitle,
  addTask,
  moveTask,
}: Readonly<Props>) {
  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    const { currentTarget, dataTransfer } = event;

    const targetBoardId = currentTarget.dataset.boardId;
    const taskId = dataTransfer.getData("taskId");
    const boardId = dataTransfer.getData("boardId");

    if (!targetBoardId || !taskId || !boardId) return;

    moveTask(targetBoardId, boardId, taskId);
  }

  return (
    <section
      data-board-id={id}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="group h-min max-w-xs rounded bg-gray-200 p-4 data-[is-over=true]:bg-blue-200"
    >
      <BoardHeader boardId={id} title={title} changeTitle={changeTitle} />
      <p className="mt-2 text-sm text-gray-500">Tasks: {tasks.length}</p>
      <TaskList boardId={id} tasks={tasks} />
      <AddTaskForm boardId={id} addTask={addTask} />
    </section>
  );
}
