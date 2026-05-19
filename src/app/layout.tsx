import type { Metadata } from "next";
import { Cinzel, Oswald, Barlow } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Renan Tattoo | Estúdio Premium em São José dos Campos",
  description: "Experiência de tatuagem exclusiva. Arte na pele, luxo underground e estética dark premium por Renan Tattoo.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${oswald.variable} ${barlow.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative bg-black-deep overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {children}
      </body>
    </html>
  );
}
