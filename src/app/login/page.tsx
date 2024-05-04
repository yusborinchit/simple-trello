import SignInButton from "@/components/auth/sign-in-button";

export default async function LoginPage() {
  return (
    <main className="grid h-screen place-items-center">
      <div className="flex flex-col items-center gap-8 rounded bg-white px-4 py-8">
        <div>
          <p className="text-gray-500">Sign In</p>
          <h2 className="text-5xl font-black tracking-tighter">
            Simple Trello
          </h2>
        </div>
        <SignInButton />
      </div>
    </main>
  );
}
