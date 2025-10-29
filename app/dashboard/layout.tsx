import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/features/playground/actions";
import { PlaygroundData } from "@/features/playground/types";
import { Header } from "@/features/home/components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllPlaygroundForUser();

  const techIconsMap: Record<string, string> = {
    REACTJS: "Zap",
    NEXTKS: "LightBulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  };

  const formattedPlaygroundData =
    playgroundData?.map((item: PlaygroundData) => ({
      id: item.id,
      name: item.title,
      starred: item.StarMark?.[0]?.isMarked || false,
      icon: techIconsMap[item.template] || "Code2",
    })) || [];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full overflow-x-hidden relative">
        <Header />
        <div className="flex pt-16">
          {/* Pass the formatted data with string icon names */}
          <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
