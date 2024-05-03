"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabaseClient = createSupabaseClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabaseClient.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="ml-auto rounded bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-[filter] hover:brightness-90"
    >
      Sign Out
    </button>
  );
}
