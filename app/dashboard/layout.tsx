import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* Pass the formatted data with string icon names */}
        <DashboardSidebar initialPlaygroundData={[]} />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
