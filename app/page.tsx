import { prisma } from "@/lib/prisma";
import HomeHero from "@/components/HomeHero";
import HomeServices from "@/components/HomeServices";
import HomeProducts from "@/components/HomeProducts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, services] = await Promise.all([
    prisma.product.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      take: 8,
    }),
    prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return (
    <div className="bg-gray-50/30">
      {/* Premium Hero Section */}
      <HomeHero />

      {/* Interactive Services Section */}
      <HomeServices services={services} />

      {/* Featured Products Listing */}
      <HomeProducts products={products} />
    </div>
  );
}
