import { ProductCardSkeleton, Shimmer } from "@/components/SkeletonLoader";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title skeleton */}
      <div className="border-b border-gray-100 pb-5">
        <Shimmer className="h-4 w-28 mb-2" />
        <Shimmer className="h-8 w-48 sm:h-10 sm:w-64" />
        <Shimmer className="h-4 w-32 mt-2" />
      </div>

      {/* Categories skeleton */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-50 pb-5">
        <Shimmer className="h-8 w-20 rounded-full" />
        <Shimmer className="h-8 w-24 rounded-full" />
        <Shimmer className="h-8 w-28 rounded-full" />
        <Shimmer className="h-8 w-20 rounded-full" />
      </div>

      {/* Grid of Product Skeletons */}
      <div className="mt-8 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
