import { createSupabaseServer } from "@/utils/supabase/server";
import SignInButton from "../auth/sign-in-button";
import SignOutButton from "../auth/sign-out-button";
import UserStatus from "./user-status";

export default async function Header() {
  const supabaseClient = createSupabaseServer();

  const { data: userData } = await supabaseClient.auth.getUser();
  const { user } = userData;

  return (
    <header className="fixed left-4 right-4 top-4 flex items-center gap-4 rounded bg-white px-4 py-3 shadow">
      <UserStatus user={user} />
      {user ? <SignOutButton /> : <SignInButton />}
    </header>
  );
}
