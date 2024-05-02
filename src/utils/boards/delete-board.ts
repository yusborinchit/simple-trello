import { createSupabaseClient } from "../supabase/client";

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
