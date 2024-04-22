"use client";

import { type DragEvent } from "react";

interface Props {
  title: string;
  handleDragStart: (event: DragEvent<HTMLLIElement>) => void;
}

export default function TaskCard({ title, handleDragStart }: Readonly<Props>) {
  return (
    <li
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab rounded bg-white px-4 py-2 shadow"
    >
      {title}
    </li>
  );
}
