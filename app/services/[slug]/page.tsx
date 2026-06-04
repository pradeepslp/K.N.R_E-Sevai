import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ChevronRight, FileText, Globe, Copy, Phone, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findFirst({
    where: { slug, isPublished: true },
  });
  if (!service) notFound();

  // Helper to resolve icon
  const getIcon = () => {
    switch (slug) {
      case "xerox-photocopy":
        return <Copy className="h-10 w-10 text-primary" style={{ color: "var(--primary)" }} />;
      case "print-outs-service":
        return <Globe className="h-10 w-10 text-primary" style={{ color: "var(--primary)" }} />;
      case "tamil-nadu-e-sevai":
        return <Globe className="h-10 w-10 text-primary" style={{ color: "var(--primary)" }} />;
      default:
        return <FileText className="h-10 w-10 text-primary" style={{ color: "var(--primary)" }} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-400">Services</span>
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-400 truncate max-w-xs">{service.name}</span>
      </nav>

      {/* Main Container */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-2xl border border-gray-100 p-4 sm:p-8 shadow-sm">
        
        {/* Left Column - Image/Icon Showcase */}
        <div className="lg:col-span-5 bg-gray-50/50 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 aspect-square relative border border-gray-100/50">
          {service.imageUrl ? (
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized={service.imageUrl.startsWith("http")}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-white p-6 shadow-sm border border-gray-100 scale-110">
                {getIcon()}
              </div>
              <span className="text-sm font-black text-gray-300 uppercase tracking-widest pt-2">K.N.R Services</span>
            </div>
          )}
        </div>

        {/* Right Column - Service Details */}
        <div className="lg:col-span-7 flex flex-col justify-between py-2">
          <div>
            {/* Category */}
            {service.category && (
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-ink uppercase tracking-wide">
                {service.category}
              </span>
            )}
            
            {/* Name */}
            <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl leading-tight font-serif">
              {service.name}
            </h1>

            {/* Description */}
            {service.description && (
              <div className="mt-6 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Service Overview</h3>
                {service.description}
              </div>
            )}

            {/* Price Details */}
            {service.priceDetails && (
              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-100 p-5">
                <h3 className="font-bold text-ink text-sm mb-3 border-b border-gray-200/60 pb-2">Pricing Matrix & Terms</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {service.priceDetails}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
            {/* Contact Instructions */}
            <p className="text-xs text-gray-400 leading-relaxed">
              We process government certificate documentation, online applications, bill payments, and scanning. Standard verification rates apply. Contact us below for immediate processing or drop by K.N.R E-Sevai.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`https://wa.me/919884270833?text=I%20am%20interested%20in%20your%20service%3A%20${encodeURIComponent(service.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-8 text-sm font-bold text-header hover:opacity-90 shadow-md transition-all active:scale-[0.98]"
                style={{ backgroundColor: "var(--primary)", color: "var(--header)" }}
              >
                Inquire via WhatsApp
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="/#services"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 px-8 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                View all services
              </Link>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
