import { type Task } from "@/types";
import { createSupabaseClient } from "@/utils/supabase/client";

export async function insertTask(boardId: string, task: Task) {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on insert");
    return;
  }

  const { error: boardError } = await supabaseClient.from("tasks").insert({
    id: task.id,
    user_id: user.id,
    board_id: boardId,
    title: task.title,
  });

  if (boardError) {
    console.error(boardError.message);
    return;
  }
}

export async function updateTaskBoard(
  targetBoardId: string,
  boardId: string,
  taskId: string
) {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on update title");
    return;
  }

  const { error: boardError } = await supabaseClient
    .from("tasks")
    .update({
      board_id: targetBoardId,
    })
    .eq("id", taskId)
    .eq("board_id", boardId);

  if (boardError) {
    console.error(boardError.message);
    return;
  }
}
