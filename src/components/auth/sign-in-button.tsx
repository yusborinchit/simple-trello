"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import GithubIcon from "../icons/github-icon";

export default function SignInButton() {
  const supabaseClient = createSupabaseClient();

  async function handleSignIn() {
    await supabaseClient.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-[filter] hover:brightness-90"
    >
      <GithubIcon width={20} height={20} />
      <span>Sign In with Github</span>
    </button>
  );
}
