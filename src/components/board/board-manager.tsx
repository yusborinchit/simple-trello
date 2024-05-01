"use client";

import { useBoard } from "@/hooks/useBoard";
import BoardCardSkeleton from "../skeletons/board-card-skeleton";
import BoardCard from "./board-card";

export default function BoardManager() {
  const { boards, isLoading, ...actions } = useBoard();
  const { addBoard, changeTitle, addTask, moveTask } = actions;

  return (
    <>
      {isLoading ? (
        <div className="grid auto-cols-max grid-flow-col gap-4 p-4">
          {boards.map((board) => (
            <BoardCardSkeleton
              key={board.id}
              title={board.title}
              tasks={board.tasks}
            />
          ))}
        </div>
      ) : (
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
            className="h-fit min-w-fit flex-1 rounded border-2 border-dashed border-white bg-gray-100/0 px-4 py-3 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
          >
            Create New Board
          </button>
        </div>
      )}
    </>
  );
}
