import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "./components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side security: unauthorized users get a 307 redirect immediately
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-black">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Admin Configuration
        </h2>
        
        {/* Our new Client Component */}
        <AdminNav />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}