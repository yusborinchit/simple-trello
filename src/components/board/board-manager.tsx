"use client";

import { useBoard } from "@/hooks/useBoard";
import BoardCard from "./board-card";

export default function BoardManager() {
  const { boards, addBoard, changeTitle, addTask, moveTask } = useBoard();

  return (
    <div className="grid auto-cols-max grid-flow-col gap-4 p-4">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.title}
          tasks={board.tasks}
          changeTitle={changeTitle}
          addTask={addTask}
          moveTask={moveTask}
        />
      ))}
      <button
        onClick={addBoard}
        className="h-fit min-w-fit flex-1 rounded border-[3px] border-dashed border-white bg-gray-100/0 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/20"
      >
        Create New Board
      </button>
    </div>
  );
}
