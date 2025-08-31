import { Footer } from "@/features/home/components/footer";
import { Header } from "@/features/home/components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
