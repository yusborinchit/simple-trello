import { type DragEvent } from "react";

export function useDragAndDrop() {
  function dragStart(taskId: string, boardId: string) {
    return (event: DragEvent<HTMLLIElement>) => {
      const { dataTransfer } = event;
      dataTransfer.setData("taskId", taskId);
      dataTransfer.setData("boardId", boardId);
    };
  }

  function dragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function dragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function drop(onDrop: (...props: any) => void) {
    return (event: DragEvent<HTMLDivElement>) => {
      const { currentTarget, dataTransfer } = event;

      const targetBoardId = currentTarget.dataset.boardId;
      const taskId = dataTransfer.getData("taskId");
      const boardId = dataTransfer.getData("boardId");

      if (!targetBoardId || !taskId || !boardId) return;

      onDrop(targetBoardId, boardId, taskId);
    };
  }

  return { dragStart, dragEnter, dragOver, drop };
}
