"use client";

import { type User } from "@supabase/supabase-js";
import Image from "next/image";

interface Props {
  user: User;
}

export default function UserStatus({ user }: Readonly<Props>) {
  const avatar = user.user_metadata.avatar_url;
  const username = user.user_metadata.user_name;

  return (
    <div className="flex items-center gap-4">
      <Image
        src={avatar}
        width={40}
        height={40}
        alt={`${username} profile photo`}
        className="rounded-full"
      />
      <p className="hidden sm:inline">
        Welcome back! <strong>{username}</strong>
      </p>
    </div>
  );
}
