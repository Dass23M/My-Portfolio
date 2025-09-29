import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-grow pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
           <WhatsAppFloat />
            <SpeedInsights/>
        </div>
      </body>
     
    </html>
  );
}