import { type Board } from "@/types";
import { createSupabaseClient } from "../supabase/client";

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
