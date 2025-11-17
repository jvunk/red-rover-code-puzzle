import Header from "./_components/header";
import { HomePageTabs } from "./_components/tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center pb-12">
        <Header />

        <HomePageTabs />
      </main>
    </div>
  );
}
