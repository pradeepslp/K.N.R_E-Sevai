import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LayoutDashboard, ShoppingBag, CheckCircle, FileText, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/dashboard/login");

  const [total, published, draft] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { published: false } }),
  ]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider" style={{ color: "var(--primary)" }}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Management Console</span>
        </div>
        <h1 className="mt-1 text-3xl font-extrabold text-ink font-serif">Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Quick statistics and highlights of your fancy store catalog.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        
        {/* Total Card */}
        <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
            <ShoppingBag className="h-5 w-5 text-primary" style={{ color: "var(--primary)" }} />
          </div>
          <p className="mt-4 text-4xl font-extrabold text-ink leading-none">{total}</p>
          <p className="mt-2 text-xs text-gray-500">Items cataloged in database</p>
        </div>

        {/* Published Card */}
        <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Published</span>
            <CheckCircle className="h-5 w-5 text-secondary" style={{ color: "var(--secondary)" }} />
          </div>
          <p className="mt-4 text-4xl font-extrabold text-ink leading-none">{published}</p>
          <p className="mt-2 text-xs text-gray-500">Visible to customer catalog</p>
        </div>

        {/* Drafts Card */}
        <div className="rounded-xl border border-gray-100 p-6 shadow-sm bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Drafts</span>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-4 text-4xl font-extrabold text-ink leading-none">{draft}</p>
          <p className="mt-2 text-xs text-gray-500">Hidden from customers</p>
        </div>

      </div>

      {/* Action buttons */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
        <Link
          href="/dashboard/products"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-primary py-2.5 px-5 text-sm font-bold text-header shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
          style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
        >
          Manage products catalog
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-bold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          Manage services catalog
        </Link>
      </div>

    </div>
  );
}
