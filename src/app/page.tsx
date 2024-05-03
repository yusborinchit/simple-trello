import BoardManager from "@/components/board/board-manager";
import Header from "@/components/header/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mt-[calc(64px+16px)] grid">
        <BoardManager />
      </main>
    </>
  );
}
