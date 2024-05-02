import { useState, type ChangeEvent, type FormEvent } from "react";
import CheckIcon from "../icons/check-icon";
import EditIcon from "../icons/edit-icon";

interface Props {
  boardId: string;
  title: string;
  changeTitle: (boardId: string, title: string) => void;
}

export default function BoardHeader({
  boardId,
  title,
  changeTitle,
}: Readonly<Props>) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  function handleChangeInputTitle(event: ChangeEvent<HTMLInputElement>) {
    const { currentTarget } = event;
    setInputTitle(currentTarget.value);
  }

  function handleChangeTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = inputTitle || "Board Title";
    changeTitle(boardId, title);

    setIsEditing(false);
  }

  return (
    <header className="flex gap-2">
      {isEditing ? (
        <form onSubmit={handleChangeTitle} className="flex gap-2">
          <input
            type="text"
            autoFocus={true}
            onChange={handleChangeInputTitle}
            value={inputTitle}
            placeholder="Board Title..."
            className="w-full min-w-0 border-b-[3px] border-dashed border-purple-500 bg-transparent text-2xl font-semibold outline-none placeholder:text-gray-400"
          />
          <button
            aria-label="Accept Changes"
            className="grid h-fit place-items-center rounded p-1 text-gray-500 transition-colors hover:bg-gray-300"
          >
            <CheckIcon width={24} height={24} />
          </button>
        </form>
      ) : (
        <>
          <h2 className="w-full break-all border-b-[3px] border-dashed border-transparent text-2xl font-semibold">
            {title}
          </h2>
          <button
            aria-label="Edit Board Title"
            onClick={() => setIsEditing(true)}
            className="grid h-fit place-items-center rounded p-1 text-gray-500 transition-colors hover:bg-gray-300"
          >
            <EditIcon width={24} height={24} />
          </button>
        </>
      )}
    </header>
  );
}
