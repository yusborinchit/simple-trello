"use client";

import { DragEvent } from "react";

interface Props {
  id: string;
  boardId: string;
  title: string;
}

export default function TaskCard({ id, boardId, title }: Readonly<Props>) {
  function handleDragStart(event: DragEvent<HTMLLIElement>) {
    const { dataTransfer } = event;

    dataTransfer.setData("taskId", id);
    dataTransfer.setData("boardId", boardId);
  }

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
