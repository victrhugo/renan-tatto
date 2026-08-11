"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Image as ImageIcon, FileText, Phone, MessageSquare, Star, Settings } from "lucide-react";
import Cookies from "js-cookie";

const navItems = [
  { name: "Dashboard", href: "/studio", icon: LayoutDashboard },
  { name: "Hero Section", href: "/studio/hero", icon: ImageIcon },
  { name: "Portfólio", href: "/studio/portfolio", icon: ImageIcon },
  { name: "O Artista", href: "/studio/about", icon: FileText },
  { name: "Contato", href: "/studio/contact", icon: Phone },
  { name: "FAQ", href: "/studio/faq", icon: MessageSquare },
  { name: "Depoimentos", href: "/studio/testimonials", icon: Star },
  { name: "SEO", href: "/studio/seo", icon: Settings },
];

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("studio_auth");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-black-deep text-offwhite overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-graphite-dark border-r border-gold-dark/20 flex flex-col z-20 shadow-2xl relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        
        <div className="h-24 flex items-center justify-center border-b border-gold-dark/20 px-6 relative z-10">
          <span className="font-serif text-2xl tracking-widest uppercase">
            Studio <span className="text-gradient-gold">Admin</span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 relative z-10 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 font-[family-name:var(--font-oswald)] uppercase tracking-wider text-sm ${
                  isActive
                    ? "bg-gold-dark/10 text-gold-light border-r-2 border-gold-muted"
                    : "text-offwhite/60 hover:text-offwhite hover:bg-graphite-light"
                }`}
              >
                <Icon size={18} className={isActive ? "text-gold-muted" : "text-offwhite/40"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-graphite-light relative z-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400/80 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-300 font-[family-name:var(--font-oswald)] uppercase tracking-wider text-sm"
          >
            <LogOut size={18} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,90,25,0.05)_0%,transparent_50%)] pointer-events-none z-0" />
        <div className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}} />
    </div>
  );
}
