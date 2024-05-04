import { type Board } from "@/types";
import { createSupabaseClient } from "@/utils/supabase/client";

export async function fetchBoards() {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on select");
    return;
  }

  const { data: boardData, error: boardError } = await supabaseClient
    .from("boards")
    .select("id, title, tasks(id, title)")
    .eq("user_id", user.id)
    .order("created_at");

  if (boardError) {
    console.error(boardError.message);
    return;
  }

  return boardData as Board[];
}

export async function insertBoard(board: Board) {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on insert");
    return;
  }

  const { error: boardError } = await supabaseClient.from("boards").insert({
    id: board.id,
    user_id: user.id,
    title: board.title,
  });

  if (boardError) {
    console.error(boardError.message);
    return;
  }
}

export async function deleteBoard(boardId: string) {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on insert");
    return;
  }

  const { error: boardError } = await supabaseClient
    .from("boards")
    .delete()
    .eq("id", boardId);

  if (boardError) {
    console.error(boardError.message);
    return;
  }
}

export async function updateBoardTitle(boardId: string, title: string) {
  const supabaseClient = createSupabaseClient();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  if (!user) {
    console.error("User not found on update title");
    return;
  }

  const { error: boardError } = await supabaseClient
    .from("boards")
    .update({
      title,
    })
    .eq("id", boardId);

  if (boardError) {
    console.error(boardError.message);
    return;
  }
}
