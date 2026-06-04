import React from "react";

export function Shimmer({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white/70 shadow-sm border border-gray-100 p-3">
      <div className="aspect-square w-full rounded bg-gray-200 shimmer" />
      <div className="mt-4 space-y-2">
        <Shimmer className="h-3 w-1/3" />
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="h-5 w-1/2 mt-2" />
        <Shimmer className="h-3 w-1/4 mt-4" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-lg bg-white/70 p-6 border border-gray-100 flex flex-col items-center">
      <Shimmer className="h-12 w-12 rounded-full mb-4" />
      <Shimmer className="h-5 w-2/3 mb-2" />
      <Shimmer className="h-3 w-5/6 mb-1" />
      <Shimmer className="h-3 w-3/4 mb-4" />
      <Shimmer className="h-3 w-1/3" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="bg-gradient-header py-16 sm:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl space-y-4">
          <Shimmer className="h-10 sm:h-14 w-full bg-white/10" />
          <Shimmer className="h-4 sm:h-6 w-3/4 bg-white/10" />
          <Shimmer className="h-4 sm:h-6 w-1/2 bg-white/10" />
          <div className="flex gap-4 pt-4">
            <Shimmer className="h-12 w-32 bg-white/10 rounded-full" />
            <Shimmer className="h-12 w-32 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Shimmer className="h-8 w-1/4" />
        <Shimmer className="h-10 w-28 rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-gray-100 rounded-lg p-6 bg-white/70">
          <Shimmer className="h-4 w-1/2 mb-3" />
          <Shimmer className="h-8 w-3/4" />
        </div>
        <div className="border border-gray-100 rounded-lg p-6 bg-white/70">
          <Shimmer className="h-4 w-1/2 mb-3" />
          <Shimmer className="h-8 w-3/4" />
        </div>
        <div className="border border-gray-100 rounded-lg p-6 bg-white/70">
          <Shimmer className="h-4 w-1/2 mb-3" />
          <Shimmer className="h-8 w-3/4" />
        </div>
        <div className="border border-gray-100 rounded-lg p-6 bg-white/70">
          <Shimmer className="h-4 w-1/2 mb-3" />
          <Shimmer className="h-8 w-3/4" />
        </div>
      </div>
      <div className="border border-gray-100 rounded-lg bg-white/70 p-6">
        <div className="space-y-4">
          <Shimmer className="h-6 w-1/4" />
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-12 w-full" />
          <Shimmer className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
