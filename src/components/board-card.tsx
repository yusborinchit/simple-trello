"use client";

import { type Task } from "@/types";
import { FormEvent, useState } from "react";
import TaskCard from "./task-card";
import TaskForm from "./task-form";

const DEFAULT_TASKS: Task[] = [
  { id: crypto.randomUUID(), title: "Take the trash out" },
  {
    id: crypto.randomUUID(),
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do magna",
  },
  { id: crypto.randomUUID(), title: "Buy groceries: milk, eggs, bread" },
];

export default function BoardCard() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const taskTitle = `${formData.get("task")}`;
    if (!taskTitle) return;

    const task = {
      id: crypto.randomUUID(),
      title: taskTitle,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    form.reset();
  }

  return (
    <section className="max-w-xs rounded bg-gray-200 p-4">
      <header>
        <h2 className="text-2xl font-semibold text-gray-800">Hello World</h2>
      </header>
      <div className="mt-2">
        <p className="text-sm text-gray-500">Tasks: 3</p>
        <ul className="mt-1 flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </ul>
        <TaskForm handleAddTask={handleAddTask} />
      </div>
    </section>
  );
}
