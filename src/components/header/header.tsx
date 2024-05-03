"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignOutButton from "../auth/sign-out-button";
import UserStatusSkeleton from "../skeletons/user-status-skeleton";
import UserStatus from "./user-status";

export default function Header() {
  const supabaseClient = createSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: userData }) => {
      const { user } = userData;

      if (!user) router.push("/login");

      setUser(user);
      setIsLoading(false);
    });
  }, [supabaseClient, router]);

  return (
    <header className="fixed left-4 right-4 top-4 flex items-center gap-4 rounded bg-white px-4 py-3 shadow">
      {!isLoading && user ? <UserStatus user={user} /> : <UserStatusSkeleton />}
      <SignOutButton />
    </header>
  );
}
