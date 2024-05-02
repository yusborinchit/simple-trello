import { type Board, type Task } from "@/types";
import { deleteBoard } from "@/utils/boards/delete-board";
import { fetchBoards } from "@/utils/boards/fetch-boards";
import { insertBoard } from "@/utils/boards/insert-board";
import { updateBoardTitle } from "@/utils/boards/update-title-board";
import { insertTask } from "@/utils/tasks/insert-task";
import { updateTaskBoard } from "@/utils/tasks/update-task-board";
import { useEffect, useState } from "react";

const DEFAULT_BOARD_TITLE = "Board Title";

const DEFAULT_BOARDS = [
  {
    id: crypto.randomUUID(),
    title: "To Do",
    tasks: [
      { id: crypto.randomUUID(), title: "Follow me on Github." },
      { id: crypto.randomUUID(), title: "Enjoy!" },
    ],
  },
];

export function useBoard() {
  const [isLoading, setIsLoading] = useState(true);
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    fetchBoards().then((boards) => {
      setBoards(boards ?? DEFAULT_BOARDS);
      setIsLoading(false);
    });
  }, []);

  function addBoard() {
    const draft = [...boards];

    const board = {
      id: crypto.randomUUID(),
      title: DEFAULT_BOARD_TITLE,
      tasks: [],
    };
    draft.push(board);

    setBoards(draft);
    insertBoard(board);
  }

  function removeBoard(boardId: string) {
    const boardIdx = boards.findIndex(({ id }) => id === boardId);
    if (boardIdx === -1) return;

    const draft = [...boards];

    draft.splice(boardIdx, 1);

    setBoards(draft);
    deleteBoard(boardId);
  }

  function changeTitle(boardId: string, title: string) {
    const boardIdx = boards.findIndex(({ id }) => id === boardId);
    if (boardIdx === -1) return;

    const draft = [...boards];

    const board = draft[boardIdx];
    board.title = title;

    setBoards(draft);
    updateBoardTitle(boardId, title);
  }

  function addTask(boardId: string, task: Task) {
    const boardIdx = boards.findIndex(({ id }) => id === boardId);
    if (boardIdx === -1) return;

    const draft = [...boards];

    const board = draft[boardIdx];
    board.tasks.push(task);

    setBoards(draft);
    insertTask(boardId, task);
  }

  function moveTask(targetBoardId: string, boardId: string, taskId: string) {
    const targetBoardIdx = boards.findIndex(({ id }) => id === targetBoardId);
    if (targetBoardIdx === -1) return;

    const boardIdx = boards.findIndex(({ id }) => id === boardId);
    if (boardIdx === -1) return;

    const taskIdx = boards[boardIdx].tasks.findIndex(({ id }) => id === taskId);
    if (taskIdx === -1) return;

    const draft = [...boards];

    const board = draft[boardIdx];
    const [task] = board.tasks.splice(taskIdx, 1);
    const targetBoard = draft[targetBoardIdx];
    targetBoard.tasks.push(task);

    setBoards(draft);
    updateTaskBoard(targetBoardId, boardId, taskId);
  }

  return {
    boards,
    isLoading,
    addBoard,
    removeBoard,
    changeTitle,
    addTask,
    moveTask,
  };
}
