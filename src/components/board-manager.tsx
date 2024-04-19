"use client";

import { type Board, type Task } from "@/types";
import { useEffect, useState } from "react";
import BoardCard from "./board-card";

const DEFAULT_BOARDS: Board[] = [
  {
    id: crypto.randomUUID(),
    title: "Board 1",
    tasks: [
      { id: crypto.randomUUID(), title: "Task 1" },
      { id: crypto.randomUUID(), title: "Task 2" },
      { id: crypto.randomUUID(), title: "Task 3" },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Board 2",
    tasks: [
      { id: crypto.randomUUID(), title: "Task 4" },
      { id: crypto.randomUUID(), title: "Task 5" },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Board 3",
    tasks: [
      { id: crypto.randomUUID(), title: "Task 6" },
      { id: crypto.randomUUID(), title: "Task 7" },
      { id: crypto.randomUUID(), title: "Task 8" },
      { id: crypto.randomUUID(), title: "Task 9" },
    ],
  },
];

export default function BoardManager() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => setBoards(DEFAULT_BOARDS), []);

  function addTask(boardId: string, task: Task) {
    const boardIdx = boards.findIndex(({ id }) => id === boardId);

    if (boardIdx === -1) return;

    const draft = [...boards];

    const board = draft[boardIdx];
    board.tasks.push(task);

    setBoards(draft);
  }

  function moveTask(targetBoardId: string, boardId: string, taskId: string) {
    const targetBoardIndex = boards.findIndex(({ id }) => id === targetBoardId);
    const boardIndex = boards.findIndex(({ id }) => id === boardId);

    if (targetBoardIndex === -1 || boardIndex === -1) return;

    const taskIndex = boards[boardIndex].tasks.findIndex(
      ({ id }) => id === taskId
    );

    if (taskIndex === -1) return;

    const draft = [...boards];

    const board = draft[boardIndex];
    const [task] = board.tasks.splice(taskIndex, 1);
    const targetBoard = draft[targetBoardIndex];
    targetBoard.tasks.push(task);

    setBoards(draft);
  }

  return (
    <>
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.title}
          tasks={board.tasks}
          addTask={addTask}
          moveTask={moveTask}
        />
      ))}
    </>
  );
}
