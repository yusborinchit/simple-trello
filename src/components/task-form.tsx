"use client";

import { useId, type FormEvent } from "react";

interface Props {
  handleAddTask: (event: FormEvent<HTMLFormElement>) => void;
}

export default function TaskForm({ handleAddTask }: Readonly<Props>) {
  const id = useId();

  return (
    <form
      onSubmit={handleAddTask}
      className="mt-12 flex items-center rounded bg-gray-300 shadow shadow-gray-800/30"
    >
      <input
        id={id}
        name="task"
        type="text"
        placeholder="Type here your next task"
        className="min-w-0 flex-1 rounded bg-transparent px-4 py-2 text-gray-600 placeholder:text-gray-400"
      />
      <button
        aria-label="Add Task"
        className="grid h-[42px] place-items-center px-4 font-mono text-2xl leading-[1] text-gray-400 transition-colors hover:text-gray-600"
      >
        +
      </button>
      {/* Only SR */}
      <label htmlFor={id} className="sr-only">
        New Task:
      </label>
    </form>
  );
}
