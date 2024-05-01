"use client";

import { type Task } from "@/types";
import { useId, type FormEvent } from "react";

interface Props {
  boardId: string;
  addTask: (boardId: string, task: Task) => void;
}

export default function AddTaskForm({ boardId, addTask }: Readonly<Props>) {
  const inputId = useId();

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const taskTitle = `${formData.get("task")}`;
    if (!taskTitle) return;

    addTask(boardId, {
      id: crypto.randomUUID(),
      title: taskTitle,
    });

    form.reset();
  }

  return (
    <footer>
      <form
        onSubmit={handleAddTask}
        className="mt-12 flex items-center rounded bg-gray-300 shadow shadow-gray-800/30"
      >
        <input
          id={inputId}
          name="task"
          type="text"
          placeholder="Type here..."
          className="min-w-0 flex-1 rounded bg-transparent px-4 py-2 text-gray-600 placeholder:text-gray-400"
        />
        <button
          aria-label="Add Task"
          className="grid h-[42px] place-items-center px-4 font-mono text-2xl leading-[1] text-gray-400 transition-colors hover:text-gray-600"
        >
          +
        </button>
        <label htmlFor={inputId} className="sr-only">
          New Task:
        </label>
      </form>
    </footer>
  );
}
