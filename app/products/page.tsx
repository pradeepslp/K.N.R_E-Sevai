import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { ProductsPagination } from "@/components/ProductsPagination";
import { PRODUCTS_PER_PAGE } from "@/lib/utils";
import type { Product } from "@prisma/client";
import { ShoppingBag, SlidersHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

type SearchParams = { page?: string; category?: string; q?: string };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const category = params.category ?? undefined;
  const searchQuery = params.q ?? "";
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  // Search logic and category filter
  const where: any = {
    published: true,
    ...(category ? { category } : {}),
    ...(searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { category: { contains: searchQuery, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { name: "asc" },
      skip,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  const categories = await prisma.product.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  
  const categoryList = categories
    .map((c: { category: string | null }) => c.category)
    .filter(Boolean) as string[];
    
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-gray-100 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary" style={{ color: "var(--primary)" }}>
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">K.N.R Collections</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl font-serif">
            {searchQuery ? `Search results for "${searchQuery}"` : "Premium Stationery"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {total} {total === 1 ? "product" : "products"} available
          </p>
        </div>
      </div>

      {/* Categories & Filter Bar */}
      {categoryList.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-gray-50 pb-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mr-2">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Categories:</span>
          </div>

          <Link
            href="/products"
            className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 ${
              !category && !searchQuery
                ? "bg-primary text-header scale-105"
                : "bg-white/80 hover:bg-white text-ink border border-gray-200/50 hover:border-gray-300"
            }`}
            style={(!category && !searchQuery) ? { backgroundColor: "var(--primary)", color: "var(--header)" } : {}}
          >
            All Products
          </Link>

          {categoryList.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 ${
                category === cat
                  ? "bg-primary text-header scale-105"
                  : "bg-white/80 hover:bg-white text-ink border border-gray-200/50 hover:border-gray-300"
              }`}
              style={(category === cat) ? { backgroundColor: "var(--primary)", color: "var(--header)" } : {}}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="mt-12 text-center py-16 bg-white/50 rounded-2xl border border-dashed border-gray-200 max-w-lg mx-auto">
          <ShoppingBag className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-ink">No items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldn&apos;t find any products matching your selection. Try clearing filters.
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block text-xs font-bold text-primary hover:underline"
            style={{ color: "var(--primary)" }}
          >
            Clear Filters
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 border-t border-gray-100 pt-8 flex justify-center">
              <ProductsPagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/products"
                category={category}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
