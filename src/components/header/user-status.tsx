import { type User } from "@supabase/supabase-js";
import Image from "next/image";
import PlaceholderAvatarIcon from "../icons/placeholder-avatar-icon";

interface Props {
  user: User | null;
}

export default function UserStatus({ user }: Readonly<Props>) {
  const avatar = user?.user_metadata.avatar_url ?? "";
  const username = user?.user_metadata.user_name ?? "";

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
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
        </>
      ) : (
        <>
          <PlaceholderAvatarIcon />
          <p className="hidden sm:inline">
            Hello there, please <strong>Sign In</strong>!
          </p>
        </>
      )}
    </div>
  );
}
