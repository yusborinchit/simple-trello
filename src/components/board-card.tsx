"use client";

import { type Task } from "@/types";
import { type DragEvent, type FormEvent } from "react";
import TaskForm from "./task-form";
import TaskList from "./task-list";

interface Props {
  id: string;
  title: string;
  tasks: Task[];
  addTask: (boardId: string, task: Task) => void;
  moveTask: (targetBoardId: string, boardId: string, taskId: string) => void;
}

export default function BoardCard({
  id,
  title,
  tasks,
  addTask,
  moveTask,
}: Readonly<Props>) {
  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const taskTitle = `${formData.get("task")}`;
    if (!taskTitle) return;

    addTask(id, {
      id: crypto.randomUUID(),
      title: taskTitle,
    });

    form.reset();
  }

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
      <header>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </header>
      <p className="mt-2 text-sm text-gray-500">Tasks: {tasks.length}</p>
      <TaskList boardId={id} tasks={tasks} />
      <footer>
        <TaskForm handleAddTask={handleAddTask} />
      </footer>
    </section>
  );
}
