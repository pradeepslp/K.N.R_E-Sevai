import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-[#131921] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              K.N.R E-Sevai
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your one-stop destination for premium writing instruments, office stationery, photocopying, high-quality printing, and official Tamil Nadu Government E-Sevai utility services.
            </p>
            <div className="flex space-x-3 pt-2 text-primary">
              {/* WhatsApp Quick Link */}
              <Link
                href="https://wa.me/919884270833"
                target="_blank"
                className="hover:underline text-xs flex items-center gap-1 font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Inquire on WhatsApp <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Catalog Shop Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-primary pl-2 mb-4" style={{ borderColor: "var(--primary)" }}>
              Products Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/products?category=Pens" className="hover:text-primary transition-colors">Writing Instruments</Link>
              </li>
              <li>
                <Link href="/products?category=Notebooks" className="hover:text-primary transition-colors">Paper & Journals</Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="hover:text-primary transition-colors">Desk Accessories</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Store Operations & Help */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-primary pl-2 mb-4" style={{ borderColor: "var(--primary)" }}>
              Store & Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">Government E-Sevai</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">Photocopying & Xerox</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-primary transition-colors">Printing Services</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">Owner Console</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-l-2 border-primary pl-2 mb-4" style={{ borderColor: "var(--primary)" }}>
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" style={{ color: "var(--primary)" }} />
                <span>Visit us in store for product purchases & printing requirements.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" style={{ color: "var(--primary)" }} />
                <a href="tel:+919884270833" className="hover:text-primary transition-colors">+91 98842 70833</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" style={{ color: "var(--primary)" }} />
                <a href="mailto:knr.esevai@gmail.com" className="hover:text-primary transition-colors">knr.esevai@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} K.N.R E-Sevai. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-gray-400">High Trust Catalog Experience</span>
            <span>•</span>
            <span className="text-gray-400">Premium Stationery Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
