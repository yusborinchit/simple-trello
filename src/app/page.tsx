import BoardManager from "@/components/board/board-manager";

export default async function Home() {
  return (
    <main className="mt-[calc(64px+16px)] grid">
      <BoardManager />
    </main>
  );
}
