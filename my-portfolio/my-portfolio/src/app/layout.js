import { Outfit, Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "../context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Dasun Methmal | Full-Stack Developer & Designer",
  description:
    "Portfolio of Dasun Methmal – Full-Stack Developer & UI/UX Designer based in Sri Lanka. Building sleek digital products.",
};

export default function RootLayout({ children }) {
  // No "scroll-smooth" class here on purpose — Lenis now owns smooth
  // scrolling, and native CSS scroll-behavior fights Lenis/ScrollTrigger
  // the same way your globals.css comment already flags for the old setup.
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${outfit.variable} ${spaceMono.variable} ${bebasNeue.variable} font-[family-name:var(--font-outfit)] antialiased`}
        style={{ background: "#F5F0E8", color: "#1a1a1a" }}
      >
        <ThemeProvider>
         
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppFloat />
              <SpeedInsights />
            </div>
      
        </ThemeProvider>
      </body>
    </html>
  );
}
