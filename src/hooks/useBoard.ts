import { type Board, type Task } from "@/types";
import { useEffect, useState } from "react";

const DEFAULT_BOARD_TITLE = "Board Title";

const DEFAULT_BOARDS = [
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

export function useBoard() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    setBoards(DEFAULT_BOARDS);
  }, []);

  function addBoard() {
    const draft = [...boards];

    draft.push({
      id: crypto.randomUUID(),
      title: DEFAULT_BOARD_TITLE,
      tasks: [],
    });

    setBoards(draft);
  }

  function changeTitle(boardId: string, title: string) {
    const boardIdx = boards.findIndex(({ id }) => id === boardId);

    if (boardIdx === -1) return;

    const draft = [...boards];

    const board = draft[boardIdx];
    board.title = title;

    setBoards(draft);
  }

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

  return { boards, addBoard, changeTitle, addTask, moveTask };
}
