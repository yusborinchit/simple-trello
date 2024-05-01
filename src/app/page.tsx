import SignInButton from "@/components/auth/sign-in-button";
import SignOutButton from "@/components/auth/sign-out-button";
import BoardManager from "@/components/board/board-manager";
import PlaceholderAvatarIcon from "@/components/icons/placeholder-avatar-icon";
import { createSupabaseServer } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabaseClient = createSupabaseServer();

  const { data } = await supabaseClient.auth.getUser();
  const { user } = data;

  return (
    <main className="flex flex-col">
      <header className="fixed left-4 right-4 top-4 flex items-center gap-4 rounded bg-white px-4 py-3 shadow">
        <div className="flex items-center gap-4">
          {user ? (
            <Image
              src={user.user_metadata.avatar_url}
              width={40}
              height={40}
              alt={`${user.user_metadata.user_name} profile photo`}
              className="rounded-full"
            />
          ) : (
            <PlaceholderAvatarIcon />
          )}
          {user ? (
            <p className="hidden sm:inline">
              Welcome back! <strong>{user.user_metadata.user_name}</strong>
            </p>
          ) : (
            <p className="hidden sm:inline">
              Hello there, please <strong>Sign In</strong>!
            </p>
          )}
        </div>
        {user ? <SignOutButton /> : <SignInButton />}
      </header>
      <div className="mt-[calc(64px+16px)] grid">
        <BoardManager />
      </div>
    </main>
  );
}
