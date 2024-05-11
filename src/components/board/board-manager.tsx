"use client";

import { useBoard } from "@/hooks/useBoard";
import { AnimatePresence } from "framer-motion";
import BoardCardSkeleton from "../skeletons/board-card-skeleton";
import BoardCard from "./board-card";

export default function BoardManager() {
  const { boards, isLoading, ...actions } = useBoard();
  const { addBoard, changeTitle, addTask, moveTask, removeBoard } = actions;

  return (
    <>
      {isLoading ? (
        <div className="grid auto-cols-max grid-flow-col gap-4 p-4">
          <BoardCardSkeleton tasks={2} />
          <BoardCardSkeleton tasks={4} />
          <BoardCardSkeleton tasks={3} />
          <BoardCardSkeleton tasks={6} />
        </div>
      ) : (
        <div className="grid auto-cols-max grid-flow-col gap-4 p-4">
          <AnimatePresence>
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                id={board.id}
                title={board.title}
                tasks={board.tasks}
                changeTitle={changeTitle}
                addTask={addTask}
                moveTask={moveTask}
                removeBoard={removeBoard}
              />
            ))}
          </AnimatePresence>
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
