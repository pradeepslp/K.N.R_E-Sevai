import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import ProductDetailActions from "@/components/ProductDetailActions";
import { ChevronRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug, published: true },
  });
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-400 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid Content */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-gray-100 p-4 sm:p-8 shadow-sm">
        
        {/* Left Side - Image Showcase */}
        <div className="lg:col-span-6 bg-gray-50/50 rounded-xl overflow-hidden flex items-center justify-center p-4 sm:p-8 aspect-square relative border border-gray-100/50">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized={product.imageUrl.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-6xl font-serif">
              A
            </div>
          )}
        </div>

        {/* Right Side - Product Specifications */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            {/* Category Tag */}
            {product.category && (
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-ink uppercase tracking-wide">
                {product.category}
              </span>
            )}
            
            {/* Product Name */}
            <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl leading-tight font-serif">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2 pb-5 border-b border-gray-100">
              <span className="text-3xl font-black text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
                {product.description}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-6">
            {/* Interactive Client action panel */}
            <ProductDetailActions product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-secondary shrink-0" style={{ color: "var(--secondary)" }} />
                <span>Genuine Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-secondary shrink-0" style={{ color: "var(--secondary)" }} />
                <span>Instant Store Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-secondary shrink-0" style={{ color: "var(--secondary)" }} />
                <span>Hassle-free Exchange</span>
              </div>
            </div>

            {/* Store Information */}
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h4 className="text-xs font-bold text-ink mb-1">Local Pickup Available</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Add products to your cart and send your shopping order template via WhatsApp. Visit K.N.R E-Sevai in store to pick up and complete payment.
              </p>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
