import { createSupabaseClient } from "../supabase/client";

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
