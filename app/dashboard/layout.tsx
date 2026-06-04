import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignOutLink } from "@/components/SignOutLink";
import { LayoutDashboard, ShoppingBag, PlusCircle, Wrench, Settings, User } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {session && (
        <nav className="mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 text-sm font-medium">
          
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-ink hover:bg-gray-100/80 transition-all"
          >
            <LayoutDashboard className="h-4 w-4 text-primary" style={{ color: "var(--primary)" }} />
            <span>Overview</span>
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-ink hover:bg-gray-100/80 transition-all"
          >
            <ShoppingBag className="h-4 w-4 text-gray-400" />
            <span>Products</span>
          </Link>

          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-primary hover:bg-primary/10 transition-all"
            style={{ color: "var(--primary)" }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/dashboard/services"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-ink hover:bg-gray-100/80 transition-all"
          >
            <Wrench className="h-4 w-4 text-gray-400" />
            <span>Services</span>
          </Link>

          <Link
            href="/dashboard/services/new"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-primary hover:bg-primary/10 transition-all"
            style={{ color: "var(--primary)" }}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Service</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-ink hover:bg-gray-100/80 transition-all"
          >
            <Settings className="h-4 w-4 text-gray-400" />
            <span>Settings</span>
          </Link>

          {/* User profile & signout */}
          <div className="ml-auto flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
              <User className="h-3.5 w-3.5" />
              <span>{session.user?.email}</span>
            </div>
            <SignOutLink />
          </div>

        </nav>
      )}
      <div className="min-h-[60vh] bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
