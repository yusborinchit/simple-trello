import { Board } from "@/types";
import { createSupabaseClient } from "../supabase/client";

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
    .eq("user_id", user.id);

  if (boardError) {
    console.error(boardError.message);
    return;
  }

  return boardData as Board[];
}
