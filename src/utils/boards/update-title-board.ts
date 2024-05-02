import { createSupabaseClient } from "../supabase/client";

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
