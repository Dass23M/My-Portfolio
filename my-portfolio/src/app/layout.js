import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from '../context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Methmal | Full-Stack Developer',
  description: 'Portfolio of Dasun Methmal â€“ Full-Stack Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Prevent flash of wrong theme on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = saved || system;
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-950 transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
